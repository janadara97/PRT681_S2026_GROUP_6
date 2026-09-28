namespace WetSeasonBackend.Api.Dtos;

// Flattened view of a Community for list/dropdown screens - scalar fields
// only, not the Incidents collection (which would pull in every incident).
public class CommunityListItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int Population { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
}
