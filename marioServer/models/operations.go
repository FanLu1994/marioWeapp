package models


type operationType int32

const (
	Operation_Upload	operationType = 1
	Operation_Like		operationType =	2
	Operation_Dislike 	operationType = 3
)