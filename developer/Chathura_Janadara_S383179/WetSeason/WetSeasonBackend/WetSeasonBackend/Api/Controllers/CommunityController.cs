using Microsoft.AspNetCore.Mvc;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommunityController(CommunityService communityService, ILogger<CommunityController> logger) : ControllerBase
{
    // Same routing shape as IncidentController's getAll: maps to
    // GET /api/community/getAll.
    [HttpGet("getAll")]
    public ActionResult<IEnumerable<CommunityListItemDto>> GetAllCommunities()
    {
        var communities = communityService.GetAllCommunities();
        logger.LogInformation("Returned {Count} communities.", communities.Count);
        return Ok(communities);
    }
}
