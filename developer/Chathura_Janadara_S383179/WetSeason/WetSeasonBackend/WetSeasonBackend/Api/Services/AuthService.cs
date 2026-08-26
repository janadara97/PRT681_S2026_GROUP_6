using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WetSeasonBackend.Api.Data;
using WetSeasonBackend.Api.Models;

namespace WetSeasonBackend.Api.Services;

public class AuthService(AppDbContext db)
{
    private readonly PasswordHasher<User> hasher = new();

    public string? Login(string? username, string? password, IConfiguration configuration)
    {
        var user = db.Users.SingleOrDefault(u => u.Username == username);
        if (user == null)
        {
            return null;
        }

        var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
        if (result == PasswordVerificationResult.Failed)
        {
            return null;
        }

        var Claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: configuration["Jwt:Issuer"],
            claims: Claims,
            expires: DateTime.Now.AddHours(8),
            signingCredentials: credentials);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    public async Task<User?> RegisterAsync(string username, string password, UserRole role, string name, string email)
    {
        var userNameTaken = await db.Users.AnyAsync(u => u.Username == username);
        if (userNameTaken)
        {
            return null; 
        }

        var user = new User
        {
            Username = username,
            Role = role,
            Name = name,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        user.PasswordHash = hasher.HashPassword(user, password);

        db.Users.Add(user);
        await db.SaveChangesAsync();
        return user;
    }
}
