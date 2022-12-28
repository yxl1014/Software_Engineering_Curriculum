package web

import (
	"Software_Engineering_Curriculum/web/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getAllMeal(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"meals": service.GetAllMeal(),
	})
}

func order(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg := service.UOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func delOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg := service.UDelOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func selectOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg, str := service.USelectOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"status":      status,
		"msg":         msg,
		"orderStatus": str,
	})
}

func speakOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg := service.USpeakOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}
