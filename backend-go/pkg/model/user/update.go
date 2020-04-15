package user

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func (r *UserRepo) Update(u User) (User, error) {
	timeout := time.Duration(r.Timeout) * time.Second
	ctx, _ := context.WithTimeout(context.Background(), timeout)
	filter := bson.M{"_id": u.ID}
	_, err := r.Collection.ReplaceOne(ctx, filter, u)

	return u, err
}
