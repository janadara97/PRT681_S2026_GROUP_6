using FluentValidation;
using FluentValidation.AspNetCore;
using WetSeasonBackend.Api.Data;
using Microsoft.EntityFrameworkCore;
using WetSeasonBackend.Api.Services;
using WetSeasonBackend.Api.Validators;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter());
    });
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateIncidentRequestValidator>();

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IncidentService>();
var app = builder.Build();

app.MapControllers();
app.MapGet("/", () => "Hello World!");

app.Run();