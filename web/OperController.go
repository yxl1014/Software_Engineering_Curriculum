package web

import (
	"Software_Engineering_Curriculum/web/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

func operLogin(c *gin.Context) {
	accout := c.PostForm("accout")
	password := c.PostForm("password")
	aid, status, msg := service.OLogin(accout, password)
	c.JSON(http.StatusOK, gin.H{
		"oid":    aid,
		"status": status,
		"msg":    msg,
	})
}

func giveOrder(c *gin.Context) {
	deltel := c.PostForm("tel")
	oid, _ := strconv.Atoi(c.PostForm("oid"))
	o, status, msg := service.OGiveOrder(deltel, oid)
	c.JSON(http.StatusOK, gin.H{
		"order":  o,
		"status": status,
		"msg":    msg,
	})
}

func updateOrder(c *gin.Context) {
	status := c.PostForm("status")
	oid, _ := strconv.Atoi(c.PostForm("oid"))
	statuss, msg := service.OUpdateOrder(status, oid)
	c.JSON(http.StatusOK, gin.H{
		"status": statuss,
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
	var1 := c.PostForm("type")
	var2 := c.PostForm("name")
	var3 := c.PostForm("sum")
	var4 := c.PostForm("intro")
	var5 := c.PostForm("teste")
	var6 := c.PostForm("img")
	status, msg := service.OAddMeal(var1, var2, var3, var4, var5, var6)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}
