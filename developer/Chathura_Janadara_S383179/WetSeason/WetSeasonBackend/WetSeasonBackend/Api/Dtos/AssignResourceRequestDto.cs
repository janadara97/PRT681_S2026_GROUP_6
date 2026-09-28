namespace WetSeasonBackend.Api.Dtos;

// DTO: a plain class shaping what a client sends/receives, kept separate
// from the EF entity - like a Laravel Form Request or a Java DTO/record.
public class AssignResourceRequestDto
{
    public int IncidentId { get; set; }
    public int ResourceId { get; set; }
}
