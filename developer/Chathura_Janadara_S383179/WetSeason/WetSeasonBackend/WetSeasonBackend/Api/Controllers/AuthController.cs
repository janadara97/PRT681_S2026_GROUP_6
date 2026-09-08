using Microsoft.AspNetCore.Mvc;
using WetSeasonBackend.Api.Dtos;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Controllers;

// [ApiController] enables automatic model validation (400 responses on
// invalid input) and JSON binding conventions - similar to Spring's
// @RestController. [Route] maps this class to /api/auth ([controller]
// resolves to the class name minus "Controller").
[ApiController]
[Route("api/[controller]")]
public class AuthController(AuthService authService, IConfiguration configuration) : ControllerBase
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
            return Unauthorized("Invalid username or password.");
        }
        return Ok(new {token});
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register(RegisterRequestDto registerRequest)
    {
        var user = await authService.RegisterAsync(registerRequest.Username, registerRequest.Password, registerRequest.Role, registerRequest.Name, registerRequest.Email);
        if(user is null)
        {
            return BadRequest("Username is already taken.");
        }
        // Anonymous object so PasswordHash is never included in the
        // response, even though the full User entity has it.
        return Ok(new{user.Id, user.Username, user.Role, user.Name, user.Email});
    }
}
