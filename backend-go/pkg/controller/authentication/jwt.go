package authentication

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/authentication"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"time"
)

// Create a struct to read the username and password from the request body
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

func SignIn(r *user.UserRepo) gin.HandlerFunc {
	return func(c *gin.Context) {
		var creds Credentials
		var fetchedUser user.User

		// Get the JSON body and decode into credentials
		if err := c.ShouldBindJSON(&creds); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		duration := time.Duration(r.Timeout) * time.Second
		ctx, _ := context.WithTimeout(context.Background(), duration)
		r.Collection.FindOne(ctx, bson.M{"username": creds.Username, "password": creds.Password}).Decode(&fetchedUser)

		if fetchedUser.Password != creds.Password || fetchedUser.Username != creds.Username {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		tokenString, err := authentication.CreateJWTToken(fetchedUser)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT token failed"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"token": tokenString})
		return
	}
}
