# Iteration-1 Common Tasks — Course Notes

## 1. JIRA

**Learning Jira (Cloud Edition)**
- Jira Cloud organizes work into Projects, which contain Issues (stories, tasks, bugs, epics) tracked across a workflow.
- Boards (Scrum/Kanban) visualize issue status; you move cards through columns like To Do → In Progress → Done.
- Filters, JQL (Jira Query Language), and dashboards let you slice issues by assignee, sprint, priority, or label.

---

## 2. Confluence

**Confluence Topic Hub (pages, blogs, tables, search)**
- Confluence organizes content into Spaces, each containing a page tree for documentation, plans, and meeting notes.
- Pages support macros (tables, task lists, status badges, embedded Jira issues) for rich, structured content.
- Search and labels make content discoverable across spaces; page history tracks edits and lets you restore versions.

---

## 3. Visio

**Visio 2019 Essential Training**
- Visio uses shape stencils (flowchart, network, org chart, etc.) that you drag onto a canvas and connect with lines/arrows.
- Auto-connect and dynamic connectors keep shapes linked even when you rearrange the diagram layout.
- Diagrams can be data-linked to Excel so shape colors/labels update automatically as source data changes.

---

## 4. Draw.io (diagrams.net)

**Make Effective Flowcharts with draw.io / diagrams.net**
- Draw.io is a free, browser-based diagramming tool that saves files directly to Google Drive, OneDrive, or local storage.
- Standard flowchart symbols (start/end ovals, decision diamonds, process rectangles) keep diagrams readable and consistent.
- Effective flowcharts follow one direction (top-to-bottom or left-to-right), minimize crossing lines, and use clear labels on decision branches.

---

## 5. Trello

**Trello Essential Training**
- Trello organizes work as Boards → Lists → Cards, a simple Kanban-style system for tracking tasks visually.
- Cards support checklists, due dates, labels, attachments, and comments for full task detail.
- Power-Ups extend Trello with integrations (calendar view, automation via Butler, custom fields).

---

## 6. Microsoft Planner

**Microsoft Planner Essential Training**
- Planner organizes tasks into Buckets within a Plan, similar to Trello's list/card structure but integrated with Microsoft 365.
- Tasks can have assignees, due dates, priority, checklists, and attachments from OneDrive/SharePoint.
- The Charts view gives a quick visual breakdown of task status and workload per team member.

---

## 7. OneNote

**OneNote Essential Training**
- OneNote organizes notes into Notebooks → Sections → Pages, functioning like a digital binder.
- You can freely place text, images, audio, and handwritten ink anywhere on a page (not a linear document).
- Notebooks sync via OneDrive, making them shareable and editable across devices and team members.

---

## 8. Microsoft Office Suite

**Getting Started with Microsoft 365 (path)**
- Microsoft 365 bundles cloud versions of Word, Excel, PowerPoint, Outlook, Teams, and OneDrive under one subscription.
- Files save automatically to OneDrive/SharePoint, enabling real-time co-authoring across the suite.
- The Office web apps mirror desktop functionality closely enough for most day-to-day editing tasks.

---

## 9. Outlook & Teams

**Outlook Essential Training (Microsoft 365)**
- Outlook manages email, calendar, and contacts in one interface; rules and folders help triage high email volume.
- Calendar sharing and scheduling assistant make it easy to find meeting times across multiple people's availability.
- Categories, flags, and Focused Inbox help prioritize what needs action versus what can wait.

---

## 10. Git, GitHub & Bitbucket

**Git Essential Training**
- Git tracks changes via commits, each a snapshot with a message describing what changed and why.
- Branches let you work on features in isolation; merging brings those changes back into the main line of history.
- `git status`, `git add`, `git commit`, `git push`, and `git pull` form the core day-to-day workflow.

**GitHub Essential Training: 1 The Basics**
- GitHub hosts Git repositories remotely and adds collaboration features: pull requests, issues, and code review.
- A pull request proposes merging one branch into another and is where teammates comment on and approve changes.
- Forking lets you copy someone else's repo to your account to contribute without direct write access to the original.

**Bitbucket (via Git skills)**
- Bitbucket is Atlassian's Git hosting service — same underlying Git commands as GitHub, with a different web UI.
- It integrates tightly with Jira, letting you link commits and pull requests directly to Jira issues.
- Repository permissions and branch protection rules work similarly to GitHub's, just under different menu names.

---

## 11. SharePoint & OneDrive

