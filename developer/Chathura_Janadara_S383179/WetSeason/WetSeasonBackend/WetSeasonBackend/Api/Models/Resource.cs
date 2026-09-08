namespace WetSeasonBackend.Api.Models;

// A physical resource (generator, boat, crew, etc.) that can be assigned
// to an incident via a ResourceAssignement row.
public class Resource
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ResourceType Type { get; set; }
    public String HomeDepot { get; set; } =  string.Empty;
    public ICollection<ResourceAssignement> Assignments { get; set; } = new List<ResourceAssignement>();
}
