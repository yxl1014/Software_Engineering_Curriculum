package mysql

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type Meal struct {
	Mid   int
	Type  string
	Name  string
	Sum   float64
	Intro string
	Teste string
	Img   string
}

type Opertor struct {
	Oid      int
	Accout   string
	Password string
	Weight   bool
}

type OrdFrom struct {
	Var1  int
	Var2  string
	Var3  string
	Var4  int
	Var5  string
	Var6  int
	Var7  int
	Var8  string
	Var9  string
	Var10 float64
}

func InsertAndDelete(db *sql.DB, sql string, args ...any) bool {
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
	res, err := stmt.Exec(args...)
	id, err := res.LastInsertId()
	if err != nil {
		panic(err)
		return false
	}

	fmt.Println(id)
	return true
}

// Query 查询一条记录
func Query(db *sql.DB, sql string, args ...any) (bool, int) {
	// 执行
	row := db.QueryRow(sql, args...)
	// 声明变量接受扫描出来的数据
	var aid int
	var accout string
	var password string
	var weight bool
	err := row.Scan(&aid, &accout, &password, &weight)
	if err != nil {
		fmt.Println("查询失败:", err)
		return false, -1
	}
	return true, aid
}

func QueryAdmin(db *sql.DB, sql string, args ...any) (bool, int) {
	// 执行
	row := db.QueryRow(sql, args...)
	// 声明变量接受扫描出来的数据
	var aid int
	var accout string
	var password string
	err := row.Scan(&aid, &accout, &password)
	if err != nil {
		fmt.Println("查询失败:", err)
		return false, -1
	}
	return true, aid
}

// Query 查询一条记录
func QueryOrdFrom(db *sql.DB, sql string, args ...any) (bool, *OrdFrom) {
	// 执行
	row := db.QueryRow(sql, args...)
	// 声明变量接受扫描出来的数据
	var var1 int
	var var2 string
	var var3 string
	var var4 int
	var var5 string
	var var6 int
	var var7 int
	var var8 string
	var var9 string
	var var10 float64
	err := row.Scan(&var1, &var2, &var3, &var4, &var5, &var6, &var7, &var8, &var9, &var10)
	if err != nil {
		fmt.Println("查询失败:", err)
		return false, nil
	}

	o := &OrdFrom{
		Var1:  var1,
		Var2:  var2,
		Var3:  var3,
		Var4:  var4,
		Var5:  var5,
		Var6:  var6,
		Var7:  var7,
		Var8:  var8,
		Var9:  var9,
		Var10: var10,
	}
	return true, o
}

// Query 查询一条记录
func QueryOpertor(db *sql.DB, sql string, args ...any) (bool, int, bool) {
	// 执行
	row := db.QueryRow(sql, args...)
	// 声明变量接受扫描出来的数据
	var oid int
	var accout string
	var password string
	var weight bool
	err := row.Scan(&oid, &accout, &password, &weight)
	if err != nil {
		fmt.Println("查询失败:", err)
		return false, -1, weight
	}
	return true, oid, weight
}

func QueryAllOpertor(db *sql.DB) []*Opertor {
	// 执行
	rows, _ := db.Query("select * from opertor")
	// 创建User 切片
	var users []*Opertor
	for rows.Next() {
		// 声明变量接受扫描出来的数据
		var oid int
		var accout string
		var password string
		var weight bool
		err := rows.Scan(&oid, &accout, &password, &weight)

		if err != nil {
			fmt.Println("查询失败:", err)
			return nil
		}
		m := &Opertor{
			Oid:      oid,
			Accout:   accout,
			Password: password,
			Weight:   weight,
		}

		users = append(users, m)
	}

	return users
}

// QueryAll 查询全部记录
func QueryAllMeals(db *sql.DB) ([]*Meal, error) {

	//maps := make(map[string]interface{})
	sql := "select * from meal"
	rows, err := db.Query(sql)
	if err != nil {
		fmt.Println("执行sql语句失败: ", err)
		return nil, err
	}

	// 创建User 切片
	var users []*Meal

	for rows.Next() {
		var mid int
		var Type string
		var name string
		var sum float64
		var intro string
		var teste string
		var img string
		err = rows.Scan(&mid, &Type, &name, &sum, &intro, &teste, &img)
		if err != nil {
			return nil, err
		}

		m := &Meal{
			Mid:   mid,
			Type:  Type,
			Name:  name,
			Sum:   sum,
			Intro: intro,
			Teste: teste,
			Img:   img,
		}

		users = append(users, m)
	}
	return users, nil
}

// QueryAll 查询全部记录
func QueryOneMeal(db *sql.DB, id int) *Meal {
	sql := "select * from meal where mid = ?"
	rows, err := db.Query(sql, id)
	if err != nil {
		fmt.Println("执行sql语句失败: ", err)
		return nil
	}

	var mid int
	var Type string
	var name string
	var sum float64
	var intro string
	var teste string
	var img string
	err = rows.Scan(&mid, &Type, &name, &sum, &intro, &teste, &img)
	if err != nil {
		return nil
	}

	m := &Meal{
		Mid:   mid,
		Type:  Type,
		Name:  name,
		Sum:   sum,
		Intro: intro,
		Teste: teste,
		Img:   img,
	}

	return m
}

// QueryAll 查询全部记录
func QueryAllMeal(db *sql.DB) []*Meal {
	sql := "select * from meal"
	rows, err := db.Query(sql)
	if err != nil {
		fmt.Println("执行sql语句失败: ", err)
		return nil
	}
	// 创建User 切片
	var meals []*Meal
	for rows.Next() {
		var mid int
		var Type string
		var name string
		var sum float64
		var intro string
		var teste string
		var img string
		err = rows.Scan(&mid, &Type, &name, &sum, &intro, &teste, &img)
		if err != nil {
			return nil
		}

		m := &Meal{
			Mid:   mid,
			Type:  Type,
			Name:  name,
			Sum:   sum,
			Intro: intro,
			Teste: teste,
			Img:   img,
		}
		meals = append(meals, m)
	}

	return meals
}

// QueryAll 查询全部记录
func QueryOneOpertor(db *sql.DB, sql string, args ...any) *Opertor {
	rows := db.QueryRow(sql, args...)

	var Oid int
	var Accout string
	var Password string
	var Weight bool
	err := rows.Scan(&Oid, &Accout, &Password, &Weight)
	if err != nil {
		return nil
	}

	m := &Opertor{
		Oid:      Oid,
		Accout:   Accout,
		Password: Password,
		Weight:   Weight,
	}

	return m
}
