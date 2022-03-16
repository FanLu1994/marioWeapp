package controllers

import (
	"time"
)

type Response struct {
	Code int         `json:"code"`
	Data interface{} `json:"data"`
	Msg  string      `json:"msg"`
	TimeStamp time.Time `json:"time"`
}

const (
	ERROR   = 7
	SUCCESS = 200
)


func Result(code int,data interface{},msg string,) Response{
	response := Response{
		code,
		data,
		msg,
		time.Now(),
	}
	return response
}


// 成功返回没有数据和信息
func Success() Response{
	return Result(SUCCESS,map[string]interface{}{},"成功!")
}

// 成功返回,有信息
func SuccessWithMessage(msg string,)  Response {
	return Result(SUCCESS,map[string]interface{}{},msg)
}

// 成功返回,有数据
func SuccessWithData(data interface{},)  Response {
	return Result(SUCCESS,data,"成功!")
}

//成功返回,有信息有数据
func SuccessWithAll(msg string,data interface{},)  Response {
	return Result(SUCCESS,data,msg)
}



// 失败返回,没有信息
func Fail()  Response {
	return Result(ERROR,map[string]interface{}{},"操作失败!")
}


// 失败返回,有信息
func FailWithMessage(msg string,)  Response {
	return Result(ERROR,map[string]interface{}{},msg)
}


//失败返回,有信息有数据
func FailWithAll(msg string,data interface{},)  Response {
	return Result(ERROR,data,msg)
}

// 失败返回,带有自定义错误码
func FailWithCode(code int,)  Response {
	return Result(code,map[string]interface{}{},"fail")
}

// 失败返回,带有自定义错误码和数据
func FaileWithCodeAndData(code int,data interface{},)  Response {
	return Result(code,data,"fail")
}