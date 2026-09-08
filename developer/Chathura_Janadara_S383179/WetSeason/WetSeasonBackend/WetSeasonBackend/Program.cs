using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WetSeasonBackend.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WetSeasonBackend.Api.Services;
using WetSeasonBackend.Api.Validators;

// Single entry point for the API (like Spring's Application.java or
// Laravel's bootstrap/app.php + routes combined). Runs once at startup.
var builder = WebApplication.CreateBuilder(args);

// builder.Services is the DI container (like Spring's ApplicationContext
// or Laravel's service container) - things registered here can be
// injected into controller constructors instead of being "new"-ed up.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Serialize enums as their name ("Responding") instead of a number,
        // similar to a Laravel enum cast or Jackson's @JsonValue.
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// FluentValidation = this project's validation library, comparable to
// Laravel Form Requests or Java Bean Validation. AutoValidation runs
// validators automatically before an action executes.
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateIncidentRequestValidator>();

// Registers the EF Core DbContext (a unit-of-work, similar to a JPA
// EntityManager) pointed at the "Default" connection string.
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// AddScoped = one instance per HTTP request (Laravel's default "scoped"
// binding) - safe for services that depend on a DbContext.
builder.Services.AddScoped<IncidentService>();
builder.Services.AddScoped<AuthService>();

// CORS: without this, the browser blocks the React dev server (different
// port) from calling this API.
const string frontendCorsPolicy = "FrontendCorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5176")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// JWT auth setup, same idea as Laravel Sanctum or Spring Security's JWT
// filter - validates the "Authorization: Bearer <token>" header.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            // Same secret key used to sign tokens in AuthService.
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization(); // enables the [Authorize] attribute

// Finalizes the DI container. Everything after this configures the
// request pipeline instead of registering services.
var app = builder.Build();

// Middleware pipeline: each request passes through these in order,
// like Laravel's middleware stack or a chain of Servlet filters.
app.UseCors(frontendCorsPolicy);

app.UseAuthentication(); // who is calling? (reads the JWT)
app.UseAuthorization();  // are they allowed? ([Authorize] checks)
app.MapControllers();    // route requests to [Route]/[Http*] actions
app.MapGet("/", () => "Hello World!"); // basic health-check route

// Starts the Kestrel server and blocks here until the process stops.
app.Run();
