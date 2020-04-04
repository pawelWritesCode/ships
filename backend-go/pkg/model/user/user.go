package user

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserInterface interface {
	GetId() primitive.ObjectID
	GetUsername() string
	GetPassword() string
}

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty" uri:"user"`
	Username string             `json:"username"`
	Password string             `json:"password"`
}

func (u User) GetId() primitive.ObjectID {
	return u.ID
}

func (u User) GetUsername() string {
	return u.Username
}

func (u User) GetPassword() string {
	return u.Password
}
