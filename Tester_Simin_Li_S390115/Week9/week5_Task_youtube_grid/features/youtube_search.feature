@search
Feature: YouTube Search Functionality
  As a YouTube user,
  I want to use the search bar,
  So that I can find videos I am interested in.

  Background:
    Given the user is on the YouTube home page

  # @smoke = critical path. The scheduled synthetic monitoring run executes only scenarios with this tag
  @smoke @TC01
  Scenario: Search with a valid keyword
    When the user enters "Python tutorial" into the search bar
    And the user presses the Enter key
    Then the search results page related to "Python tutorial" should be loaded

  @TC02
  Scenario: Search via the search icon
    When the user enters "Music" into the search bar
    And the user clicks the search icon
    Then the search results page related to "Music" should be loaded

  @TC05
  Scenario: Clear input via the 'X' button
    When the user enters "Hello" into the search bar
    And the user clicks the clear 'X' icon
    Then the search bar should be completely empty

  # The two negative cases below were migrated from the Week 4 pytest version (test_youtube_search.py)
  @negative @TC07
  Scenario: Empty search submission does nothing
    When the user leaves the search bar empty
    And the user clicks the search icon
    Then the user should stay on the current page

  @negative @TC11
  Scenario: Special-character search is handled gracefully
    When the user enters "!@#$%^&*()_+" into the search bar
    And the user presses the Enter key
    Then a search results page should be loaded
