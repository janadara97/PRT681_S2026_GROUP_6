namespace WetSeasonBackend.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string Email { get; set; } = string.Empty;

    // Never store raw passwords. This holds the output of ASP.NET's
    // PasswordHasher (see AuthService) - similar to Laravel's Hash::make().
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
