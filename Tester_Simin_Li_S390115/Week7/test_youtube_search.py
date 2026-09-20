"""
Selenium (pytest) tests for YouTube's search bar 

"""

import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

BASE_URL = "https://www.youtube.com"
WAIT_TIMEOUT = 10

SEARCH_INPUT = (By.NAME, "search_query")

SEARCH_BUTTON_CANDIDATES = [
    (By.ID, "search-icon-legacy"),
    (By.CSS_SELECTOR, "button[aria-label='Search']"),
    (By.XPATH, "//button[@aria-label='Search']"),
    (By.CSS_SELECTOR, "ytd-searchbox button[aria-label]"),
    (By.CSS_SELECTOR, "#search-form button"),
]

# Candidate locators for the 'X' clear button, tried in order.
# Candidate 1 is the user's own DevTools-verified absolute XPath, trimmed to
# point at the <button> itself rather than the inner ripple div.
CLEAR_BUTTON_CANDIDATES = [
    (By.XPATH,
     "/html/body/ytd-app/div[1]/div[2]/ytd-masthead/div[4]/div[2]/"
     "yt-searchbox/div[1]/div/div/div/button"),                     # exact path (fragile but confirmed today)
    (By.CSS_SELECTOR, "yt-searchbox button:has(yt-touch-feedback-shape)"),  # relative, structure-based
    (By.CSS_SELECTOR, "button[aria-label='Clear search query']"),   # in case an aria-label gets added later
    (By.ID, "clear-button"),                                        # legacy id, kept as last resort
]

RESULT_ITEM_LOCATOR = (By.TAG_NAME, "ytd-video-renderer")


def find_first_clickable(driver, candidates, timeout=WAIT_TIMEOUT):
    """Try each locator in order; return the first one that becomes clickable."""
    end_time = time.monotonic() + timeout
    last_locator_tried = None
    while time.monotonic() < end_time:
        for locator in candidates:
            last_locator_tried = locator
            try:
                el = WebDriverWait(driver, 1).until(EC.element_to_be_clickable(locator))
                print(f"[locator matched] {locator}")
                return el
            except TimeoutException:
                continue
    raise TimeoutException(
        f"None of the candidate locators became clickable within {timeout}s. "
        f"Tried: {candidates}. Last checked: {last_locator_tried}."
    )


@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    drv = webdriver.Chrome(options=options)
    drv.maximize_window()
    drv.get(BASE_URL)
    WebDriverWait(drv, WAIT_TIMEOUT).until(EC.presence_of_element_located(SEARCH_INPUT))
    yield drv
    drv.quit()


def _assert_results_loaded(driver, expected_url_fragment):
    """Shared helper: wait for the results URL AND at least one real result item."""
    WebDriverWait(driver, WAIT_TIMEOUT).until(EC.url_contains("results?search_query="))
    assert "results?search_query=" in driver.current_url
    assert expected_url_fragment in driver.current_url.lower()

    WebDriverWait(driver, WAIT_TIMEOUT).until(
        EC.presence_of_element_located(RESULT_ITEM_LOCATOR)
    )
    results = driver.find_elements(*RESULT_ITEM_LOCATOR)
    assert len(results) > 0, "Expected at least one video result to render on the results page"


# =====================================================================
# TC01 | Functional | Search valid keyword
# Steps: 1. Enter "Python tutorial"  2. Press Enter
# Expected: Navigates to search results related to Python.
# =====================================================================
def test_search_valid_keyword(driver):
    keyword = "Python tutorial"
    search_box = driver.find_element(*SEARCH_INPUT)
    search_box.clear()
    search_box.send_keys(keyword)
    search_box.send_keys(Keys.ENTER)

    _assert_results_loaded(driver, "python")


# =====================================================================
# TC02 | Functional | Search via icon
# Steps: 1. Enter "Music"  2. Click magnifying glass icon
# Expected: Navigates to search results related to Music.
# =====================================================================
def test_search_via_icon(driver):
    keyword = "Music"
    search_box = driver.find_element(*SEARCH_INPUT)
    search_box.clear()
    search_box.send_keys(keyword)

    search_icon = find_first_clickable(driver, SEARCH_BUTTON_CANDIDATES)
    search_icon.click()

    _assert_results_loaded(driver, "music")


# =====================================================================
# TC05 | Functional | Clear input via 'X'
# Steps: 1. Type "Hello"  2. Click the 'X' icon inside the search bar
# Expected: Input field is completely cleared.
# =====================================================================
def test_clear_input_via_x(driver):
    search_box = driver.find_element(*SEARCH_INPUT)
    search_box.clear()
    search_box.send_keys("Hello")
    assert search_box.get_attribute("value") == "Hello"

    clear_icon = find_first_clickable(driver, CLEAR_BUTTON_CANDIDATES)
    clear_icon.click()

    WebDriverWait(driver, WAIT_TIMEOUT).until(lambda d: search_box.get_attribute("value") == "")
    assert search_box.get_attribute("value") == ""


# =====================================================================
# TC07 | Negative | Empty search submission
# Steps: 1. Leave search bar blank  2. Click search icon
# Expected: No action is taken; remains on the current page.
# =====================================================================
def test_empty_search_submission(driver):
    initial_url = driver.current_url

    search_icon = find_first_clickable(driver, SEARCH_BUTTON_CANDIDATES)
    search_icon.click()

    time.sleep(1)  # brief pause; no positive condition to wait on for "nothing happened"
    assert driver.current_url == initial_url


# =====================================================================
# TC11 | Negative | Special character heavy
# (Swapped in to replace the fragile TC12 autosuggest test — see v3 notes)
# Steps: 1. Enter "!@#$%^&*()_+"
# Expected: Handles characters gracefully and searches the literal string.
# =====================================================================
def test_special_character_search(driver):
    payload = "!@#$%^&*()_+"
    search_box = driver.find_element(*SEARCH_INPUT)
    search_box.clear()
    search_box.send_keys(payload)
    search_box.send_keys(Keys.ENTER)

    WebDriverWait(driver, WAIT_TIMEOUT).until(EC.url_contains("results?search_query="))
    assert "results?search_query=" in driver.current_url
    # No assertion on result count -- special characters may legitimately
    # return zero results. We're only confirming YouTube accepts and
    # processes the literal string without erroring out.