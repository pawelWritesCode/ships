package main

import (
	"flag"
	"github.com/DATA-DOG/godog"
	"github.com/DATA-DOG/godog/colors"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var opt = godog.Options{
	Output: colors.Colored(os.Stdout),
	Format: "progress", // can define default values
}

func init() {
	godog.BindFlags("godog.", flag.CommandLine, &opt)
}

func FeatureContext(s *godog.Suite) {
	err := godotenv.Load()
	checkErr(err)

	af := &ApiFeature{}

	s.BeforeScenario(func(interface{}) {
		af.ResetApiFeature()
		af.setBaseUrl("http://" + os.Getenv("ADDR") + ":" + os.Getenv("PORT"))
	})

	s.Step(`^I generate a random string "([^"]*)"$`, af.IGenerateARandomString)
	s.Step(`^I generate a random int "([^"]*)"$`, af.IGenerateARandomInt)
	s.Step(`^I send a modified "([^"]*)" request to "([^"]*)" with data:$`, af.ISendAModifiedRequestToWithData)
	s.Step(`^I send a modified "([^"]*)" request with token "([^"]*)" to "([^"]*)" with data:$`, af.ISendAModifiedRequestWithTokenToWithData)
	s.Step(`^I send a modified "([^"]*)" request to "([^"]*)"$`, af.ISendAModifiedRequestTo)
	s.Step(`^I send a modified "([^"]*)" request with token "([^"]*)" to "([^"]*)"$`, af.ISendAModifiedRequestWithTokenTo)
	s.Step(`^the response status code should be (\d+)$`, af.TheResponseStatusCodeShouldBe)
	s.Step(`^the response should be in JSON$`, af.TheResponseShouldBeInJSON)
	s.Step(`^the JSON node "([^"]*)" should be integer of value "([^"]*)"$`, af.TheJSONNodeShouldBeIntegerOfValue)
	s.Step(`^the JSON node "([^"]*)" should be string of value "([^"]*)"$`, af.TheJSONNodeShouldBeStringOfValue)
	s.Step(`^the JSON should be valid according to schema "([^"]*)"$`, af.TheJSONShouldBeValidAccordingToSchema)
	s.Step(`^I save from the last response JSON node "([^"]*)" as "([^"]*)"$`, af.ISaveFromTheLastResponseJSONNodeAs)
	s.Step(`^list element with the id "([^"]*)" has field "([^"]*)" with string value "([^"]*)"$`, af.ListElementWithTheIdHasFieldWithStringValue)
	s.Step(`^the JSON should be valid according to this schema:$`, af.TheJSONShouldBeValidAccordingToThisSchema)
	s.Step(`^the JSON response should have key "([^"]*)"$`, af.TheJSONResponseShouldHaveKey)
	s.Step(`^I create data:$`, af.ICreateData)

}

// checkErr checks error and log if found.
func checkErr(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}
