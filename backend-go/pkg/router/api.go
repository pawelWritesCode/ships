package router

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/controller/user"
	"github.com/pawelWritesCode/ships/backend-go/pkg/middleware"
	userModel "github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"go.mongodb.org/mongo-driver/mongo"
)

//RouteRestAPI routes all routes related with rest api
func RouteRestAPI(r *gin.Engine, db *mongo.Database, timeout int) {
	userRepo := userModel.NewUserRepo(db.Collection("user"), timeout)

	authorized := r.Group("/")
	authorized.Use(middleware.Auth())

	authorized.GET("/api/user/:user", user.GetOne(userRepo))
}
