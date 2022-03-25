package models

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// 全局db变量
var GlobalDb *gorm.DB;


func init(){
	dsn := "root:1234@(127.0.0.1:3306)/mario?charset=utf8mb4&parseTime=True&loc=Local"
	//dsn := "xiamu:Wuyu1015.@(127.0.0.1:3306)/mario?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	GlobalDb, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err!=nil {
		fmt.Println(err)
		return
	}

	_ = GlobalDb.AutoMigrate(WeChatUser{},
		Map{},
		Tag{},
		Record{},
		MapComment{},
		MapTag{})
}