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
	"time"
)

var dbCredentials db.DBCredentials

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Missing .env file, loading env variables from OS")
	}

	dbCredentials = db.New(os.Getenv("DB_TYPE"), os.Getenv("DB_CONNECTION_STRING"))
}

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	timeout, err := strconv.Atoi(os.Getenv("TIMEOUT"))
	checkErr(err)
	database := dbCredentials.GetMongoDB()

	router.RouteDebug(r)
	router.RouteAuthentication(r, database, timeout)
	router.RouteRestAPI(r, database, timeout)

	r.Run(":5000")
}

// checkErr checks error, if found it log & exit.
func checkErr(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}
