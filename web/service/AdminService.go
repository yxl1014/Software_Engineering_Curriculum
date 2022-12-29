package service

import (
	"Software_Engineering_Curriculum/mysql"
	"Software_Engineering_Curriculum/mysql/demo"
	_ "Software_Engineering_Curriculum/mysql/demo"
	"database/sql"
	"math/rand"
	"strings"
)

var db *sql.DB = demo.ConnectMysql()

var CHARS = []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	"1", "2", "3", "4", "5", "6", "7", "8", "9", "0"}

func ALogin(accout string, password string) (int, bool, string) {
	//accout := json["accout"]
	//password := json["password"]
	if /*accout == nil || password == nil || */ accout == "" || password == "" {
		return -1, false, "输入为空，请重新输入"
	}
	ok, aid := mysql.QueryAdmin(db, "select * from admin where accout = ? and password = ?", accout, password)

	if ok {
		return aid, true, "登录成功"
	} else {
		return aid, false, "账号或密码错误，登录失败"
	}
}

func AAddAdmin(accout string, password string) (bool, string) {
	/*	accout := json["accout"]
		password := json["password"]*/
	if /*accout == nil || password == nil || */ accout == "" || password == "" {
		return false, "输入为空，请重新输入"
	}
	_, aid := mysql.QueryAdmin(db, "select * from admin where accout = ?", accout)
	if aid != -1 {
		return false, "添加失败，该帐号已存在"
	}

	ok := mysql.InsertAndDelete(db, "insert into admin(accout,password) values (?,?)", accout, password)

	if ok {
		return true, "添加成功"
	} else {
		return false, "添加失败"
	}
}

func AAddUser(accout string, password string) (bool, string) {
	if accout == "" || password == "" {
		return false, "输入为空，请重新输入"
	}

	_, oid, _ := mysql.QueryOpertor(db, "select * from opertor where accout = ?", accout)
	if oid != -1 {
		return false, "添加失败，该帐号已存在"
	}

	ok := mysql.InsertAndDelete(db, "insert into opertor(accout,password) values (?,?)", accout, password)

	if ok {
		return true, "添加成功"
	} else {
		return false, "添加失败"
	}
}

func ADeleteUser(accout string) (bool, string) {
	if accout == "" {
		return false, "输入为空，请重新输入"
	}

	_, oid, _ := mysql.QueryOpertor(db, "select * from opertor where accout = ?", accout)
	if oid == -1 {
		return false, "该用户不存在"
	}

	ok := mysql.InsertAndDelete(db, "delete from opertor where accout = ?", accout)

	if ok {
		return true, "删除成功"
	} else {
		return false, "删除失败"
	}
}

func AUpdateUserPwd(accout string) (bool, string, string) {
	if accout == "" {
		return false, "输入为空，请重新输入", ""
	}

	_, oid, _ := mysql.QueryOpertor(db, "select * from opertor where accout = ?", accout)
	if oid == -1 {
		return false, "该用户不存在", ""
	}

	str := strings.Builder{}
	length := 52
	for i := 0; i < 8; i++ {
		str.WriteString(CHARS[rand.Intn(length)])
	}

	ok := mysql.InsertAndDelete(db, "update opertor set password = ? where accout = ?", str.String(), accout)

	if ok {
		return true, "修改成功", str.String()
	} else {
		return false, "修改失败", ""
	}
}

func AUpdateStatus(accout string, status any) (bool, string) {
	if accout == "" {
		return false, "输入为空，请重新输入"
	}

	_, oid, _ := mysql.QueryOpertor(db, "select * from opertor where accout = ?", accout)
	if oid == -1 {
		return false, "该用户不存在"
	}

	ok := mysql.InsertAndDelete(db, "update opertor set weight = ? where accout = ?", status, accout)

	if ok {
		return true, "修改成功"
	} else {
		return false, "修改失败"
	}
}

func ASelectAllOpertor() []*mysql.Opertor {
	return mysql.QueryAllOpertor(db)
}
