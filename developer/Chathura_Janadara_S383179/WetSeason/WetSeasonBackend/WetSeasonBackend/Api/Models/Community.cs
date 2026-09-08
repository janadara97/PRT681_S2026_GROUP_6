namespace WetSeasonBackend.Api.Models;

// A plain C# class ("POCO") mapped to a DB table by EF Core convention -
// no annotations needed for the basics; see CommunityConfiguration.cs for
// the fine-tuning (max lengths, unique index).
public class Community
{
    public int Id {get; set;}
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int Population { get; set; }
    public string ContactEmail { get; set; } = string.Empty;

    // Navigation property: lets you write community.Incidents in code.
    // Same idea as a Laravel hasMany() or a JPA @OneToMany - EF Core infers
    // the relationship from this + Incident.Community below.
    public ICollection<Incident> Incidents { get; set; } = new List<Incident>();
}
