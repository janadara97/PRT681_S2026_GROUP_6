namespace WetSeasonBackend.Api.Dtos;

// Shape of the JSON body expected by POST /api/auth/login.
public class LoginRequestDto
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
