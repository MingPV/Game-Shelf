Feature: Testing Supabase API for fetching users

  Scenario: Accept - Fetch users from Supabase successfully
    Given I have a Supabase client
    When I fetch users from the database
    Then I should receive a list of users
