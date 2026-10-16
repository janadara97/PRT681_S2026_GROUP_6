Feature: YouTube Search Functionality
  As a YouTube user,
  I want to use the search bar,
  So that I can find videos I am interested in.

  Scenario: Search with a valid keyword
    Given the user is on the YouTube home page
    When the user enters "Python tutorial" into the search bar
    And the user presses the Enter key
    Then the search results page related to "Python tutorial" should be loaded

  Scenario: Search via the search icon
    Given the user is on the YouTube home page
    When the user enters "Music" into the search bar
    And the user clicks the search icon
    Then the search results page related to "Music" should be loaded

  Scenario: Clear input via the 'X' button
    Given the user is on the YouTube home page
    When the user enters "Hello" into the search bar
    And the user clicks the clear 'X' icon
    Then the search bar should be completely empty