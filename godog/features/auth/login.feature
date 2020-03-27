@auth
Feature: Login user
  As an application user
  I want to create user record
  And Then I want to log in

  Scenario: Login user
    Given I generate a random string "username"
    Given I generate a random string "password"
    When I send a modified "POST" request to "/auth/register" with data:
    """
    {
        "username": "[username]",
        "password": "[password]"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the JSON node "username" should be string of value "[username]"
    And the JSON response should have key "_id"
#    And the JSON should be valid according to schema "response/user"

    When I send a modified "POST" request to "/auth/login" with data:
    """
    {
        "username": "[username]",
        "password": "[password]"
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON response should have key "token"