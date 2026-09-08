using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Dtos;

// Shape of the JSON body expected by POST /api/incident. Validated by
// CreateIncidentRequestValidator before the controller action runs.
public class CreateIncidentRequestDto
{
    public int CommunityId { get; set; }
    public IncidentType Type { get; set; }
    public int Severity { get; set; }
    public string Description { get; set; } = string.Empty;
}
