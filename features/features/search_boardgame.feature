Feature: Search for board games

  Scenario: Accept - User searches for board games with at least one attribute
    Given the user has entered a search filter with name "catan", price between 10 and 1000, and selected types "Area control"
    When the user searches for board games
    Then the matching board games should be displayed

  Scenario: Accept - User searches for board games with at least one attribute
    Given the user has entered a search filter with name "m", price between 0 and 1000, and selected types ""
    When the user searches for board games
    Then the matching board games should be displayed
  
  Scenario: Reject - User searches for board games but finds none
    Given the user has entered a search filter with name "my liitle pony", price between 10 and 10000, and selected types ""
    When the user searches for board games
    Then no board games should be displayed

