namespace WetSeasonBackend.Api.Models;

// A plain C# class ("POCO") mapped to a DB table by convention - see
// CommunityConfiguration.cs for the fine-tuning (max lengths, unique index).
public class Community
{
    public int Id {get; set;}
    public string Name { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public int Population { get; set; }
    public string ContactEmail { get; set; } = string.Empty;

    // Navigation property: lets you write community.Incidents in code - like a
    // Laravel hasMany() or JPA @OneToMany, inferred from this + Incident.Community.
    public ICollection<Incident> Incidents { get; set; } = new List<Incident>();
}
