package web

import (
	"Software_Engineering_Curriculum/web/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
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
	un := c.PostForm("username")
	data := c.PostForm("data")
	c.JSON(200, gin.H{
		"username": un,
		"data":     data,
	})
}

func test___(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	log.Printf("%v", &json)
	c.JSON(http.StatusOK, gin.H{
		"name":     json["data"],
		"password": json["username"],
	})
}

func adminLogin(c *gin.Context) {
	//json := make(map[string]interface{}) //注意该结构接受的内容
	accout := c.PostForm("accout")
	password := c.PostForm("password")
	println(accout + "_" + password)
	//c.BindJSON(&json)
	aid, status, msg := service.ALogin(accout, password)
	c.JSON(http.StatusOK, gin.H{
		"aid":    aid,
		"status": status,
		"msg":    msg,
	})
}

func adminAddAdmin(c *gin.Context) {
	accout := c.PostForm("accout")
	password := c.PostForm("password")
	println(accout + "_" + password)
	status, msg := service.AAddAdmin(accout, password)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func adminAddUser(c *gin.Context) {
	accout := c.PostForm("accout")
	password := c.PostForm("password")
	status, msg := service.AAddUser(accout, password)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func adminDeleteUser(c *gin.Context) {
	accout := c.PostForm("userAccout")
	status, msg := service.ADeleteUser(accout)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
	})
}

func adminUpdateUserPwd(c *gin.Context) {
	accout := c.PostForm("userAccout")
	status, msg, pwd := service.AUpdateUserPwd(accout)
	c.JSON(http.StatusOK, gin.H{
		"status": status,
		"msg":    msg,
		"pwd":    pwd,
	})
}

func adminUpdateStatus(c *gin.Context) {
	accout := c.PostForm("userAccout")
	status := c.PostForm("status")
	statuss, msg := service.AUpdateStatus(accout, status)
	c.JSON(http.StatusOK, gin.H{
		"status": statuss,
		"msg":    msg,
	})
}

func adminGetOrderOk(c *gin.Context) {
	json := make(map[string]interface{}) //注意该结构接受的内容
	c.BindJSON(&json)
	log.Printf("%v", &json)
	c.JSON(http.StatusOK, gin.H{
		//TODO
	})
}

func adminSelectAllOpertor(c *gin.Context) {
	users := service.ASelectAllOpertor()
	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}
