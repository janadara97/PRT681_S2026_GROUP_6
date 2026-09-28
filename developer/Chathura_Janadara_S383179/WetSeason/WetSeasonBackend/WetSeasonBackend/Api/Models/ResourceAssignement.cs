namespace WetSeasonBackend.Api.Models;

// Join-table entity linking Incident and Resource, with extra columns
// (AssignedAt/ReleasedAt) - modeled explicitly since EF Core can't infer this.
public class ResourceAssignement
{
    public int Id { get; set; }
    public int IncidentId { get; set; }
    public Incident? Incident { get; set; }
    public int ResourceId { get; set; }
    public Resource? Resource { get; set; }
    public DateTime AssignedAt { get; set; }

    // Null while the assignment is active; set when the resource is
    // released. See ResourceAssignementConfiguration for how this backs a
    // "only one active assignment per resource" DB constraint.
    public DateTime? ReleasedAt  { get; set; }
}