- SharePoint hosts document libraries and team sites, giving a shared, permission-controlled home for files.
- OneDrive is the personal cloud drive layer; files can be shared individually or synced to a SharePoint library.
- Version history is kept automatically for files in both, allowing rollback to earlier versions if needed.

---

## 12. Power BI

**Power BI Essential Training**
- Power BI Desktop connects to data sources (Excel, SQL, web) and lets you shape data in Power Query before building visuals.
- Reports are built from visuals (charts, tables, cards) placed on a canvas, all linked to the underlying data model.
- Relationships between tables (like a database join) let visuals from different tables interact correctly on the same report.

---

## 13. Lucidchart

**Getting Started in Lucidchart in Under 5 Minutes**
- Lucidchart is a cloud-based diagramming tool similar to Visio, with real-time multi-user collaboration built in.
- Shape libraries cover flowcharts, wireframes, ER diagrams, and org charts, with drag-and-drop connectors.
- Diagrams save automatically and can be shared via link with view or edit permissions, like a Google Doc.

---

## 14. Microsoft Forms

**Microsoft Forms Essential Training**
- Forms lets you build surveys and quizzes with question types like choice, text, rating, and ranking.
- Responses collect automatically into a linked Excel spreadsheet or the built-in results view with charts.
- Branching logic can route respondents to different questions based on a previous answer.

---

## 15. Excel

- Covered separately in role-specific Excel courses (see Report Analyst / Data Analyst notes).

---

## 16. Notepad++

**Notepad++ Tutorial for Beginners**
- Notepad++ is a lightweight text editor with syntax highlighting for many languages (SQL, JSON, XML, Python, etc.).
- Features like multi-line editing, find-and-replace with regex, and plugins make it useful for quick file edits or log inspection.
- It's commonly used for editing config files or SQL scripts without the overhead of a full IDE.

---

## 17. PowerShell

**PowerShell 7 Essential Training**
- PowerShell is an object-based shell — commands (cmdlets) output structured objects, not just plain text like traditional shells.
- Cmdlets follow a Verb-Noun naming pattern (e.g., `Get-Process`, `Set-Location`), making commands predictable to guess.
- The pipeline (`|`) passes objects between cmdlets, so you can filter, sort, and transform data in one line (e.g., `Get-Process | Sort-Object CPU`).

---

## 18. Batch Scripting / CMD

**Batch Scripting Tutorial for Beginners**
- Batch files (`.bat`) automate sequences of CMD commands, useful for simple repetitive tasks like file cleanup or backups.
- Core commands include `echo`, `set` (variables), `if`, `for` (loops), and `call` (running other scripts).
- CMD commands like `dir`, `copy`, `xcopy`, `del`, and `ipconfig` cover file management and basic network diagnostics.

---

## Status Tracker

| # | Tool | Course | Status |
|---|------|--------|--------|
| 1 | JIRA | Learning Jira (Cloud Edition) | ✅ Done |
| 2 | Confluence | Confluence Topic Hub | ✅ Done |
| 3 | Visio | Visio 2019 Essential Training | ✅ Done |
| 4 | Draw.io | Make Effective Flowcharts | ✅ Done |
| 5 | Trello | Trello Essential Training | ✅ Done |
| 6 | MS Planner | Microsoft Planner Essential Training | ✅ Done |
| 7 | OneNote | OneNote Essential Training | ✅ Done |
| 8 | MS Office | Getting Started with Microsoft 365 | ✅ Done |
| 9 | Outlook | Outlook Essential Training | ✅ Done |
| 9 | Teams | Microsoft Teams Topic Hub | ✅ Done |
| 10 | Git | Git Essential Training | ✅ Done |
| 10 | GitHub | GitHub Essential Training: 1 The Basics | ✅ Done |
| 10 | Bitbucket | Basics via Git skills | ✅ Done |
| 11 | SharePoint/OneDrive | Bundled in MS 365 paths | ✅ Done |
| 12 | Power BI | Power BI Essential Training | ✅ Done |
| 13 | Lucidchart | Getting Started in Lucidchart | ✅ Done |
| 14 | MS Forms | Microsoft Forms Essential Training | ✅ Done |
| 16 | Notepad++ | Notepad++ Tutorial for Beginners | ✅ Done |
| 17 | PowerShell | PowerShell 7 Essential Training | ✅ Done |
| 18 | Batch Script | Batch Scripting Tutorial for Beginners | ✅ Done |
