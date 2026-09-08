namespace WetSeasonBackend.Api.Models;

// C# enums store as integers by default, but EF Core config converts these
// to strings in the DB (see e.g. IncidentConfiguration) and Program.cs
// converts them to strings in JSON - so the API and DB stay readable.

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
