package models

import "gorm.io/gorm"

// v1 使用gorm关联数据
//type WeChatUser struct {
//	gorm.Model
//	UserName		string	`json:"username"`
//	Maps 			[]Map 	`gorm:"foreignKey:UserId;"`
//	Records			[]Record `gorm:"foreignKey:UserId;"`
//}
//
//type Map struct {
//	gorm.Model
//	MapId			string	`json:"mapId"`
//	Tag				[]Tag   `gorm:"many2many:map_tag"`
//	UserId 			uint
//	UploadTimes		uint
//	LikesNum		uint
//	DislikesNum		uint
//}
//
//type Tag struct {
//	gorm.Model
//	Name     		string 	`json:"tagName"`
//}
//
//type Record struct {
//	gorm.Model
//	WeChatUserId	uint
//	UserId 			uint
//	Operation		uint
//}

// v2 不使用关联数据，避免增删改查的麻烦
type WeChatUser struct {
	gorm.Model
	UserName		string	`json:"username"`
	Password		string 	`json:"password"`
}

type Map struct {
	gorm.Model
	MapId			string	`json:"mapId"`
	Comment			string  `json:"comment"`
	UserId 			uint
	LikesNum		uint
	DislikesNum		uint
}

type MapTag struct {
	gorm.Model
	MapId			uint	`json:"mapId"`
	TagId			uint  `json:"tagId"`
}

type Tag struct {
	gorm.Model
	Name     		string 	`json:"tagName"`
}

type Record struct {
	gorm.Model
	UserId 			uint
	Operation		operationType
	MapId			uint
}

