namespace WetSeasonBackend.Api.Models;

public class Incident
{
    public int Id { get; set; }
    public IncidentType Type { get; set; }
    public int Severity { get; set; }
    public IncidentStatus Status { get; set; }
    public string Description { get; set; }  = string.Empty;
    public string ReportedBy { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // FK + navigation property pair: CommunityId is the real DB column, Community
    // is the loaded row (like a Laravel belongsTo() or JPA @ManyToOne).
    public int CommunityId { get; set; }
    public Community Community { get; set; } = null!;

    public ICollection<ResourceAssignement> ResourceAssignements { get; set; } = new List<ResourceAssignement>();
}
