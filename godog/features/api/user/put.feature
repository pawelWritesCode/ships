@user
Feature: Update user record
  As an application user
  I want to Update user record

  Scenario: Update user record

    Given I create data:
    """
    {
        "users": [
            {
                "alias": "user1",
                "username": "random",
                "password": "123abc"
            }
        ]
    }
    """

    #--------------------------------------------------------------------------------
    # UPDATE
    Given I generate a random string "username"
    Given I generate a random string "password"
    When I send a modified "PUT" request with token "[user1.token]" to "/api/user" with data:
    """
    {
        "username": "[username]",
        "password": "[password]"
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
#    And the JSON should be valid according to schema "response/user"
    And the JSON node "password" should be string of value "[password]"
    And the JSON node "username" should be string of value "[username]"


    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request with token "[user1.token]" to "/api/user"
    Then the response status code should be 200
    And the response should be in JSON
#    And the JSON should be valid according to schema "response/user"
    And the JSON node "password" should be string of value "[password]"
    And the JSON node "username" should be string of value "[username]"