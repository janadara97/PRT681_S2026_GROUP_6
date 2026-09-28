using Exceptionless;
using Temporalio.Activities;
using WetSeasonBackend.Api.Services;

namespace WetSeasonBackend.Api.Workflows;

// An activity is where Temporal lets you do real side effects - the workflow
// itself is never allowed to call IEmailService directly (see IncidentUpdatedWorkflow).
// [Activity] is what makes this callable via Workflow.ExecuteActivityAsync.
// AddScopedActivities<EmailActivities>() (Program.cs) gives each run of this
// its own DI scope - same lifetime idea as a controller's scoped services.
public class EmailActivities(IEmailService emailService, ILogger<EmailActivities> logger)
{
    [Activity]
    public async Task SendIncidentUpdatedEmailAsync(string to, string? userName, int incidentId)
    {
        if (string.IsNullOrEmpty(to))
        {
            throw new ArgumentException("Recipient email address cannot be null or empty.", nameof(to));
        }
        var (subject, body) = EmailTemplates.IncidentUpdated(userName, incidentId); // Example usage of EmailTemplates
        logger.LogInformation("Sending email to {Recipient} with subject {Subject}.", to, subject);
        await emailService.SendEmailAsync(to, subject, body);
        logger.LogInformation("Email sent to {Recipient} with subject {Subject}.", to, subject);
    }

    // Called by the workflow only after SendIncidentUpdatedEmailAsync has
    // used up all its retries and permanently failed. This has to be its own
    // activity, separate from the workflow's catch block, because reporting
    // to Exceptionless is a real network call - not something a workflow is
    // allowed to do itself, same reason it can't take an injected ILogger.
    [Activity]
    public Task ReportPermanentFailureAsync(string activityName, string errorMessage, int incidentId)
    {
        var exception = new Exception($"Temporal activity '{activityName}' permanently failed for incident {incidentId}: {errorMessage}");
        ExceptionlessClient.Default.SubmitException(exception);
        logger.LogInformation("Reported permanent failure of {ActivityName} for incident {IncidentId} to Exceptionless.", activityName, incidentId);
        return Task.CompletedTask;
    }
}