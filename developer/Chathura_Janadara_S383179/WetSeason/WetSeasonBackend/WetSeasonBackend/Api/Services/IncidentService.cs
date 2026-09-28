using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Models;
using Temporalio.Client;
using WetSeasonBackend.Api.Workflows;

namespace WetSeasonBackend.Api.Services;

// IncidentService(AppDbContext db) uses a primary constructor (C# 12) -
// `db` is injected by DI, same as in AuthService.
public class IncidentService(AppDbContext db, IEmailService emailService, AuthService authService, ILogger<IncidentService> logger, ITemporalClient temporalClient)
{
    // A switch *expression* (not statement) - like PHP 8's match or a Java 14+
    // switch expression - encoding the incident's fixed status lifecycle.
    public static IncidentStatus? NextStatus(IncidentStatus currentStatus)
    {
        return currentStatus switch
        {
            IncidentStatus.Reported => IncidentStatus.Triaged,
            IncidentStatus.Triaged => IncidentStatus.Responding,
            IncidentStatus.Responding => IncidentStatus.Resolved,
            IncidentStatus.Resolved => IncidentStatus.Closed,
            IncidentStatus.Closed => null,
            _ => null
        };
    }

    public async Task<Incident?> TransitionAsync(int incidentId)
    {
        // FindAsync looks up by primary key via EF Core's tracked cache first -
        // like Eloquent's find() or a JPA EntityManager.find().
        var incident = await db.Incidents.FindAsync(incidentId);
        if (incident == null)
        {
            logger.LogWarning("Cannot transition incident {IncidentId} - not found.", incidentId);
            return null;
        }

        var previousStatus = incident.Status;
        var nextStatus = NextStatus(incident.Status);
        if (nextStatus == null)
        {
            logger.LogInformation("Incident {IncidentId} already at terminal status {Status}.", incidentId, previousStatus);
            return incident;
        }

        // No explicit UPDATE needed - EF Core is tracking this entity, so mutating
        // the property is enough; the change is detected and written on save.
        incident.Status = nextStatus.Value;
        await db.SaveChangesAsync();
        logger.LogInformation("Incident {IncidentId} moved from {PreviousStatus} to {NewStatus}.", incidentId, previousStatus, incident.Status);
        return incident;
    }

