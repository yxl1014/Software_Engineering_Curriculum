package mysql

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

func InsertAndDelete(db *sql.DB, sql string, args ...string) bool {
	dbErr := db.Ping()
	if dbErr != nil {
		println("mysql连接失败，错误日志为：", dbErr.Error())
		return false
	}
	fmt.Println() //检查是否连接成功数据库
	stmt, err := db.Prepare(sql)
	if err != nil {
		fmt.Println(err)
		return false
	}
	res, err := stmt.Exec(args)
	id, err := res.LastInsertId()
	if err != nil {
		panic(err)
		return false
	}

	fmt.Println(id)
	return true
}

// QueryOne 查询一条记录
func QueryOne(db *sql.DB, sql string, args ...string) bool {
	// 执行
	row := db.QueryRow(sql, args)
	// 声明变量接受扫描出来的数据
	var id int
	var username string
	var password string
	var email string
	err := row.Scan(&id, &username, &password, &email)
	if err != nil {
		fmt.Println("查询失败:", err)
		return false
	}
	return true
}

// QueryAll 查询全部记录
/*func (user *User) QueryAll() ([]*User, error) {
	sql := "select * from users"
	rows, err := utils.Db.Query(sql)
	if err != nil {
		fmt.Println("执行sql语句失败: ", err)
		return nil, err
	}

	// 创建User 切片
	var users []*User

	for rows.Next() {
		var id int
		var username string
		var password string
		var email string
		err = rows.Scan(&id, &username, &password, &email)
		if err != nil {
			return nil, err
		}

		u := &User{
			ID:       id,
			Username: username,
			Password: password,
			Email:    email,
		}

		users = append(users, u)
	}
	return users, nil
}*/
