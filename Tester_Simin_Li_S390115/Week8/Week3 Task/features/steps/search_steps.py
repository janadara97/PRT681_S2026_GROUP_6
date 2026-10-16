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