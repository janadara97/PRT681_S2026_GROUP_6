namespace WetSeasonBackend.Api.Services;

public static class EmailTemplates
{
    public static (string Subject, string Body) IncidentUpdated(string? userName, int incidentId) =>
        ("Incident Updated", Layout("Incident Updated",
            $"<p>Hi {userName}, incident #{incidentId} has just been updated.</p>"));

    // Shared wrapper so every email looks consistent without copy-pasting
    // the same header/footer HTML into each template above.
    private static string Layout(string heading, string innerHtml) =>
        $"<div style=\"font-family: sans-serif;\"><h1>{heading}</h1>{innerHtml}<p style=\"color:#888;font-size:12px;\">WetSeason — NT wet-season incident coordination</p></div>";
}
