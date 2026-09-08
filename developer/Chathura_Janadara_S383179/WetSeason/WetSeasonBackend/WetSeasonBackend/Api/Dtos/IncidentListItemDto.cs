namespace WetSeasonBackend.Api.Dtos;

// Flattened view of an Incident for list screens - pulls in the parent
// Community's Name/Region directly so the frontend doesn't need a
// separate lookup. Built in IncidentService.getAllIncidents().
public class IncidentListItemDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public int Severity { get; set; }
    public string Status { get; set; } = string.Empty;
    public string CommunityName { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public string ReportedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
