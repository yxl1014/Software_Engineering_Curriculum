package web

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func LoginController() {
	// 创建一个默认的路由引擎
	r := gin.Default()

	r.LoadHTMLGlob("./templates/*.html")
	// 配置路由
	r.StaticFS("/image", http.Dir("./image"))
	r.StaticFS("/img", http.Dir("./img"))
	r.StaticFS("/css", http.Dir("./css"))
	r.StaticFS("/script", http.Dir("./script"))
	r.StaticFS("/templates", http.Dir("./templates"))

	adminGroup := r.Group("/admin")
	{
		adminGroup.POST("/login", adminLogin)
		adminGroup.POST("/addAdmin", adminAddAdmin)
		adminGroup.POST("/addUser", adminAddUser)
		adminGroup.POST("/deleteUser", adminDeleteUser)
		adminGroup.POST("/updateUserPwd", adminUpdateUserPwd)
		adminGroup.POST("/updateStatus", adminUpdateStatus)
		adminGroup.POST("/getOrderOk", adminGetOrderOk)
		adminGroup.POST("/selectAllOpertor", adminSelectAllOpertor)
		adminGroup.POST("/selectAllOrder", selectAllOrder)
	}

	userGroup := r.Group("/user")
	{
		userGroup.POST("/getAllMeal", getAllMeal)
		userGroup.POST("/order", order)
		userGroup.POST("/delOrder", delOrder)
		userGroup.POST("/selectOrder", selectOrder)
		userGroup.POST("/speakOrder", speakOrder)
	}

	operGroup := r.Group("/opertor")
	{
		operGroup.POST("/login", operLogin)
		operGroup.POST("/giveOrder", giveOrder)
		operGroup.POST("/updateOrder", updateOrder)
		operGroup.POST("/selectOrderByTel", selectOrderByTel)
		operGroup.POST("/selectOrderById", selectOrderById)
		operGroup.POST("/selectNoSpeakOrder", selectNoSpeakOrder)
		operGroup.POST("/selectAllOrder", selectAllOrder)
		operGroup.POST("/addMeal", addMeal)
	}

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "login.html", nil)
	})
	r.POST("/test", test__)
	r.POST("/test1", test___)
	// 启动 HTTP 服务，默认在 0.0.0.0:8080 启动服务
	r.Run("0.0.0.0:8080")
}
