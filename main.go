package main

import "Software_Engineering_Curriculum/mysql/demo"
import "Software_Engineering_Curriculum/web"

func main() {
	demo.ConnectMysql()
	web.LoginController()
}
