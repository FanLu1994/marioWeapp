package controllers

import (
	"github.com/astaxie/beego"
	"marioServer/models"
)

type RecordController struct {
	beego.Controller
}


func (c *RecordController) GetRecordList()  {
	userId  := c.Ctx.Input.GetData("userID").(uint)
	recordType,_ := c.GetInt("type",0)

	recordList := []models.Record{}
	if recordType==0 {
		models.GlobalDb.Where("user_id = ? ",userId).Find(&recordList)
	}else{
		models.GlobalDb.Where("user_id = ? and operation = ?",userId,recordType).Find(&recordList)
	}

	response := SuccessWithData(recordList)

	c.Data["json"] = response
	c.ServeJSON()
}