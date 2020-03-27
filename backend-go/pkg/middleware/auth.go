package middleware

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/authentication"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"net/http"
	"strings"
)

//Auth middleware checks if user is verified and sets loggerUser key for other middleware / handlers
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		bearer := c.GetHeader("Authorization")
		authHeader := strings.Split(bearer, " ")

		if len(authHeader) != 2 || authHeader[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid bearer: " + bearer})
			return
		}

		username, id, err := authentication.VerifyJWT(authHeader[1])
		if err != nil {
			if errors.Is(err, jwt.ErrSignatureInvalid) || errors.Is(err, authentication.ErrInvalidToken) {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid bearer: " + bearer})
				return
			} else {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "invalid bearer: " + bearer})
				return
			}
		}

		loggedUser := user.User{
			ID:       id,
			Username: username,
		}

		//Set key loggedUser available in every request after this middleware
		c.Set("loggedUser", loggedUser)

		c.Next()
	}
}
