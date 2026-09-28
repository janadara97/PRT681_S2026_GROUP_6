using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Dtos;

namespace WetSeasonBackend.Api.Services;

public class CommunityService(AppDbContext db, ILogger<CommunityService> logger)
{
    public List<CommunityListItemDto> GetAllCommunities()
    {
        var communities = db.Communities
            .Select(c => new CommunityListItemDto
            {
                Id = c.Id,
                Name = c.Name,
                Region = c.Region,
                Population = c.Population,
                ContactEmail = c.ContactEmail
            })
            .ToList();
        logger.LogInformation("Fetched {Count} communities.", communities.Count);
        return communities;
    }
}
