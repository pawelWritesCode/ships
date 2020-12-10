package godog

import (
	"flag"
	"github.com/cucumber/godog"
	"github.com/cucumber/godog/colors"
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

func InitializeTestSuite(ctx *godog.TestSuiteContext) {
	//ctx.BeforeSuite(func() { Godogs = 0 })
}

//func iCreateData(arg1 *gherkin.DocString) error {
//	return godog.ErrPending
//}

func InitializeScenario(ctx *godog.ScenarioContext) {
	err := godotenv.Load()
	checkErr(err)

	af := &ApiFeature{}

	ctx.BeforeScenario(func(*godog.Scenario) {
		af.ResetApiFeature()
		af.setBaseUrl("http://" + os.Getenv("ADDR") + ":" + os.Getenv("PORT"))
	})

	ctx.Step(`^I generate a random string "([^"]*)"$`, af.IGenerateARandomString)
	ctx.Step(`^I generate a random int "([^"]*)"$`, af.IGenerateARandomInt)
	ctx.Step(`^I send a modified "([^"]*)" request to "([^"]*)" with data:$`, af.ISendAModifiedRequestToWithData)
	ctx.Step(`^I send a modified "([^"]*)" request with token "([^"]*)" to "([^"]*)" with data:$`, af.ISendAModifiedRequestWithTokenToWithData)
	ctx.Step(`^I send a modified "([^"]*)" request to "([^"]*)"$`, af.ISendAModifiedRequestTo)
	ctx.Step(`^I send a modified "([^"]*)" request with token "([^"]*)" to "([^"]*)"$`, af.ISendAModifiedRequestWithTokenTo)
	ctx.Step(`^the response status code should be (\d+)$`, af.TheResponseStatusCodeShouldBe)
	ctx.Step(`^the response should be in JSON$`, af.TheResponseShouldBeInJSON)
	ctx.Step(`^the JSON node "([^"]*)" should be integer of value "([^"]*)"$`, af.TheJSONNodeShouldBeIntegerOfValue)
	ctx.Step(`^the JSON node "([^"]*)" should be string of value "([^"]*)"$`, af.TheJSONNodeShouldBeStringOfValue)
	//ctx.Step(`^the JSON should be valid according to schema "([^"]*)"$`, af.TheJSONShouldBeValidAccordingToSchema)
	ctx.Step(`^I save from the last response JSON node "([^"]*)" as "([^"]*)"$`, af.ISaveFromTheLastResponseJSONNodeAs)
	ctx.Step(`^list element with the id "([^"]*)" has field "([^"]*)" with string value "([^"]*)"$`, af.ListElementWithTheIdHasFieldWithStringValue)
	//ctx.Step(`^the JSON should be valid according to this schema:$`, af.TheJSONShouldBeValidAccordingToThisSchema)
	ctx.Step(`^the JSON response should have key "([^"]*)"$`, af.TheJSONResponseShouldHaveKey)
	ctx.Step(`^I create data:$`, af.ICreateData)
}

// checkErr checks error and log if found.
func checkErr(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}
