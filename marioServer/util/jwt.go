package util

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)


type Claims struct {
	UID       uint
	Username string
	jwt.StandardClaims
}

var(
	key = "wuyu"
)

// 生成token
func GenerateToken(userId uint,username string)(string,error){
	nowTime := time.Now()
	expireTime := nowTime.Add(24*60*60 * time.Second).Unix()
	issuer := "xiamu"
	claims := Claims{
		UID: userId,
		Username: username,
		StandardClaims:jwt.StandardClaims{
			ExpiresAt: expireTime,
			Issuer: issuer,
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(key))
	return token, err
}


// 解析token
func ParseToken(token string)(*Claims,error){
	tokenClaims,err := jwt.ParseWithClaims(token,&Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key),nil
	})

	if err!=nil{
		return nil,err
	}

	if tokenClaims!=nil{
		if claims,ok:= tokenClaims.Claims.(*Claims);ok&&tokenClaims.Valid{
			return claims,nil
		}
	}
	return nil,err
}