using System.Text;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WetSeasonBackend.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Exceptionless;
using WetSeasonBackend.Api.Services;
using WetSeasonBackend.Api.Validators;
using Temporalio.Extensions.Hosting;
using WetSeasonBackend.Api.Workflows;


// Entry point - like Spring's Application.java or Laravel's bootstrap/app.php.
var builder = WebApplication.CreateBuilder(args);

// Serilog replaces the default logger; ReadFrom.Configuration reads the
// "Serilog" section of appsettings.json, same pattern as CORS/JWT/Email below.
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();
builder.Host.UseSerilog();

var exceptionlessApiKey = builder.Configuration["Exceptionless:ApiKey"];
var exceptionlessServerUrl = builder.Configuration["Exceptionless:ServerUrl"];

if (string.IsNullOrEmpty(exceptionlessServerUrl))
{
    exceptionlessServerUrl = "http://localhost:7110"; // Default Exceptionless server URL
}

builder.AddExceptionless(options =>
{
    options.ApiKey = exceptionlessApiKey;
    options.ServerUrl = exceptionlessServerUrl;
});
builder.Services.AddProblemDetails();

// builder.Services is the DI container (Spring's ApplicationContext /
// Laravel's service container) - registered here, injected into controllers.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Serialize enums as names ("Responding") not numbers - like a Laravel enum cast.
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });


// FluentValidation - comparable to Laravel Form Requests or Java Bean Validation.
// AutoValidation runs validators automatically before the action executes.
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateIncidentRequestValidator>();

// Registers the EF Core DbContext (like a JPA EntityManager) - "Default" connection string.
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// AddScoped = one instance per HTTP request (Laravel's default "scoped"
// binding) - safe for services that depend on a DbContext.
builder.Services.AddScoped<IncidentService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<CommunityService>();
builder.Services.AddTransient<IEmailService, EmailService>();

builder.Services.AddHttpContextAccessor();

// CORS: without this the browser blocks cross-port frontend calls. Origins
// come from config, not hardcoded, so a new URL is just a setting change.
const string frontendCorsPolicy = "FrontendCorsPolicy";
var allowedOrigins = builder.Configuration["Cors:AllowedOrigins"]?
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
    ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// JWT auth setup - same idea as Laravel Sanctum or Spring Security's JWT filter.
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

// The client: used later (step 6) to tell Temporal "start this workflow".
builder.Services.AddTemporalClient(
    clientTargetHost: builder.Configuration["Temporal:Address"],
    clientNamespace: "default");

// The worker: a background service, living inside this same app, that polls
// Temporal for work on "wetseason-incidents" and actually runs the workflow/
// activity code above. Without this, StartWorkflowAsync (IncidentService)
// would schedule work that nothing ever picks up.
var temporalWorker = builder.Services.AddHostedTemporalWorker(taskQueue: "wetseason-incidents");
temporalWorker.AddScopedActivities<EmailActivities>();
temporalWorker.AddWorkflow<IncidentUpdatedWorkflow>();


builder.Services.Configure<HostOptions>(options =>
{
    options.BackgroundServiceExceptionBehavior = BackgroundServiceExceptionBehavior.Ignore;
});

builder.Services.AddAuthorization(); // enables the [Authorize] attribute

// Finalizes DI; everything after this configures the request pipeline.
var app = builder.Build();



// Applies pending EF Core migrations on every startup - a no-op if none are
// pending, so safe to run on every restart, not just the first.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}
app.UseExceptionHandler();
app.UseExceptionless();
// Middleware pipeline - like Laravel's middleware stack or a chain of Servlet filters.
app.UseCors(frontendCorsPolicy);

app.UseAuthentication(); // who is calling? (reads the JWT)
app.UseAuthorization();  // are they allowed? ([Authorize] checks)
app.MapControllers();    // route requests to [Route]/[Http*] actions
app.MapGet("/", () => "Hello World!"); // basic health-check route

// Starts the Kestrel server and blocks here until the process stops.
app.Run();
