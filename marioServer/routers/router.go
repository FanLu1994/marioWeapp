package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"marioServer/controllers"
	"marioServer/util"
	"net/http"
)

var success = []byte("SUPPORT OPTIONS")
var corsFunc = func(ctx *context.Context) {
	//origin := ctx.Input.Header("Origin")
	ctx.Output.Header("Access-Control-Allow-Methods", "OPTIONS,DELETE,POST,GET,PUT,PATCH")
	ctx.Output.Header("Access-Control-Max-Age", "3600")
	ctx.Output.Header("Access-Control-Allow-Headers", "X-Custom-Header,accept,Content-Type,Access-Token,authorization")
	ctx.Output.Header("Access-Control-Allow-Credentials", "true")
	ctx.Output.Header("Access-Control-Allow-Origin", "*")
	if ctx.Input.Method() == http.MethodOptions {
		// options请求，返回200
		ctx.Output.SetStatus(http.StatusOK)
		_ = ctx.Output.Body(success)
	}
}


func init() {
    beego.Router("/", &controllers.MainController{})

	beego.InsertFilter("/*", beego.BeforeRouter, corsFunc)
    beego.InsertFilter("/*",beego.BeforeRouter,util.AuthFilter)

    // 自动路由，可以访问 /map/addmap   方法名是小写,get,post都能访问
	beego.AutoRouter(&controllers.MapController{})
	beego.AutoRouter(&controllers.TagController{})
    beego.AutoRouter(&controllers.UserController{})
    beego.AutoRouter(&controllers.RecordController{})

	// TODO: 使用过滤器实现鉴权
}
