package user

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"net/http"
)

//Create handles POST request - it inserts to DB one user.
//Status Codes:
//
//	201: Successful insertion,
//	400: Missing/invalid request body,
//	500: Server error.
func Create(r user.Creator) gin.HandlerFunc {
	return func(context *gin.Context) {
		var requestBody user.User

		if err := context.ShouldBindJSON(&requestBody); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		newUser, err := r.Create(requestBody)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		context.JSON(http.StatusCreated, newUser)
		return
	}
}
