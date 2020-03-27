package user

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

//GetOne finds User from db.
func (r *UserRepo) GetOne(id primitive.ObjectID) (User, error) {
	duration := time.Duration(r.Timeout) * time.Second
	ctx, _ := context.WithTimeout(context.Background(), duration)

	var user User
	criteria := bson.D{{"_id", id}}
	err := r.Collection.FindOne(ctx, criteria).Decode(&user)

	return user, err
}
