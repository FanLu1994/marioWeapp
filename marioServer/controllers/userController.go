package controllers

import "C"
import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"marioServer/models"
	"marioServer/util"
)

type UserController struct {
	beego.Controller
}

func (c *UserController) Login(){
	// 获取登录账号密码
	var user models.WeChatUser
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&user)
	fmt.Println(user)
	if err != nil{
		c.Data["json"] = FailWithMessage("参数错误")
	}

	// 验证账号密码
	dbUser := models.WeChatUser{}
	result := models.GlobalDb.Where("user_name = ?",user.UserName).First(&dbUser)
	fmt.Println(dbUser)

	if result.RowsAffected==0{
		c.Data["json"] = FailWithMessage("用户名不存在")
	}else{
		if dbUser.Password!=user.Password{
			c.Data["json"] = FailWithMessage("密码错误")
		}else{
			token, err :=util.GenerateToken(dbUser.ID,dbUser.UserName)
			if err != nil{
				c.Data["json"] = FailWithMessage("token生成错误")
			}else{
				data := map[string]interface{}{"token":token}
				c.Data["json"] = SuccessWithAll("登录成功",data)
			}
		}
	}
	c.ServeJSON()
}

func (c *UserController) Register(){
	// 获取注册账号密码
	var user models.WeChatUser
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&user)
	if err != nil{
		c.Data["json"] = FailWithMessage("参数错误")
	}

	// 检查用户名是否存在
	var dbUser = models.WeChatUser{}
	if models.GlobalDb.Where("user_name = ?",user.UserName).First(&dbUser).RowsAffected>0{
		c.Data["json"] = FailWithMessage("用户名已存在")
		c.ServeJSON()
	}else{
		models.GlobalDb.Save(&user)
		c.Data["json"] = SuccessWithMessage("注册成功")
	}
	c.ServeJSON()
}

func (c *UserController) UnAuth(){
	c.Data["json"] = FaileWithCodeAndData(403,"请登录")
	c.ServeJSON()
}