package user

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"net/http"
)

func GetOne(r user.Getter) gin.HandlerFunc {
	return func(context *gin.Context) {
		loggedUserRaw, ok := context.Get("loggedUser")

		if ok == false {
			context.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		loggedUser, ok := loggedUserRaw.(user.User)

		if ok == false {
			context.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		fetchedUser, err := r.GetOne(loggedUser.ID)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		context.JSON(http.StatusOK, fetchedUser)
		return
	}
}
