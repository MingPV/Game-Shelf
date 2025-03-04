Feature: Notifications API

  Scenario: Accept - Successfully fetch notifications
    Given I have a Supabase client for notification
    When I fetch notifications from the database
    Then I should receive a list of notifications
    And each notification should have the correct structure

  Scenario: Reject - Fail to fetch notifications due to nonexistent table
    Given I have a Supabase client for notification
    When I try to fetch notifications from a nonexistent table
    Then I should receive an error from fetching notifications table
