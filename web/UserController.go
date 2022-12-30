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
	tel := c.PostForm("car_tel")
	meals := c.PostForm("meals")
	status, msg := service.UOrder(tel, meals)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func delOrder(c *gin.Context) {
	tel := c.PostForm("tel")
	oid := c.PostForm("oid")
	status, msg := service.UDelOrder(tel, oid)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func selectOrder(c *gin.Context) {
	tel := c.PostForm("tel")
	oid := c.PostForm("oid")
	status, msg, str := service.USelectOrder(tel, oid)
	c.JSON(http.StatusOK, gin.H{
		"status":      status,
		"msg":         msg,
		"orderStatus": str,
	})
}

func speakOrder(c *gin.Context) {
	tel := c.PostForm("tel")
	oid := c.PostForm("oid")
	msg1 := c.PostForm("msg")
	status, msg := service.USpeakOrder(tel, oid, msg1)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}
