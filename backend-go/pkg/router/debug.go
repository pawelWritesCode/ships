package router

import (
	"github.com/gin-gonic/gin"
	"github.com/pawelWritesCode/ships/backend-go/pkg/controller/debug"
)

//RouteDebug routes all endpoints related with debugging
func RouteDebug(r *gin.Engine) {
	r.GET("/alive", debug.Alive)
}
