@demo_failure
Feature: Simulated regression (pipeline gate demo)
  Excluded by default via default_tags in behave.ini, so it never runs normally.
  It only runs when the GitHub Actions workflow is triggered manually with "inject_failure" checked,
  to demonstrate: one failing scenario -> behave exit code 1 -> the CI build turns red.

  Scenario: Results page should mention a keyword we never searched for
    Given the user is on the YouTube home page
    When the user enters "Python tutorial" into the search bar
    And the user presses the Enter key
    Then the search results page related to "Javascript" should be loaded
