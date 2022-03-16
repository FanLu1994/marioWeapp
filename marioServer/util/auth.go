package util

import (
	"fmt"
	"github.com/astaxie/beego/context"
	"strings"
)

func AuthFilter(ctx *context.Context){
	if strings.HasPrefix(ctx.Request.RequestURI,"/user"){
		return
	}

	token := ctx.Request.Header.Get("Authorization")
	fmt.Println(token)
	if token=="" {
		ctx.Redirect(302,"/user/unauth")
	}
	claims,err := ParseToken(token)
	if err!=nil{
		// TDO: 不同错误处理
		ctx.Redirect(302,"/user/unauth")
	}else{
		fmt.Println("claims",claims.UID)
		ctx.Input.SetData("userID", claims.UID)
	}
}