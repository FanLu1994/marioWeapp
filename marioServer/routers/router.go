package routers

import (
	"github.com/astaxie/beego"
	"marioServer/controllers"
	"marioServer/util"
)

func init() {
    beego.Router("/", &controllers.MainController{})

    beego.InsertFilter("/*",beego.BeforeRouter,util.AuthFilter)

    // 自动路由，可以访问 /map/addmap   方法名是小写,get,post都能访问
	beego.AutoRouter(&controllers.MapController{})
	beego.AutoRouter(&controllers.TagController{})
    beego.AutoRouter(&controllers.UserController{})
    beego.AutoRouter(&controllers.RecordController{})

	// TODO: 使用过滤器实现鉴权
}
