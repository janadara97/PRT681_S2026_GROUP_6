using Temporalio.Common;
using Temporalio.Exceptions;
using Temporalio.Workflows;
using WetSeasonBackend.Api.Services;
namespace WetSeasonBackend.Api.Workflows;

[Workflow]
// No constructor here, unlike EmailActivities - Temporal has to be able to
// create this class itself, without a DI container, so it can't take
// injected services like ILogger. Workflow.Logger below is Temporal's own
// substitute: a logger built into the SDK that's safe to use in a workflow
// (it skips logging on replay, so you don't see the same line twice).
public class IncidentUpdatedWorkflow
{
    [WorkflowRun]
        public async Task RunAsync(int incidentId, string email, string? userName)
        {
            Workflow.Logger.LogInformation("Workflow started for incident {IncidentId} - sending update email.", incidentId);

            var retryPolicy = new RetryPolicy();
            retryPolicy.MaximumAttempts = 5;
            var activityOptions = new ActivityOptions();
            activityOptions.StartToCloseTimeout = TimeSpan.FromMinutes(1);
            activityOptions.RetryPolicy = retryPolicy;
            
            try
            {
                await Workflow.ExecuteActivityAsync(
                            (EmailActivities activities) => activities.SendIncidentUpdatedEmailAsync(email, userName, incidentId),
                            activityOptions);
            }
            catch (ActivityFailureException e)
            {
                // Reaching here means the activity above used up all 5 retries
                // and permanently failed - this is a second, separate activity
                // call just to report that fact to Exceptionless.
                var reportOptions = new ActivityOptions();
                reportOptions.StartToCloseTimeout = TimeSpan.FromSeconds(30);

                await Workflow.ExecuteActivityAsync(
                            (EmailActivities activities) => activities.ReportPermanentFailureAsync("SendIncidentUpdatedEmail", e.Message, incidentId),
                            reportOptions);
            }
        }
}
