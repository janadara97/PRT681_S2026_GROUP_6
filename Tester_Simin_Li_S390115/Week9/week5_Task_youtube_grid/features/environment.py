"""
behave hooks — browser factory + Selenium Grid + screenshot on failure

What changed compared with Week 8:
  - No more hard-coded webdriver.Chrome(); the browser is chosen from an environment variable
  - When SELENIUM_REMOTE_URL is set, tests connect to the Selenium Grid in Docker (Remote WebDriver)
  - When it is not set, tests fall back to a local browser, so plain `behave` still works on your machine
  - On failure a screenshot is saved to reports/screenshots/ and attached to the Allure report

Environment variables:
  BROWSER              chrome | firefox | edge          (default: chrome)
  SELENIUM_REMOTE_URL  e.g. http://selenium-hub:4444    (empty = run locally)
  HEADLESS             true | false                     (default: true)
  GRID_WAIT_SECONDS    max seconds to wait for the Grid (default: 90)
"""
import json
import os
import re
import time
import urllib.request
from pathlib import Path

from selenium import webdriver

try:  # tests still run locally without allure-behave installed
    import allure
    from allure_commons.types import AttachmentType
except ImportError:  # pragma: no cover
    allure = None

BROWSER = os.getenv("BROWSER", "chrome").lower()
REMOTE_URL = os.getenv("SELENIUM_REMOTE_URL", "").rstrip("/")
HEADLESS = os.getenv("HEADLESS", "true").lower() in ("1", "true", "yes")
GRID_WAIT_SECONDS = int(os.getenv("GRID_WAIT_SECONDS", "90"))
SCREENSHOT_DIR = Path(os.getenv("SCREENSHOT_DIR", "reports/screenshots"))
WINDOW_W, WINDOW_H = 1920, 1080


# ---------------------------------------------------------------- browser options
def _build_options(browser: str):
    if browser == "chrome":
        opts = webdriver.ChromeOptions()
    elif browser == "edge":
        opts = webdriver.EdgeOptions()
    elif browser == "firefox":
        opts = webdriver.FirefoxOptions()
    else:
        raise ValueError(f"Unsupported BROWSER '{browser}' (use chrome / firefox / edge)")

    if browser in ("chrome", "edge"):  # both are Chromium-based, so they share the same flags
        if HEADLESS:
            opts.add_argument("--headless=new")
        opts.add_argument("--no-sandbox")
        opts.add_argument("--disable-dev-shm-usage")
        opts.add_argument(f"--window-size={WINDOW_W},{WINDOW_H}")
        opts.add_argument("--lang=en-US")
    else:  # firefox
        if HEADLESS:
            opts.add_argument("-headless")
        opts.set_preference("intl.accept_languages", "en-US, en")
    return opts


# ---------------------------------------------------------------- wait for the Grid
def _wait_for_grid(browser: str):
    """Poll /status until the Grid is ready AND a node for this browser has registered.

    Much more reliable than `sleep 30` in docker-compose: if nodes register slowly we
    wait longer, if they are quick we start immediately.
    """
    wanted = {"chrome": "chrome", "firefox": "firefox", "edge": "MicrosoftEdge"}[browser]
    deadline = time.monotonic() + GRID_WAIT_SECONDS
    last_err = "no response yet"
    while time.monotonic() < deadline:
        try:
            with urllib.request.urlopen(f"{REMOTE_URL}/status", timeout=5) as resp:
                value = json.load(resp).get("value", {})
            names = {
                slot["stereotype"].get("browserName")
                for node in value.get("nodes", [])
                for slot in node.get("slots", [])
            }
            if value.get("ready") and wanted in names:
                print(f"[grid] ready — node for '{wanted}' registered at {REMOTE_URL}")
                return
            last_err = f"ready={value.get('ready')}, browsers={sorted(n for n in names if n)}"
        except Exception as exc:  # hub is not up yet
            last_err = repr(exc)
        time.sleep(2)
    raise RuntimeError(f"Selenium Grid not ready for '{browser}' after {GRID_WAIT_SECONDS}s ({last_err})")


def _create_driver():
    options = _build_options(BROWSER)
    if REMOTE_URL:
        driver = webdriver.Remote(command_executor=REMOTE_URL, options=options)
    else:  # local mode: start a browser on this machine, same as Week 8
        driver = {"chrome": webdriver.Chrome, "edge": webdriver.Edge,
                  "firefox": webdriver.Firefox}[BROWSER](options=options)
    driver.set_window_size(WINDOW_W, WINDOW_H)  # Firefox ignores --window-size, so set it here for all
    return driver


# ---------------------------------------------------------------- behave hooks
def before_all(context):
    context.browser_name = BROWSER
    print(f"[config] BROWSER={BROWSER} HEADLESS={HEADLESS} "
          f"REMOTE={'local' if not REMOTE_URL else REMOTE_URL}")
    if REMOTE_URL:
        _wait_for_grid(BROWSER)


def before_scenario(context, scenario):
    # A fresh browser session per scenario: scenarios stay independent and can run in parallel
    context.driver = _create_driver()


def after_step(context, step):
    if step.status != "failed" or not hasattr(context, "driver"):
        return
    try:
        png = context.driver.get_screenshot_as_png()
    except Exception as exc:  # if the browser already crashed, don't raise a second error
        print(f"[screenshot] could not capture: {exc!r}")
        return

    SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
    safe = re.sub(r"[^A-Za-z0-9_-]+", "_", context.scenario.name)[:80]
    path = SCREENSHOT_DIR / f"{BROWSER}__{safe}.png"
    path.write_bytes(png)
    print(f"[screenshot] saved {path}  (url: {context.driver.current_url})")

    if allure:
        allure.attach(png, name=f"{BROWSER} – failure screenshot", attachment_type=AttachmentType.PNG)
        allure.attach(context.driver.current_url, name="current url", attachment_type=AttachmentType.TEXT)


def after_scenario(context, scenario):
    if hasattr(context, "driver"):
        context.driver.quit()
        del context.driver
