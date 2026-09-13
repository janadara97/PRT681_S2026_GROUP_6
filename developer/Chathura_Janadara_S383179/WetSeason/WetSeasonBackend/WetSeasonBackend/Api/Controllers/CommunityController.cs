using Microsoft.AspNetCore.Mvc;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommunityController(CommunityService communityService) : ControllerBase
{
    // Same routing shape as IncidentController's getAll: maps to
    // GET /api/community/getAll.
    [HttpGet("getAll")]
    public ActionResult<IEnumerable<CommunityListItemDto>> GetAllCommunities()
    {
        var communities = communityService.GetAllCommunities();
        return Ok(communities);
    }
}