    public async Task<List<IncidentListItemDto>> getAllIncidents()
    {
        // Select(...) projects straight into the DTO shape - EF Core only fetches
        // the needed columns, like Eloquent's ->select() or a JPA projection.
        var incidents = await db.Incidents
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => new IncidentListItemDto
            {
                Id = i.Id,
                Type = i.Type.ToString(),
                Severity = i.Severity,
                Status = i.Status.ToString(),
                CommunityName = i.Community.Name,
                Region = i.Community.Region,
                ReportedBy = i.ReportedBy,
                Description = i.Description,
                CreatedAt = i.CreatedAt,
            })
            .ToListAsync();
        logger.LogInformation("Fetched {Count} incidents.", incidents.Count);
        return incidents;
    }

    public async Task<IncidentListItemDto?> CreateAsync(CreateIncidentRequestDto request, string reportedBy)
    {
        var communityExists = await db.Communities.AnyAsync(c => c.Id == request.CommunityId);
        if (!communityExists)
        {
            logger.LogWarning("Cannot create incident - community {CommunityId} not found.", request.CommunityId);
            return null;
        }

        var incident = new Incident
        {
            CommunityId = request.CommunityId,
            Type = request.Type,
            Severity = request.Severity,
            Description = request.Description,
            Status = IncidentStatus.Reported,
            ReportedBy = reportedBy,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.Incidents.Add(incident);
        await db.SaveChangesAsync();
        logger.LogInformation("Created incident {IncidentId} for community {CommunityId}.", incident.Id, incident.CommunityId);

        return new IncidentListItemDto
        {
            Id = incident.Id,
            Type = incident.Type.ToString(),
            Severity = incident.Severity,
            Status = incident.Status.ToString(),
            ReportedBy = incident.ReportedBy,
            Description = incident.Description,
            CreatedAt = incident.CreatedAt

        };
    }

    public async Task<IncidentListItemDto?> UpdateAsync(int id, CreateIncidentRequestDto request)
    {
        var incident = await db.Incidents.FindAsync(id);
        if (incident == null)
        {
            logger.LogWarning("Cannot update incident {IncidentId} - not found.", id);
            return null;
        }
        var communityExists = await db.Communities.AnyAsync(c => c.Id == request.CommunityId);
        if (!communityExists)
        {
            logger.LogWarning("Cannot update incident {IncidentId} - community {CommunityId} not found.", id, request.CommunityId);
            return null;
        }
        incident.CommunityId = request.CommunityId;
        incident.Type = request.Type;
        incident.Severity = request.Severity;
        incident.Description = request.Description;
        incident.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();

        try
        {
            var currentUser = authService.GetCurrentUserDetails();
            if (!string.IsNullOrEmpty(currentUser.Email))
            {
                 var workflowId = $"incident-updated-{id}-{Guid.NewGuid()}";
                        var options = new WorkflowOptions(workflowId, "wetseason-incidents");
                
                        // Starts the workflow and returns immediately - it does NOT wait for
                        // the email to actually send. That's the whole point: a slow or
                        // broken SMTP server can no longer make this API call fail.
                        await temporalClient.StartWorkflowAsync(
                            (IncidentUpdatedWorkflow workflow) => workflow.RunAsync(id, currentUser.Email, currentUser.Name),
                            options);
            }
            logger.LogInformation("Started email workflow for incident update. Incident ID: {IncidentId}, User: {UserName}, Email: {UserEmail}", id, currentUser.Name, currentUser.Email);
        }
        catch (Exception e)
        {
            // The incident update itself already saved above (db.SaveChangesAsync) -
            // a problem starting the email workflow shouldn't turn that success
            // into a failed request. Log it and move on, instead of the old
            // `throw;` here that used to make a flaky SMTP/Temporal connection
            // 500 an otherwise-successful update.
            logger.LogError(e, "Error starting email workflow for incident update.");
        }


        // Re-query through the same Select() projection as getAllIncidents(), rather
        // than incident.Community directly - that nav property isn't loaded (no .Include()).
        return await db.Incidents
            .Where(i => i.Id == id)
            .Select(i => new IncidentListItemDto
            {
                Id = i.Id,
                Type = i.Type.ToString(),
                Severity = i.Severity,
                Status = i.Status.ToString(),
                CommunityName = i.Community.Name,
                Region = i.Community.Region,
                ReportedBy = i.ReportedBy,
                Description = i.Description,
                CreatedAt = i.CreatedAt,
            })
            .FirstAsync();
    }

    public async Task<ResourceAssignement?> AssignAsync(int incidentId, int resourceId)
    {
        var incidentExists = await db.Incidents.AnyAsync(i => i.Id == incidentId);
        if (!incidentExists)
        {
            logger.LogWarning("Cannot assign resource {ResourceId} - incident {IncidentId} not found.", resourceId, incidentId);
            return null;
        }
        var resourceFree = !await db.ResourceAssignements.AnyAsync(r => r.Id == resourceId && r.ReleasedAt == null);
        if (!resourceFree)
        {
            logger.LogWarning("Cannot assign resource {ResourceId} - already assigned.", resourceId);
            return null;
        }

        var assignment = new ResourceAssignement
        {
            IncidentId = incidentId,
            ResourceId = resourceId,
            AssignedAt = DateTime.UtcNow,
            ReleasedAt = null
        };
        db.ResourceAssignements.Add(assignment);
        await db.SaveChangesAsync();
        logger.LogInformation("Assigned resource {ResourceId} to incident {IncidentId}.", resourceId, incidentId);
        return assignment;
    }

    public async Task<ResourceAssignement> ReleaseAsync(int assignmentId)
    {
        var assignment = await db.ResourceAssignements.FindAsync(assignmentId);
        if (assignment == null || assignment.ReleasedAt != null)
        {
            logger.LogWarning("Cannot release assignment {AssignmentId} - not found or already released.", assignmentId);
            return null;
        }
        assignment.ReleasedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        logger.LogInformation("Released assignment {AssignmentId}.", assignmentId);
        return assignment;
    }

    public async Task<bool> DeleteIncident(int id)
    {
        var incident = await db.Incidents
            .FirstOrDefaultAsync(i => i.Id == id);
        if (incident == null)
        {
            logger.LogWarning("Cannot delete incident {IncidentId} - not found.", id);
            return false;
        }
        db.Incidents.Remove(incident);
        await db.SaveChangesAsync();
        logger.LogInformation("Deleted incident {IncidentId}.", id);
        return true;
    }

    public async Task<IncidentListItemDto> GetIncidentById(int id)
    {
        var incident = await db.Incidents
        .FirstAsync(i => i.Id == id);
        if (incident == null)
        {
            logger.LogWarning("Incident {IncidentId} not found.", id);
            return null;
        }
        logger.LogInformation("Fetched incident {IncidentId}.", id);
        return new IncidentListItemDto
        {

            Id = incident.Id,
            Type = incident.Type.ToString(),
            Severity = incident.Severity,
            Status = incident.Status.ToString(),
            CommunityName = incident.Community.Name,
            Region = incident.Community.Region,
            ReportedBy = incident.ReportedBy,
            CreatedAt = incident.CreatedAt,
        };
    }

}
