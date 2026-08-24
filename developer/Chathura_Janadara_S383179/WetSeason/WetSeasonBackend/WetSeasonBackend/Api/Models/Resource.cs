namespace WetSeasonBackend.Api.Models;

public class Resource
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public ResourceType Type { get; set; }
    public String HomeDepot { get; set; } =  string.Empty;
    public ICollection<ResourceAssignement> Assignments { get; set; } = new List<ResourceAssignement>();
}