package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/pawelWritesCode/ships/backend-go/pkg/db"
	"github.com/pawelWritesCode/ships/backend-go/pkg/router"
	"log"
	"os"
	"strconv"
)

var dbCredentials db.DBCredentials

func init() {
	checkErr(godotenv.Load())
	dbCredentials = db.New(os.Getenv("DB_TYPE"), os.Getenv("DB_CONNECTION_STRING"))
}

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	timeout, err := strconv.Atoi(os.Getenv("TIMEOUT"))
	checkErr(err)
	database := dbCredentials.GetMongoDB()

	router.RouteDebug(r)
	router.RouteAuthentication(r, database, timeout)
	router.RouteRestAPI(r, database, timeout)

	r.Run("localhost:5000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

// checkErr checks error, if found it log & exit.
func checkErr(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}
