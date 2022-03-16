package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"marioServer/models"
)

type TagController struct {
	beego.Controller
}

type TagForm struct {
	Name string `json:"name"`
}

func (c *TagController) Add()  {
	// 查重
	var tagForm = new(TagForm)
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&tagForm)
	if err!=nil{
		response := FailWithMessage("参数错误")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}


	if tagForm.Name==""{
		response := FailWithMessage("name不能为空")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}

	tag := models.Tag{}
	result := models.GlobalDb.Where("Name=?",tagForm.Name).First(&tag)
	if result.RowsAffected>0 {
		response := FailWithMessage("已存在")
		c.Data["json"] = response
	}else{
		tag = models.Tag{
			Name: tagForm.Name,
		}
		models.GlobalDb.Save(&tag)
		response := Success()
		c.Data["json"] = response
	}
	c.ServeJSON()

}

func (c *TagController) GetList()  {
	tagList := []models.Tag{}
	models.GlobalDb.Find(&tagList)
	response := SuccessWithData(tagList)

	c.Data["json"] = response
	c.ServeJSON()
}
