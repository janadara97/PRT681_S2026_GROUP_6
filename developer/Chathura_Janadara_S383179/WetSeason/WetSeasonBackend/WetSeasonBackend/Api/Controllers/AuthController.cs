using Microsoft.AspNetCore.Mvc;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Controllers;

// [ApiController] enables auto model validation + JSON binding, like Spring's
// @RestController. [Route] maps to /api/auth ([controller] = class name minus "Controller").
[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService, IConfiguration configuration, ILogger<AuthController> logger) : ControllerBase
{
    // [HttpPost("login")] maps to POST /api/auth/login, like Spring's
    // @PostMapping or Laravel's Route::post().
    [HttpPost]
    [Route("login")]
    public ActionResult<String> Login(LoginRequestDto loginRequestDto)
    {
        var token = authService.Login(loginRequestDto.Username, loginRequestDto.Password, configuration);
        if (token == null)
        {   
            logger.LogWarning("Invalid login attempt for username: {Username}", loginRequestDto.Username);
            return Unauthorized("Invalid username or password.");
        }
        logger.LogInformation("Logged in: {Username}", loginRequestDto.Username);
        return Ok(new {token});
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register(RegisterRequestDto registerRequest)
    {
        var user = await authService.RegisterAsync(registerRequest.Username, registerRequest.Password, registerRequest.Role, registerRequest.Name, registerRequest.Email);
        if(user is null)
        {
            logger.LogWarning("Failed registration attempt for username: {Username}", registerRequest.Username);
            return BadRequest("Username is already taken.");
        }
        // Anonymous object so PasswordHash is never included in the
        // response, even though the full User entity has it.
        logger.LogInformation("Registered new user: {Username}", registerRequest.Username);
        return Ok(new{user.Id, user.Username, user.Role, user.Name, user.Email});
    }
}
