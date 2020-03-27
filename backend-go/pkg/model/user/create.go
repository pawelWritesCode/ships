package user

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

//Add inserts given user to database.
func (r *UserRepo) Create(u User) (User, error) {
	duration := time.Duration(r.Timeout) * time.Second
	ctx, _ := context.WithTimeout(context.Background(), duration)
	result, err := r.Collection.InsertOne(ctx, u)

	if err != nil {
		return u, err
	}

	var newUser User
	r.Collection.FindOne(ctx, bson.M{"_id": result.InsertedID}).Decode(&newUser)

	return newUser, err
}
