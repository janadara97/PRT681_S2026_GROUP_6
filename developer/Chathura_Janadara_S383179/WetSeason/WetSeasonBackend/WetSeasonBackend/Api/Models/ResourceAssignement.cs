namespace WetSeasonBackend.Api.Models;

public class ResourceAssignement
{
    public int Id { get; set; }
    public int IncidentId { get; set; }
    public Incident? Incident { get; set; }
    public int ResourceId { get; set; }
    public Resource? Resource { get; set; }
    public DateTime AssignedAt { get; set; }
    public DateTime? ReleasedAt  { get; set; }
    
    
} 