namespace WetSeasonBackend.Api.Dtos;

// DTO = Data Transfer Object: a plain class shaping what a client sends/
// receives, kept separate from the EF entity so the API contract doesn't
// change every time the DB model does. Same idea as a Laravel Form
// Request or a Java DTO/record used at a controller boundary.
public class AssignResourceRequestDto
{
    public int IncidentId { get; set; }
    public int ResourceId { get; set; }
}
