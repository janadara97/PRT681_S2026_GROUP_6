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

public class IncidentController(AppDbContext db, IncidentService incidentService) : ControllerBase
{
  [Authorize]
  [HttpGet]
  public async Task<ActionResult<IEnumerable<IncidentListItemDto>>> GetAllIncidents()
  {
    var incidents = await incidentService.getAllIncidents();
    if (incidents is null)
    {
      return NotFound("Database context is not available.");
    }
    return Ok(incidents);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<IEnumerable<Incident>>> GetIncidentById(int id)
  {
    var incident = await db.Incidents.FirstOrDefaultAsync(i => i.Id == id);
    if (incident is null)
    {
      return NotFound($"Incident with ID {id} not found.");
    }
    return Ok(incident);
  }

  [HttpPost]
  public async Task<ActionResult<IncidentListItemDto>> CreateIncident(CreateIncidentRequestDto request)
  {
    return Ok(await incidentService.CreateAsync(request));
  }
  
  [HttpPut("{id:int}/transition")]
  public async Task<ActionResult> Transition(int id)
  {
    var incident = await incidentService.TransitionAsync(id);
    if (incident is null)
    {
      return NotFound($"Incident with ID {id} not found.");
    }
    return Ok(new {incident.Id, IncidentStatus = incident.Status.ToString()});
  }

  [HttpPost("assignment/assign")]
  public async Task<ActionResult> AssignResource([FromBody] AssignResourceRequestDto request)
  {
    var assignment = await incidentService.AssignAsync(request.IncidentId, request.ResourceId);
    if (assignment is null)
    {
      return BadRequest($"Could not assign resource with ID {request.ResourceId} to incident with ID {request.IncidentId}.");
    }
    return Ok(assignment);
  }

  [HttpPost("assignment/release/{resourceId:int}")]
  public async Task<ActionResult> ReleaseResource(int resourceId)
  {
    var assignment = await incidentService.ReleaseAsync(resourceId);
    if (assignment is null)
    {
      return BadRequest($"Could not release resource with ID {resourceId}.");
    }
    return Ok(assignment);
  }
}