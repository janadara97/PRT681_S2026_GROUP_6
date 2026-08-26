using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Dtos;

public class RegisterRequestDto
{
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}