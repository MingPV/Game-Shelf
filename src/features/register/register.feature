@register
Feature: Register Feature
    As a user
    I want to be able to Register
    So I could access the other features

    Scenario: Register with an existing email
        Given I visit the register page
        When I input email "player888@gmail.com" and password "12345678"
        And I input username "testPlayer"
        And I input role "Player"
        And I click on the register button
        Then I should see an error message containing "User already registered" on the register form

    Scenario: Register with a not existing email
        Given I visit the register page
        When I input email "newplayer01@gmail.com" and password "12345678"
        And I input username "testPlayer"
        And I input role "Player"
        And I click on the register button
        Then I should navigate to "/home"

    Scenario: Register without inputting password
        Given I visit the register page
        When I input email "newplayer01@gmail.com" and password ""
        And I input username "testPlayer"
        And I input role "Player"
        And I click on the register button
        Then I should see an error message containing "Password must be at least 6 characters long" on the register form

    Scenario: Register without selecting a role
        Given I visit the register page
        When I input email "newplayer01@gmail.com" and password "12345678"
        And I input username "testPlayer"
        And I click on the register button
        Then I should see an error message containing "Please select a role" on the register form

    Scenario: Register with an existing email and without inputting password
        Given I visit the register page
        When I input email "player888@gmail.com" and password ""
        And I input username "testPlayer"
        And I input role "Player"
        And I click on the register button
        Then I should see an error message containing "Password must be at least 6 characters long" on the register form