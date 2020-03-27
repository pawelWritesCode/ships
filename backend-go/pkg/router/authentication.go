package router

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/controller/authentication"
	"github.com/pawelWritesCode/ships/backend-go/pkg/controller/user"
	userModel "github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"go.mongodb.org/mongo-driver/mongo"
)

//RouteAuthentication routes all endpoints related to authentication
func RouteAuthentication(r *gin.Engine, db *mongo.Database, timeout int) {
	userRepo := userModel.NewUserRepo(db.Collection("user"), timeout)

	r.POST("/auth/login", authentication.SignIn(userRepo))
	r.POST("/auth/register", user.Create(userRepo))
}
