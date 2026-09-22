---
argument-hint: <issue-number>
---

!`gh issue view $ARGUMENTS`

Investigate and fix the issue above.

1. Trace the bug to its root cause - check real evidence first (logs, a `curl` against the actual
   endpoint, `docker ps`/`git status`), don't guess at the cause before confirming it.
2. Implement the fix.
3. Verify it: if a test project exists for the affected area, write or update a test; otherwise
   (there is no test project yet for the backend or either frontend), verify directly - re-run the
   request that was failing, reload the affected page, or re-check the log line that showed the bug.
4. Summarize what you changed and why.
