using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Models;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]

public class IncidentController(AppDbContext db, IncidentService incidentService, CommunityService communityService, ILogger<IncidentController> logger) : ControllerBase
{
  // [Authorize] requires a valid JWT (set up in Program.cs) - unauthenticated
  // requests get a 401 automatically before this method ever runs.
  [HttpGet("getAll")]
  public async Task<ActionResult<IEnumerable<IncidentListItemDto>>> GetAllIncidents()
  {
    var incidents = await incidentService.getAllIncidents();
    if (incidents is null)
    {
      logger.LogInformation("No incidents found.");
      return NotFound("Incidents not found.");
    }
    logger.LogInformation("Found {Count} incidents.", incidents.Count);
    return Ok(incidents);
  }

  // IncidentType is a fixed C# enum, not a DB table - just returns its member
  // names as strings (e.g. "CycloneDamage"), matching what CreateIncidentRequestDto expects.
  [HttpGet("types")]
  public ActionResult<IEnumerable<string>> GetAllIncidentTypes()
  {
    var types = Enum.GetNames(typeof(IncidentType));
    logger.LogInformation("Found {Count} incident types.", types.Length);
    return Ok(types);
  }

  // Route parameter {id} binds straight to the `id` argument below - like
  // Laravel's Route::get('/{id}') or Spring's @PathVariable.
  [HttpGet("getById/{id}")]
  public async Task<ActionResult<IEnumerable<Incident>>> GetIncidentById(int id)
  {
    var incident = await incidentService.GetIncidentById(id);
    if (incident is null)
    {
      logger.LogWarning("Incident {IncidentId} not found.", id);
      return NotFound($"Incident with ID {id} not found.");
    }
    logger.LogInformation("Found incident {IncidentId}.", id);
    return Ok(incident);
  }

  // [Authorize] is required here so User.Identity is actually populated -
  // without it, an anonymous request would have no username to read.
  [Authorize]
  [HttpPost]
  public async Task<ActionResult<IncidentListItemDto>> CreateIncident(CreateIncidentRequestDto request)
  {
    var reportedBy = User.Identity?.Name ?? "Unknown";
    var incident = await incidentService.CreateAsync(request, reportedBy);
    if (incident is null)
    {
      logger.LogWarning("Failed to create incident - community {CommunityId} not found.", request.CommunityId);
      return NotFound($"Community with ID {request.CommunityId} not found.");
    }
    logger.LogInformation("Created incident {IncidentId}.", incident.Id);
    return Ok(incident);
  }

  // {id:int} adds a route constraint so this only matches numeric ids -
  // non-numeric values fall through instead of failing model binding.
  [HttpPut("{id:int}/transition")]
  public async Task<ActionResult> Transition(int id)
  {
    var incident = await incidentService.TransitionAsync(id);
    if (incident is null)
    {
      logger.LogWarning("Incident {IncidentId} not found.", id);
      return NotFound($"Incident with ID {id} not found.");
    }
    logger.LogInformation("Transitioned incident {IncidentId} to {Status}.", id, incident.Status);
    return Ok(new { incident.Id, IncidentStatus = incident.Status.ToString() });
  }

  [HttpDelete("delete/{id:int}")]
  public async Task<ActionResult> DeleteIncident(int id)
  {
    var isDeleted = await incidentService.DeleteIncident(id);
    if (!isDeleted)
    {
      logger.LogWarning("Incident {IncidentId} not found or could not be deleted.", id);
      return NotFound("Error");
    }
    logger.LogInformation("Deleted incident {IncidentId}.", id);
    return NoContent();
  }

  [HttpPost("assignment/assign")]
  public async Task<ActionResult> AssignResource([FromBody] AssignResourceRequestDto request)
  {
    var assignment = await incidentService.AssignAsync(request.IncidentId, request.ResourceId);
    if (assignment is null)
    {
      logger.LogWarning("Could not assign resource {ResourceId} to incident {IncidentId}.", request.ResourceId, request.IncidentId);
      return BadRequest($"Could not assign resource with ID {request.ResourceId} to incident with ID {request.IncidentId}.");
    }
    logger.LogInformation("Assigned resource {ResourceId} to incident {IncidentId}.", request.ResourceId, request.IncidentId);
    return Ok(assignment);
  }

  [HttpPost("assignment/release/{resourceId:int}")]
  public async Task<ActionResult> ReleaseResource(int resourceId)
  {
    var assignment = await incidentService.ReleaseAsync(resourceId);
    if (assignment is null)
    {
      logger.LogWarning("Could not release resource {ResourceId}.", resourceId);
      return BadRequest($"Could not release resource with ID {resourceId}.");
    }
    logger.LogInformation("Released resource {ResourceId}.", resourceId);
    return Ok(assignment);
  }

  // [Authorize] is required so AuthService.GetCurrentUserDetails() has an
  // actual signed-in user to read claims from.
  [Authorize]
  [HttpPut("{id:int}")]
  public async Task<ActionResult> Update(int id, CreateIncidentRequestDto request)
  {
    var incident = await incidentService.UpdateAsync(id, request);
    if (incident is null)
    {
      logger.LogWarning("Incident {IncidentId} not found or community {CommunityId} does not exist.", id, request.CommunityId);
      return NotFound($"Incident with ID {id} not found.");
    }
    logger.LogInformation("Updated incident {IncidentId}.", id);
    return Ok(incident);
  }
}
