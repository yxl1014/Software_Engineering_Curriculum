package demo

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

func ConnectMysql() *sql.DB {
	mysqlUrl := "root:root@tcp(127.0.0.1:3306)/swec"
	db, _ := sql.Open("mysql", mysqlUrl)
	err := db.Ping()
	if err != nil {
		fmt.Println("mysql连接失败，错误日志为：", err.Error())
		return nil
	} else {
		fmt.Println("mysql连接成功")
	}
	return db
}
