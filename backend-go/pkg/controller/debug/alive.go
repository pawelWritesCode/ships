package debug

import "github.com/gin-gonic/gin"

//Alive responds with code 200 and json message.
func Alive(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "ok",
	})
	return
}
