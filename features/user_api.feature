Feature: User API

  Scenario: Fetch users from Supabase
    Given I have a Supabase client
    When I fetch users from the database
    Then I should receive a list of users
