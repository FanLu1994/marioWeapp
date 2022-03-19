package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	_ "marioServer/routers"
	"net/http"
)

var success = []byte("SUPPORT OPTIONS")
var corsFunc = func(ctx *context.Context) {
	origin := ctx.Input.Header("Origin")
	ctx.Output.Header("Access-Control-Allow-Methods", "OPTIONS,DELETE,POST,GET,PUT,PATCH")
	ctx.Output.Header("Access-Control-Max-Age", "3600")
	ctx.Output.Header("Access-Control-Allow-Headers", "X-Custom-Header,accept,Content-Type,Access-Token,authorization")
	ctx.Output.Header("Access-Control-Allow-Credentials", "true")
	ctx.Output.Header("Access-Control-Allow-Origin", origin)
	if ctx.Input.Method() == http.MethodOptions {
		// options请求，返回200
		ctx.Output.SetStatus(http.StatusOK)
		_ = ctx.Output.Body(success)
	}
}

func main() {
	//beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
	//	AllowOrigins:     []string{"*"},
	//	AllowMethods:     []string{"*"},
	//	AllowHeaders:     []string{"*"},
	//	AllowCredentials: true,
	//}))
	beego.InsertFilter("/*", beego.BeforeRouter, corsFunc)
	beego.Run()
}

