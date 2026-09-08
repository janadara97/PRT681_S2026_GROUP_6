namespace WetSeasonBackend.Api.Models;

// The "join table" entity linking an Incident to a Resource, with extra
// columns (AssignedAt/ReleasedAt) - EF Core can't infer this many-to-many
// automatically because of those extra fields, so it's modeled as its own
// entity with two one-to-many relationships instead.
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
