package user

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Creator interface {
	Create(u User) (User, error)
}

type Getter interface {
	GetOne(id primitive.ObjectID) (User, error)
}

//UserRepo holds collection with users.
type UserRepo struct {
	Collection *mongo.Collection
	Timeout    int
}

func NewUserRepo(collection *mongo.Collection, timeout int) *UserRepo {
	return &UserRepo{
		Collection: collection,
		Timeout:    timeout,
	}
}
