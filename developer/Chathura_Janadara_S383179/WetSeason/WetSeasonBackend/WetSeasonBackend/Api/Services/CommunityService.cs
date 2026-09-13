using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Dtos;

namespace WetSeasonBackend.Api.Services;

public class CommunityService(AppDbContext db)
{
    public List<CommunityListItemDto> GetAllCommunities()
    {
        return db.Communities
            .Select(c => new CommunityListItemDto
            {
                Id = c.Id,
                Name = c.Name,
                Region = c.Region,
                Population = c.Population,
                ContactEmail = c.ContactEmail
            })
            .ToList();
    }
}
