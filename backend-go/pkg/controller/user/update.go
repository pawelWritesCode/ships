package user

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"net/http"
)

func Update(r user.Updater) gin.HandlerFunc {
	return func(context *gin.Context) {
		var requestBody user.User

		if err := context.ShouldBindJSON(&requestBody); err != nil {
			context.AbortWithStatusJSON(http.StatusBadRequest, err)
			return
		}

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

		requestBody.ID = loggedUser.ID
		u, err := r.Update(requestBody)

		if err != nil {
			context.AbortWithStatusJSON(http.StatusInternalServerError, err)
			return
		}

		context.JSON(http.StatusOK, u)
		return
	}
}
