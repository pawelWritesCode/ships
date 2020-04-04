@user
Feature: Get user record
  As an application user
  I want to get user record

  Scenario: Get user record

    Given I create data:
    """
    {
        "users": [
            {
                "alias": "user1",
                "username": "random"
            }
        ]
    }
    """

    #--------------------------------------------------------------------------------
    # GET ONE RECORD
    When I send a modified "GET" request with token "[user1.token]" to "/api/user"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node "username" should be string of value "[user1.username]"
#    And the JSON should be valid according to schema "response/user"
