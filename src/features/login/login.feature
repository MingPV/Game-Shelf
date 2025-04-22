@login
Feature: Login Feature
  As a registered user
  I want to be able to login
  So I can access the platform

  Scenario: Login with existing user and correct password
    Given I visit the login page
    When I input login email "player888@gmail.com" and password "12345678"
    And I click on the login button
    Then I should navigate to "/home"

  Scenario: Login with a non-existent user
    Given I visit the login page
    When I input login email "player123@gmail.com" and password "12345678"
    And I click on the login button
    Then I should see an error message containing "Incorrect password or email" on the login form

  Scenario: Login with empty email
    Given I visit the login page
    When I input login email "" and password "12345678"
    Then the login form should be invalid

  Scenario: Login with incorrect password
    Given I visit the login page
    When I input login email "player888@gmail.com" and password "wrong1234"
    And I click on the login button
    Then I should see an error message containing "Incorrect password or email" on the login form

  Scenario: Login with empty password
    Given I visit the login page
    When I input login email "player888@gmail.com" and password ""
    Then the login form should be invalid
