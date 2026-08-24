namespace WetSeasonBackend.Api.Models;

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