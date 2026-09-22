# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

WetSeason is an NT wet-season incident coordination app — communities report incidents (flooding,
cyclone damage, road closures, power outages) and coordinators triage, track, and resolve them. It's
a portfolio project demonstrating a .NET / EF Core / React skills matrix. Full background and the
Azure migration write-up are in `README.md`.

## Code style

Write simple, plain, explicit code — in C#, JavaScript, or anything else in this repo. The person
working on this project is still learning to code and wants to read and understand every line
themselves, not just trust that it works. Concretely: prefer named functions and plain `if`/`for`
over clever one-liners or dense chained/functional tricks; don't introduce an abstraction (a
generic helper, a config-driven pattern, an interface) just because it's "more proper" — a few
repeated plain lines beat an abstraction that has to be reverse-engineered. When a language feature
or library API is genuinely required, use it, but explain briefly what it does rather than assuming
familiarity.

## Explaining changes

Whenever generating or changing code in this repo, always explain what the change does and why —
the reasoning behind the approach, not just the diff itself. Don't wait to be asked; include this
by default alongside every code change, not only when something looks unfamiliar.
familiarity.

## Repository structure

Three independent projects, run together locally via one Docker Compose file:

- `WetSeasonBackend/WetSeasonBackend/` — ASP.NET Core (.NET 10) Web API, EF Core + SQL Server, JWT auth.
- `wetseason-frontend/` — React 19 + Vite SPA. **The original, production frontend** (deployed to Azure Static Web Apps).
- `wetseason-frontend-nextjs/` — Next.js (App Router) rewrite. A parallel **learning project**, not deployed, built to learn Next.js/KendoReact hands-on — architected deliberately differently from the Vite app (see below), not a straight port.

## Commands

**Run everything:** `docker compose up -d --build` (SQL Server + backend with `dotnet watch` hot reload + Vite frontend via nginx, on one Docker network). EF Core migrations apply automatically on backend startup — no manual `dotnet ef database update` step, locally or in any environment.

**Backend** (from `WetSeasonBackend/WetSeasonBackend/`):
- `dotnet run` / `dotnet watch run` — run directly (outside Docker), needs `appsettings.Development.json` populated (connection string, `Jwt:Key`/`Jwt:Issuer`, `EmailSettings`, `Cors:AllowedOrigins`).
- `dotnet build`
- `dotnet ef migrations add <Name>` / `dotnet ef database update`
- No test project exists yet in this repo.

**Vite frontend** (from `wetseason-frontend/`): `npm run dev` / `npm run build` / `npm run lint`.

**Next.js frontend** (from `wetseason-frontend-nextjs/`): `npm run dev` / `npm run build` / `npm run lint`. Needs the backend reachable at `http://localhost:5118` (fallback baked into `src/lib/config.js`) unless `API_ROOT` is set.

## Architecture

### Backend (`Api/Controllers` → `Api/Services` → EF Core `Api/Data/AppDbContext`)

