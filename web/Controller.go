package web

import (
	"github.com/gin-gonic/gin"
)

func test_(c *gin.Context) {
	un := c.Query("username")
	data := c.Query("data")
	c.JSON(200, gin.H{
		"username": un,
		"data":     data,
	})
}
func test__(c *gin.Context) {
	un := c.Query("username")
	data := c.Query("data")
	c.ProtoBuf(200, gin.H{
		"username": un,
		"data":     data,
	})
}
