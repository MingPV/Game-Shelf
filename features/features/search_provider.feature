Feature: Search for providers

  Scenario: Accept - User searches for providers with at least one attribute
    Given the user has entered a search filter with name "test"
    When the user searches for providers
    Then the matching providers should be displayed

  Scenario: Reject - User searches for providers but finds none
    Given the user has entered a search filter with name "momojojo"
    When the user searches for providers
    Then no providers should be displayed


