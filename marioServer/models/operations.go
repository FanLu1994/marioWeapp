package models


type OperationType int32

const (
	Operation_Upload	OperationType = 1
	Operation_Like		OperationType =	2
	Operation_Dislike 	OperationType = 3
)