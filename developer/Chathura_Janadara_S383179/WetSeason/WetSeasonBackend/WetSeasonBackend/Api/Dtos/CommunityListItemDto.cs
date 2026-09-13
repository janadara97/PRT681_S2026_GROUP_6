namespace WetSeasonBackend.Api.Dtos;

// Flattened view of a Community for list/dropdown screens - just the
// scalar fields, not the Incidents navigation collection (which would
// otherwise pull in every incident for every community on the page).
public class CommunityListItemDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int Population { get; set; }
    public string ContactEmail { get; set; } = string.Empty;
}
