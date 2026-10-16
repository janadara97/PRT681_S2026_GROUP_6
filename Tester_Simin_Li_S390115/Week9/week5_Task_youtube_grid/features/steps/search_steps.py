from behave import given, when, then
from pages.search_page import YoutubeSearchPage

@given('the user is on the YouTube home page')
def step_impl(context):
    context.page = YoutubeSearchPage(context.driver)
    context.page.open()

@when('the user enters "{keyword}" into the search bar')
def step_impl(context, keyword):
    context.page.enter_search_keyword(keyword)

@when('the user presses the Enter key')
def step_impl(context):
    context.page.submit_search_with_enter()

@then('the search results page related to "{expected_term}" should be loaded')
def step_impl(context, expected_term):
    # Just extracting the first word to match URL fragment logic from old test
    url_fragment = expected_term.split()[0].lower()
    context.page.assert_results_loaded_for(url_fragment)

@when('the user clicks the search icon')
def step_impl(context):
    context.page.click_search_icon()

@when('the user clicks the clear \'X\' icon')
def step_impl(context):
    context.page.click_clear_icon()

@then('the search bar should be completely empty')
def step_impl(context):
    context.page.wait_for_search_box_to_be_empty()
    assert context.page.get_search_box_value() == ""

# ---- Added in Week 5: TC07 / TC11 ----
@when('the user leaves the search bar empty')
def step_impl(context):
    context.page.clear_search_box()
    context.url_before_action = context.page.current_url()

@then('the user should stay on the current page')
def step_impl(context):
    context.page.assert_stays_on(context.url_before_action)

@then('a search results page should be loaded')
def step_impl(context):
    # Special characters may legitimately return zero results, so only assert that the results page loaded without errors
    context.page.assert_on_results_page()