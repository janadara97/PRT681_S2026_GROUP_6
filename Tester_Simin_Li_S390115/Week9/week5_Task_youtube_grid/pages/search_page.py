import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

class YoutubeSearchPage:
    BASE_URL = "https://www.youtube.com"
    WAIT_TIMEOUT = 10

    SEARCH_INPUT = (By.NAME, "search_query")
    RESULT_ITEM_LOCATOR = (By.TAG_NAME, "ytd-video-renderer")
    
    SEARCH_BUTTON_CANDIDATES = [
        (By.ID, "search-icon-legacy"),
        (By.CSS_SELECTOR, "button[aria-label='Search']"),
        (By.XPATH, "//button[@aria-label='Search']"),
        (By.CSS_SELECTOR, "ytd-searchbox button[aria-label]"),
        (By.CSS_SELECTOR, "#search-form button"),
    ]

    CLEAR_BUTTON_CANDIDATES = [
        (By.XPATH, "/html/body/ytd-app/div[1]/div[2]/ytd-masthead/div[4]/div[2]/yt-searchbox/div[1]/div/div/div/button"),
        (By.CSS_SELECTOR, "yt-searchbox button:has(yt-touch-feedback-shape)"),
        (By.CSS_SELECTOR, "button[aria-label='Clear search query']"),
        (By.ID, "clear-button"),
    ]

    def __init__(self, driver):
        self.driver = driver

    # Added in Week 5: on CI machines / EU IPs the first visit may redirect to consent.youtube.com
    CONSENT_ACCEPT_CANDIDATES = [
        (By.CSS_SELECTOR, "button[aria-label^='Accept all']"),
        (By.XPATH, "//button[.//span[normalize-space()='Accept all']]"),
    ]

    def open(self):
        self.driver.get(self.BASE_URL)
        self._dismiss_consent_if_present()
        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
            EC.presence_of_element_located(self.SEARCH_INPUT)
        )

    def _dismiss_consent_if_present(self):
        """Browsers in containers start with a fresh profile and no cookies; click "Accept all" if the consent page appears."""
        if "consent." not in self.driver.current_url:
            return
        try:
            self._find_first_clickable(self.CONSENT_ACCEPT_CANDIDATES).click()
            WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
                lambda d: "consent." not in d.current_url
            )
        except TimeoutException:
            pass  # let the following wait report the real error

    def enter_search_keyword(self, keyword):
        search_box = self.driver.find_element(*self.SEARCH_INPUT)
        search_box.clear()
        search_box.send_keys(keyword)

    def submit_search_with_enter(self):
        self.driver.find_element(*self.SEARCH_INPUT).send_keys(Keys.ENTER)

    def click_search_icon(self):
        search_icon = self._find_first_clickable(self.SEARCH_BUTTON_CANDIDATES)
        search_icon.click()

    def click_clear_icon(self):
        clear_icon = self._find_first_clickable(self.CLEAR_BUTTON_CANDIDATES)
        clear_icon.click()

    def get_search_box_value(self):
        return self.driver.find_element(*self.SEARCH_INPUT).get_attribute("value")

    def wait_for_search_box_to_be_empty(self):
        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
            lambda d: self.get_search_box_value() == ""
        )

    def assert_results_loaded_for(self, expected_url_fragment):
        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(EC.url_contains("results?search_query="))
        assert "results?search_query=" in self.driver.current_url
        assert expected_url_fragment.lower() in self.driver.current_url.lower()

        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
            EC.presence_of_element_located(self.RESULT_ITEM_LOCATOR)
        )
        results = self.driver.find_elements(*self.RESULT_ITEM_LOCATOR)
        assert len(results) > 0

    # ---- Added in Week 5: used by TC07 / TC11 ----
    def clear_search_box(self):
        self.driver.find_element(*self.SEARCH_INPUT).clear()

    def current_url(self):
        return self.driver.current_url

    def assert_stays_on(self, url, settle_seconds=1.5):
        # "Nothing happened" has no positive condition to wait for, so observe briefly (same approach as Week 4)
        time.sleep(settle_seconds)
        assert self.driver.current_url == url, f"Expected to stay on {url}, got {self.driver.current_url}"

    def assert_on_results_page(self):
        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(EC.url_contains("results?search_query="))

    def _find_first_clickable(self, candidates):
        end_time = time.monotonic() + self.WAIT_TIMEOUT
        while time.monotonic() < end_time:
            for locator in candidates:
                try:
                    return WebDriverWait(self.driver, 1).until(EC.element_to_be_clickable(locator))
                except TimeoutException:
                    continue
        raise TimeoutException("None of the candidate locators became clickable.")