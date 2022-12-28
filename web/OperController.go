package web

import (
	"Software_Engineering_Curriculum/web/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func operLogin(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	aid, status, msg := service.OLogin(json)
	c.JSON(http.StatusOK, gin.H{
		"oid":    aid,
		"status": status,
		"msg":    msg,
	})
}

func giveOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	o, status, msg := service.OGiveOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"order":  o,
		"status": status,
		"msg":    msg,
	})
}

func updateOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg := service.OUpdateOrder(json)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func selectOrderByTel(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	log.Printf("%v", &json)
	c.JSON(http.StatusOK, gin.H{
		//TODO
	})
}

func selectOrderById(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	log.Printf("%v", &json)
	c.JSON(http.StatusOK, gin.H{
		//TODO
	})
}

func selectNoSpeakOrder(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	log.Printf("%v", &json)
	c.JSON(http.StatusOK, gin.H{
		//TODO
	})
}

func selectAllOrder(c *gin.Context) {
	result := service.SelectAllOrder()
	c.JSON(http.StatusOK, gin.H{
		"orders": result,
	})
}

func addMeal(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	status, msg := service.OAddMeal(json)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}
