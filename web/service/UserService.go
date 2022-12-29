package service

import (
	"Software_Engineering_Curriculum/mysql"
	_ "Software_Engineering_Curriculum/mysql/demo"
	"strings"
	"time"
)

func GetAllMeal() []*mysql.Meal {
	meals, err := mysql.QueryAllMeals(db)
	if err != nil {
		return meals
	}
	return nil
}

func UOrder(tel string, meals string) (bool, string) {
	if tel == "" || meals == "" {
		return false, "输入为空，请重新输入"
	}
	sum := 0.0
	split := strings.Split(meals, "_")
	for s := range split {
		var m *mysql.Meal = mysql.QueryOneMeal(db, s)
		if m == nil {
			return false, "菜品不存在"
		}
		sum += m.Sum
	}
	currentTime := time.Now()

	ok := mysql.InsertAndDelete(db, "insert into ordfrom(car_tel,timestamp,meals,sum) values(?,?,?,?)",
		tel, currentTime.String(), meals, sum)

	if ok {
		return true, "下单成功"
	} else {
		return false, "下单失败"
	}
}

func UDelOrder(tel string, oid any) (bool, string) {
	if tel == "" || oid == nil || oid == "" {
		return false, "输入为空，请重新输入"
	}

	ok, o := mysql.QueryOrdFrom(db, "select * from ordfrom where order_num = ? and car_tel = ?", oid, tel)
	if o == nil {
		return false, "该订单不存在"
	}
	if o.Var4 != 0 {
		return false, "订单已派送，无法取消"
	}
	ok = mysql.InsertAndDelete(db, "update ordfrom set status=-1 where oid= ?", oid)

	if ok {
		return true, "取消成功"
	} else {
		return false, "取消失败"
	}
}

func USelectOrder(tel string, oid any) (bool, string, string) {
	if tel == "" || oid == nil || oid == "" {
		return false, "输入为空，请重新输入", ""
	}

	ok, o := mysql.QueryOrdFrom(db, "select * from ordfrom where order_num = ? and car_tel = ?", oid, tel)
	if o == nil {
		return false, "该订单不存在", ""
	}
	var str string
	switch o.Var4 {
	case -1:
		str = "已取消"
	case 1:
		str = "已下单"
	case 2:
		str = "已派送"
	case 3:
		str = "已完成"
	}
	if ok {
		return true, "查询成功", str
	} else {
		return false, "查询失败", ""
	}
}

func USpeakOrder(tel string, oid any, msg string) (bool, string) {
	if tel == "" || oid == nil || oid == "" {
		return false, "输入为空，请重新输入"
	}

	ok, o := mysql.QueryOrdFrom(db, "select * from ordfrom where order_num = ? and car_tel = ?", oid, tel)
	if o == nil {
		return false, "该订单不存在"
	}

	ok = mysql.InsertAndDelete(db, "update ordfrom set mark=? where oid= ?", msg, oid)

	if ok {
		return true, "评价成功"
	} else {
		return false, "评价失败"
	}
}
