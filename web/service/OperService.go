package service

import "Software_Engineering_Curriculum/mysql"

func OLogin(json map[string]interface{}) (int, bool, string) {
	accout := json["accout"]
	password := json["password"]
	if accout == nil || password == nil || accout == "" || password == "" {
		return -1, false, "输入为空，请重新输入"
	}
	o := mysql.QueryOneOpertor(db, "select * from opertor where accout = ? and password = ?", accout, password)

	if o != nil {
		if o.Weight {
			return o.Oid, true, "登录成功"
		} else {
			return o.Oid, false, "该操作员已被禁用"
		}

	} else {
		return -1, false, "账号或密码错误，登录失败"
	}
}

func OGiveOrder(json map[string]interface{}) (*mysql.OrdFrom, bool, string) {
	deltel := json["deltel"]
	oid := json["oid"]
	if deltel == nil || oid == nil || deltel == "" || oid == "" {
		return nil, false, "输入为空，请重新输入"
	}
	_, o := mysql.QueryOrdFrom(db, "select * from ordfrom where oid = ?", oid)
	if o == nil {
		return nil, false, "该订单不存在"
	}
	if o.Var4 != 0 {
		return nil, false, "该订单当前不处于待分配状态"
	}
	ok := mysql.InsertAndDelete(db, "update ordfrom set del_tel = ? where oid = ?", deltel, oid)
	if ok {
		_, oo := mysql.QueryOrdFrom(db, "select * from ordfrom where oid = ?", oid)
		return oo, true, "分配成功"
	} else {
		return nil, false, "分配失败"
	}
}

func OUpdateOrder(json map[string]interface{}) (bool, string) {
	status := json["status"]
	oid := json["oid"]
	if status == nil || oid == nil || status == "" || oid == "" {
		return false, "输入为空，请重新输入"
	}
	_, o := mysql.QueryOrdFrom(db, "select * from ordfrom where oid = ?", oid)
	if o == nil {
		return false, "该订单不存在"
	}
	if o.Var4 != 1 && o.Var4 != 0 {
		return false, "该订单当前不处于可更改状态"
	}
	ok := mysql.InsertAndDelete(db, "update ordfrom set status = ? where oid = ?", status, oid)
	if ok {
		return true, "修改成功"
	} else {
		return false, "修改失败"
	}
}

func OAddMeal(json map[string]interface{}) (bool, string) {
	var1 := json["type"]
	var2 := json["name"]
	var3 := json["sum"]
	var4 := json["intro"]
	var5 := json["teste"]
	var6 := json["img"]
	if var1 == nil || var2 == nil || var3 == nil || var4 == nil || var5 == nil || var6 == nil ||
		var1 == "" || var2 == "" || var3 == "" || var4 == "" || var5 == "" || var6 == "" {
		return false, "输入为空，请重新输入"
	}
	ok := mysql.InsertAndDelete(db, "insert into meal(type,name,sum,intro,teste,img) values (?,?,?,?,?,?)",
		var1, var2, var3, var4, var5, var6)

	if ok {
		return true, "添加成功"
	} else {
		return false, "添加失败"
	}
}
func SelectAllOrder() []*mysql.Meal {
	return GetAllMeal()
}
