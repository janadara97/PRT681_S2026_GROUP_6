namespace WetSeasonBackend.Api.Models;

// Enums store as integers by default, but EF Core (see IncidentConfiguration)
// and Program.cs's JSON converter both render them as strings for readability.

public enum IncidentStatus
{
    Reported,
    Triaged,
    Responding,
    Resolved,
    Closed
}

public enum IncidentType
{
    Flooding,
    CycloneDamage,
    RoadClosure,
    Evacuation,
    InfrastructureDamage
}

public enum ResourceType
{
    Generator,
    Pump,
    Vehicle,
    Boat,
    Crew,
    SatellitePhone
}

public enum UserRole
{
    PublicUser,
    FieldOfficer,
    Coordinator,
    Admin
}
