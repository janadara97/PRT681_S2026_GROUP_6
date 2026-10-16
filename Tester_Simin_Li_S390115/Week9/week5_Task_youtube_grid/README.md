# Week 5 Practice — Containerized BDD Tests + Selenium Grid + CI/CD Regression Gate

Built on top of the Week 8 **YouTube search BDD project** (behave + Page Object Model), this completes both Week 5 practice tasks:

1. **Containerize the test suite** and run it against a **multi-browser Selenium Grid** in Docker (Chrome / Firefox / Edge)
2. **Wire it into a CI/CD pipeline** (GitHub Actions, plus an Azure DevOps version) that **fails the build whenever a regression occurs**

```
┌──────────── docker compose ──────────────────────────────────────────────────┐
│                                                                              │
│  tests (BROWSER=chrome) ─┐                            ┌─▶ node-chrome  :7900 │
│  tests (BROWSER=firefox) ┼─ Remote WebDriver ─▶ selenium-hub ─▶ node-firefox :7901 │
│  tests (BROWSER=edge)  ──┘       :4444                └─▶ node-edge    :7902 │
│        │                                                                     │
│        └─▶ ./reports  (allure-results / junit / screenshots)                 │
└──────────────────────────────────────────────────────────────────────────────┘
                     │
      CI: any failure → build red ✗ ; Allure report uploaded as an artifact
```

## Project structure

| Path | Purpose |
|---|---|
| `features/youtube_search.feature` | Gherkin scenarios (TC01/02/05 from Week 8; TC07/11 migrated from the Week 4 pytest version) |
| `features/steps/search_steps.py` | Step definitions (they only call the Page Object, never locators) |
| `pages/search_page.py` | `YoutubeSearchPage` — the POM; all locators and waits live here |
| `features/environment.py` | **Browser factory**: picks the browser from `BROWSER`; connects to the Grid when `SELENIUM_REMOTE_URL` is set, otherwise runs locally; screenshots on failure |
| `features/regression_demo.feature` | An intentionally failing scenario (`@demo_failure`) used to demo the gate |
| `Dockerfile` | Test-suite image (Python only, no browsers) |
| `docker-compose.yml` | Hub + 3 browser nodes + the test container |
| `scripts/run_tests.sh` | Container entrypoint: runs behave, writes Allure + JUnit, **returns the exit code unchanged** |
| `scripts/run_all.sh` | Local one-shot run: 3 browsers **in parallel** + merged report |
| `scripts/merge_allure_results.py` | Merges per-browser Allure results (so identical scenarios aren't collapsed as "retries") |
| `scripts/junit_summary.py` | Generates the GitHub Job Summary table |
| `.github/workflows/e2e.yml` | GitHub Actions pipeline |
| `azure-pipelines.yml` | Equivalent Azure DevOps pipeline |

## Running locally

Prerequisite: Docker Desktop.

```bash
# All three browsers in parallel (the first run pulls images, so it's slow)
./scripts/run_all.sh

# A single browser
docker compose up -d selenium-hub firefox
BROWSER=firefox docker compose run --rm tests

# Smoke tests only
TAGS=@smoke ./scripts/run_all.sh

# Watch the browser inside the container: turn off headless, then open http://localhost:7900 (password: secret)
KEEP_GRID=1 HEADLESS=false BROWSERS=chrome ./scripts/run_all.sh

# Without Docker, just like Week 8 (no SELENIUM_REMOTE_URL = local mode)
pip install -r requirements.txt
behave
```

Grid console: <http://localhost:4444/ui> — shows registered nodes and running sessions.

> **Apple Silicon (M1/M2/M3):** Edge has no arm64 image, and Google Chrome has no Linux arm64 build. Use:
> `CHROME_NODE_IMAGE=selenium/node-chromium BROWSERS="chrome firefox" ./scripts/run_all.sh`
> (GitHub Actions runners are x86, so all three browsers work there.)

Report: `reports/allure-report/index.html` (needs the `allure` CLI, or run
`npx allure-commandline generate reports/allure-merged -o reports/allure-report --clean`). Failure screenshots are in `reports/screenshots/`.

## CI/CD: how a regression fails the build

The chain is: **a behave scenario fails → exit code 1 → `docker compose run` exits 1 → the CI step fails → the job fails → `Quality gate` fails**. No step swallows the exit code (`run_tests.sh` ends with `exit $status`).

| Trigger | What runs |
|---|---|
| Push to `main` / any PR | Chrome, Firefox and Edge **in parallel** (matrix), all scenarios |
| Every 6 hours (schedule) | `@smoke` on Chrome only — **synthetic monitoring**; a failure opens a GitHub Issue automatically |
| Manual "Run workflow" with `inject_failure` ticked | Also runs `@demo_failure` to **demonstrate a red build** |

Each run produces:
- `results-<browser>` artifact: raw Allure results, JUnit XML, failure screenshots, Grid logs
- `allure-report` artifact: the merged HTML report (3 browsers side by side)
- Job Summary: a pass/fail table per browser

**Make it a real gate:** in your GitHub repo → Settings → Branches → add a protection rule for `main` → Require status checks → select **Quality gate**. From then on, a PR with a regression cannot be merged.

### Demo steps (for assignment screenshots)

1. Push the project to a new GitHub repo → the Actions tab runs automatically → all green
2. Actions → *E2E – Selenium Grid (Docker)* → **Run workflow** → tick `inject_failure` → run → `Quality gate` turns red, the Summary lists the failed scenario, and the Allure report contains the failure screenshot
3. Alternative demo: create a branch, change `SEARCH_INPUT` in `pages/search_page.py` to a wrong locator → open a PR → the PR check fails and the PR can't be merged

## Key concepts mapping

| Concept | Where it lives in this project |
|---|---|
| Containerized testing / Selenium Grid | `docker-compose.yml`: Hub + 3 nodes; tests connect via `webdriver.Remote` |
| Parallel test execution | Locally, `run_all.sh` starts 3 test containers at once; in CI, a matrix; `SE_NODE_MAX_SESSIONS` controls per-node concurrency |
| Headless CI/CD runs | `HEADLESS=true` (Chrome/Edge `--headless=new`, Firefox `-headless`) |
| Page Object Model | `pages/search_page.py`; no locators in the step definitions |
| BDD | behave (Python's Cucumber), Gherkin + tags `@smoke @negative @TCxx` |
| Synthetic transaction monitoring | Scheduled workflow runs `@smoke` against live YouTube; failure opens an issue |
| Test reporting artifacts | Allure (with failure screenshots and URLs) + JUnit (native CI test views) + Job Summary |

## What changed from Week 8

- `environment.py`: rewritten as a browser factory + Grid wait (polls `/status` until a node for the browser registers, instead of `sleep`) + failure screenshots
- `search_page.py`: added consent-page handling (containers start with a fresh browser profile, and EU IPs get redirected to `consent.youtube.com` first) plus the methods TC07/TC11 need; existing methods are unchanged
- `youtube_search.feature`: added a `Background` and tags, plus two negative scenarios, TC07 and TC11

## Known caveats

- The system under test is live YouTube, so tests can occasionally fail because of redesigns, network issues or bot protection. Catching that is exactly what synthetic monitoring is for, but it also means a PR failure isn't always caused by your code — check the screenshot.
- All image versions are controlled by `SELENIUM_TAG` (default `4.48.0-20260905`), so upgrading means changing one value.
