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
	Comment	string 	`json:"comment"`
	MapId	string 	`json:"map_id"`
}

type MapCommentForm struct {
	MapId	uint 	`json:"map_id"`
	Like	bool	`json:"like"`
}

type MapDTO struct{
	Id 				uint `json:"id"`
	MapId 			string `json:"map_id"`
	Comment 		string `json:"comment"`
	LikesNum		uint `json:"likes_num"`
	DislikesNum		uint `json:"dislikes_num"`
	Like			int32 `json:"like"`
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
		Comment: mapForm.Comment,
	}
	models.GlobalDb.Create(&newMap)

	//// 新建map tag映射
	//var mapTagList []models.MapTag
	//for i := 0; i < len(mapForm.Tags); i++ {
	//	mapTagList = append(mapTagList, models.MapTag{
	//		MapId: newMap.ID,
	//		TagId: mapForm.Tags[i],
	//	})
	//}
	//models.GlobalDb.Create(&mapTagList)

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
func (c *MapController) AddMapComment(){
	var mapCommentForm = new(MapCommentForm)
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&mapCommentForm)
	if err!=nil{
		fmt.Println(err)
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
	commentRecord := models.MapComment{}
	result = models.GlobalDb.
		Where("user_id = ? and map_id = ?",userId,mapCommentForm.MapId).
		Find(&commentRecord)
	if result.RowsAffected>0{
		if mapCommentForm.Like {
			gameMap.LikesNum--
			commentRecord.Like = 1
		}else{
			gameMap.DislikesNum--
			commentRecord.Like = 2
		}
		tx := models.GlobalDb.Begin()
		tx.Save(commentRecord)
		tx.Save(gameMap)
		tx.Commit()
		response := SuccessWithMessage("更新评价成功！")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}
	// 新建操作记录
	commentRecord = models.MapComment{
		UserId: userId,
		MapId: mapCommentForm.MapId,
	}
	if mapCommentForm.Like {
		gameMap.LikesNum++
		commentRecord.Like = 1
	}else{
		gameMap.DislikesNum++
		commentRecord.Like = 2
	}
	tx := models.GlobalDb.Begin()
	tx.Create(&commentRecord)
	tx.Save(gameMap)
	tx.Commit()

	var response = Success()
	c.Data["json"] = response
	c.ServeJSON()
}

func (c *MapController) CancleMapComment(){
	var mapCommentForm = new(MapCommentForm)
	data := c.Ctx.Input.RequestBody
	err := json.Unmarshal(data,&mapCommentForm)
	if err!=nil{
		fmt.Println(err)
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
	commentRecord := models.MapComment{}
	result = models.GlobalDb.
		Where("user_id = ? and map_id = ?",userId,mapCommentForm.MapId).
		Find(&commentRecord)
	if result.RowsAffected>0{
		var response = FailWithMessage("评价并不存在")
		c.Data["json"] = response
		c.ServeJSON()
		return
	}
	if mapCommentForm.Like {
		gameMap.LikesNum--
	}else{
		gameMap.DislikesNum--
	}
	tx := models.GlobalDb.Begin()
	tx.Delete(commentRecord)
	tx.Save(gameMap)
	tx.Commit()
	var response = SuccessWithMessage("取消评价成功！")
	c.Data["json"] = response
	c.ServeJSON()
}


// 获取map排行榜  暂时只支持最新上传、点赞排行、点踩排行
func (c *MapController) GetRank(){
	userId  := c.Ctx.Input.GetData("userID").(uint)
	rankType, _ := c.GetInt("type")
	fmt.Println(rankType)

	var result []MapDTO
	if rankType==0{ // 最新上传排行
		//models.GlobalDb.Order("created_at desc").Find(&mapList)
		models.GlobalDb.Model(&models.Map{}).
			Select("maps.id,maps.comment,maps.map_id,maps.likes_num,maps.dislikes_num,map_comments.like").
			Joins("left join map_comments on map_comments.map_id=maps.id and map_comments.user_id=?",userId).
			Order("maps.created_at desc").
			Limit(50).
			Scan(&result)
	}else if rankType==1{  // 点赞排行
		//models.GlobalDb.Order("likes_num desc").Find(&mapList).Limit(50)
		models.GlobalDb.Model(&models.Map{}).
			Select("maps.id,maps.comment,maps.map_id,maps.likes_num,maps.dislikes_num,map_comments.like,map_comments.user_id").
			Joins("left join map_comments on map_comments.map_id=maps.id and map_comments.user_id=?",userId).
			Order("maps.likes_num desc").
			Limit(50).
			Scan(&result)
		//models.GlobalDb.Order("dislikes_num desc").Find(&mapList).Limit(50)
	}else{
		models.GlobalDb.Model(&models.Map{}).
			Select("maps.id,maps.comment,maps.map_id,maps.likes_num,maps.dislikes_num,map_comments.like,map_comments.user_id").
			Joins("left join map_comments on map_comments.map_id=maps.id and map_comments.user_id=?",userId).
		    Order("maps.dislikes_num desc").
			Limit(50).
			Scan(&result)
	}

	var recordList []models.Record
	models.GlobalDb.Where("user_id = ?",userId).Find(&recordList)

	var response = SuccessWithData(result)
	c.Data["json"] = response
	c.ServeJSON()
}


// 获取用户上传地图列表
func (c *MapController) UploadList(){
	userId  := c.Ctx.Input.GetData("userID").(uint)
	var mapList []models.Map
	models.GlobalDb.Where("user_id = ?",userId).Find(&mapList).Limit(50)

	var response = SuccessWithData(mapList)
	c.Data["json"] = response
	c.ServeJSON()
}

// 获取用户点赞地图列表
func (c *MapController) LikeList(){
	userId  := c.Ctx.Input.GetData("userID").(uint)
	var records []models.Record
	models.GlobalDb.Debug().Where("user_id = ? and operation = ?",userId,models.Operation_Like).Find(&records).Limit(50)

	var mapIdList  []uint
	for i := 0; i < len(records); i++ {
		mapIdList = append(mapIdList, records[i].MapId)
	}

	var mapList []models.Map
	models.GlobalDb.Debug().Where("id in ?",mapIdList).Find(&mapList)

	var response = SuccessWithData(mapList)
	c.Data["json"] = response
	c.ServeJSON()
}