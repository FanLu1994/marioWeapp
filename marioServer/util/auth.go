package util

import (
	"github.com/astaxie/beego/context"
	"strings"
)



func AuthFilter(ctx *context.Context){
	if strings.HasPrefix(ctx.Request.RequestURI,"/user"){
		return
	}

	token := ctx.Request.Header.Get("Authorization")
	if token=="" {
		ctx.Redirect(302,"/user/unauth")
	}
	claims,err := ParseToken(token)
	if err!=nil{
		// TDO: 不同错误处理
		ctx.Redirect(302,"/user/unauth")
	}else{
		ctx.Input.SetData("userID", claims.UID)
	}
}