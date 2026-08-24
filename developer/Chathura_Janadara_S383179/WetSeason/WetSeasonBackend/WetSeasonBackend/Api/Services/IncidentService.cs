using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Services;

public class IncidentService(AppDbContext db) 
{
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
        var incident = await db.Incidents.FindAsync(incidentId);
        if (incident == null)
        {
            return null;
        }

        var nextStatus = NextStatus(incident.Status);
        if (nextStatus == null)
        {
            return incident;
        }

        incident.Status = nextStatus.Value;
        await db.SaveChangesAsync();
        return incident;
    }

    public async Task<List<IncidentListItemDto>> getAllIncidents()
    {
        return await db.Incidents
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
                CreatedAt = i.CreatedAt,
            })
            .ToListAsync();
    }
    
    public async Task<IncidentListItemDto?> CreateAsync(CreateIncidentRequestDto request)
    {
        var communityExists = await db.Communities.AnyAsync(c => c.Id == request.CommunityId);
        if (!communityExists)
        {
            return null;
        }

        var incident = new Incident
        {
            CommunityId = request.CommunityId,
            Type = request.Type,
            Severity = request.Severity,
            Description = request.Description,
            Status = IncidentStatus.Reported,
            ReportedBy = "Chathura",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        db.Incidents.Add(incident);
        await db.SaveChangesAsync();

        return new IncidentListItemDto
        {
            Id = incident.Id,
            Type = incident.Type.ToString(),
            Severity = incident.Severity,
            Status = incident.Status.ToString(),
            ReportedBy = incident.ReportedBy,
            CreatedAt = incident.CreatedAt

        };
    }

    public async Task<ResourceAssignement?> AssignAsync(int incidentId, int resourceId)
    {
        var incidentExists = await db.Incidents.AnyAsync(i=>i.Id==incidentId);
        if (!incidentExists)
        {
            return null;
        }
        var resourceFree = !await db.ResourceAssignements.AnyAsync(r=>r.Id == resourceId && r.ReleasedAt == null);
        if (!resourceFree)
        {
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
        return assignment;
    }

    public async Task<ResourceAssignement> ReleaseAsync(int assignmentId)
    {
        var assignment = await db.ResourceAssignements.FindAsync(assignmentId);
        if(assignment == null || assignment.ReleasedAt != null)
        {
            return null;
        }
        assignment.ReleasedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return assignment;
    }
  
}