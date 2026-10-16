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

    def open(self):
        self.driver.get(self.BASE_URL)
        WebDriverWait(self.driver, self.WAIT_TIMEOUT).until(
            EC.presence_of_element_located(self.SEARCH_INPUT)
        )

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

    def _find_first_clickable(self, candidates):
        end_time = time.monotonic() + self.WAIT_TIMEOUT
        while time.monotonic() < end_time:
            for locator in candidates:
                try:
                    return WebDriverWait(self.driver, 1).until(EC.element_to_be_clickable(locator))
                except TimeoutException:
                    continue
        raise TimeoutException("None of the candidate locators became clickable.")