- Thin controllers; business logic lives in `Api/Services`. `Api/Dtos` define request/response shapes.
- **List/read endpoints project straight into DTOs with `Select()`** (e.g. `IncidentService.getAllIncidents`), rather than loading full entities. Adding a field to what a DTO returns means adding it to the DTO **and every `Select()` projection that builds one** — there are currently three separate projections building `IncidentListItemDto` (list, create-response, update-response). Missing one silently drops that field from just that response path (this already caused a real bug: `Description` was saved correctly but never selected back out, so every edit silently blanked it).
- FluentValidation validators (`Api/Validators`) run automatically via `AddFluentValidationAutoValidation()` — no manual `.Validate()` calls in controllers.
- JWT claims are set in `AuthService.Login` using the long-form `ClaimTypes.Name` / `.Email` / `.Role` constants — these serialize into the token as full URIs (e.g. `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`), not short names. Anything reading claims back (`AuthService.GetCurrentUserDetails`, or the Next.js app's `src/lib/jwt.js`) has to use the same long form.
- CORS origins are config-driven (`Cors:AllowedOrigins`, comma-separated), read once at startup — not hardcoded. In Docker Compose, the env var `Cors__AllowedOrigins` **overrides** `appsettings.Development.json`'s value (ASP.NET Core config precedence), so editing the JSON file alone has no effect there; both need updating together, and the container needs recreating for the change to take effect.
- log4net is wired in as a provider *underneath* `Microsoft.Extensions.Logging` (`builder.Logging.AddLog4Net(...)`), not a replacement — existing `ILogger<T>` injection is unaffected.
- MailKit sends email from `IncidentService` on incident updates; templates are in `EmailTemplates.cs`.

### Vite frontend — the deployed app

- Client-side routing via `react-router-dom` (`src/App.jsx`).
- JWT stored in `localStorage` (`src/context/AuthContext.jsx`), attached manually as an `Authorization` header in `src/api/client.js`.
- Design tokens defined in `src/index.css` via Tailwind v4's `@theme` block: `canvas`/`ink`/`amber`/`teal`/`danger` palette, IBM Plex Sans/Mono, plus `.btn-primary`/`.field`/`.label-caps` component classes.
- `src/pages/Dashboard.jsx` composes `Header`/`StatCards`/`IncidentTable`/`IncidentFormModal`/`ConfirmDialog`/`Toast` into full incident CRUD.

### Next.js frontend — learning project, not deployed

Built around one deliberate architectural choice: **the JWT is never exposed to browser JavaScript.**
It's stored as an `httpOnly` cookie (`TOKEN_COOKIE` in `src/lib/config.js`), set and read only inside
Server Actions and Server Components — a BFF (Backend-for-Frontend) pattern, not a port of the Vite
app's `localStorage` approach.

Practical implications for anyone extending this app:
- **Every backend call — reads and mutations — must happen server-side** (an `async` Server Component, or a `"use server"` action), never in a Client Component `fetch()`, because client JS cannot read an `httpOnly` cookie. See `src/app/login/actions.js` (login), `src/app/incidents/actions.js` (logout), `src/app/incidents/incidentActions.js` (create/update/delete).
- Mutations call `revalidatePath("/incidents")` on success so the page's Server Component refetches — there's no manual client-side refetch or `setState`-from-response anywhere in this app.
- A Client Component only exists where real interactivity is unavoidable (`LoginForm.js` needs `useActionState` to show a pending/error state; `IncidentsBoard.js` needs local state for search/filter and the KendoReact Grid). Everything else stays a plain Server Component.
- Visual design intentionally mirrors the Vite app's canvas/ink/amber/teal theme (ported into this project's `globals.css`) for side-by-side comparison — that part *is* a deliberate port, unlike the auth architecture.
- Uses **KendoReact Grid** (`@progress/kendo-react-grid`, v16) as a second, independent learning goal. Three version-16-specific traps already hit once, worth knowing before "fixing" them again:
  - Peer dependencies are not fully auto-installed — expect `Module not found` for `@progress/*` packages one at a time until installed; `package.json`'s current `@progress/*` list is the result of chasing all of them down.
  - Custom cell rendering uses `cells={{ data: MyCell }}` (`GridColumnCellsSettings`), not the older `cell={MyCell}` prop. See `IncidentsBoard.js`'s `ActionsCell` for the pattern (spread `props.tdProps` onto the `<td>`, forward `props.render` when present).
  - `sortable`/`pageable` alone only draw the UI controls — add `autoProcessData={{ sort: true, page: true }}` or clicking them does nothing.
- `next dev` regenerates an `AGENTS.md` in this folder warning that this Next.js version (16.3.5) has breaking changes versus older docs/training data. When a Next.js API behaves unexpectedly, check `node_modules/next/dist/docs/` for this installed version rather than assuming an older API still applies.

## Known environment gotcha (this development machine)

A `sudo create-next-app` run early in this project's history left root-owned files scattered in
several places that keep resurfacing: the `wetseason-frontend-nextjs/.next/` build folder, `~/.npm`'s
cache, and occasionally a leftover root-owned `next dev` process still listening on a port. Symptoms:
`EACCES` on file/folder creation, "IO error ... lockfile", or `npm install` failing to write its cache.
Diagnose with `ps aux | grep next` / `stat -f "%Su" <path>`; the fix is always to have the **user**
run `sudo chown -R $(whoami) <path>` or `sudo rm -rf <path>` themselves in their own terminal — it
needs their password, so this isn't something Claude can run directly.
