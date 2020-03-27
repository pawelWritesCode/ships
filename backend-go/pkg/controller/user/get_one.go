package user

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"net/http"
)

func GetOne(r user.Getter) gin.HandlerFunc {
	return func(context *gin.Context) {
		id, err := primitive.ObjectIDFromHex(context.Param("user"))

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		fetchedUser, err := r.GetOne(id)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		context.JSON(http.StatusOK, fetchedUser)
		return
	}
}
