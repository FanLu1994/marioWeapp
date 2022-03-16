package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"marioServer/models"
)

type MapController struct {
	beego.Controller
}

type MapForm struct {
	Tags	[]uint 	`json:"tags"`
	MapId	string 	`json:"map_id"`
}

type MapCommentForm struct {
	MapId	uint 	`json:"map_id"`
	Like	bool	`json:"like"`
}


// 添加地图
func (c *MapController) Add() {
	var mapForm = new(MapForm)
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&mapForm)
	if err!=nil{
		response := FailWithMessage("参数错误")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}

	userId  := c.Ctx.Input.GetData("userID").(uint)

	// 新建地图
	newMap := models.Map{
		MapId: mapForm.MapId,
		UserId: userId,
	}
	models.GlobalDb.Create(&newMap)

	// 新建map tag映射
	var mapTagList []models.MapTag
	for i := 0; i < len(mapForm.Tags); i++ {
		mapTagList = append(mapTagList, models.MapTag{
			MapId: newMap.ID,
			TagId: mapForm.Tags[i],
		})
	}
	models.GlobalDb.Create(&mapTagList)

	// 新建记录
	newRecord := models.Record{
		MapId: newMap.ID,
		UserId: userId,
		Operation: models.Operation_Upload,
	}
	models.GlobalDb.Create(&newRecord)

	var response = Success()
	c.Data["json"] = response
	c.ServeJSON()
}

// 评价map 点赞、点踩
func (c *MapController) Comment() {
	var mapCommentForm = new(MapCommentForm)
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&mapCommentForm)
	if err!=nil{
		response := FailWithMessage("参数错误")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}

	userId  := c.Ctx.Input.GetData("userID").(uint)

	// 更新地图点赞数
	gameMap := models.Map{}
	result := models.GlobalDb.First(&gameMap,mapCommentForm.MapId)
	if result.RowsAffected==0{
		var response = FailWithMessage("找不到指定的地图")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}

	// 检查是否点过赞
	record := models.Record{}
	result = models.GlobalDb.
		Where("user_id = ? and map_id = ? and operation != ?",userId,mapCommentForm.MapId,1).
		Find(&record)
	if result.RowsAffected>0{
		var response = FailWithMessage("您已经评价过该地图！")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}


	// 新建操作记录
	record = models.Record{
		UserId: userId,
		MapId: mapCommentForm.MapId,
	}

	if mapCommentForm.Like{
		gameMap.LikesNum++
		record.Operation = models.Operation_Like
	}else {
		gameMap.LikesNum--
		record.Operation = models.Operation_Dislike
	}

	models.GlobalDb.Create(&record)
	models.GlobalDb.Save(gameMap)

	var response = Success()
	c.Data["json"] = response
	c.ServeJSON()
}

// 获取map排行榜  暂时只支持最新上传、点赞排行、点踩排行
func (c *MapController) GetRank(){
	rankType, _ := c.GetInt("type")
	fmt.Println(rankType)

	var mapList []models.Map
	if rankType==0{ // 最新上传排行
		models.GlobalDb.Find(&mapList)
	}else if rankType==1{  // 点赞排行
		models.GlobalDb.Order("likes_num desc").Find(&mapList)
	}else if rankType == 2{
		models.GlobalDb.Order("dislikes_num desc").Find(&mapList)
	}

	var response = SuccessWithData(mapList)
	c.Data["json"] = response
	c.ServeJSON()
}


// 获取用户上传地图列表
func (c *MapController) UploadList(){
	userId  := c.Ctx.Input.GetData("userID").(uint)
	var mapList []models.Map
	models.GlobalDb.Where("user_id = ?",userId).Find(&mapList)

	var response = SuccessWithData(mapList)
	c.Data["json"] = response
	c.ServeJSON()
}

// 获取用户点赞地图列表
func (c *MapController) LikeList(){
	userId  := c.Ctx.Input.GetData("userID").(uint)
	var records []models.Record
	models.GlobalDb.Where("user_id = ? and operation = ?",userId,2).Find(&records)

	var mapIdList  []uint
	for i := 0; i < len(records); i++ {
		mapIdList = append(mapIdList, records[i].MapId)
	}
	fmt.Println(mapIdList)

	var mapList []models.Map
	models.GlobalDb.Where("map_id in ?",mapIdList).Find(&mapList)

	var response = SuccessWithData(mapList)
	c.Data["json"] = response
	c.ServeJSON()
}