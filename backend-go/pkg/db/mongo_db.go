package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"go.mongodb.org/mongo-driver/mongo/writeconcern"
	"log"
	"time"
)

type DBCredentials struct {
	Type string
	Uri  string
}

func New(dbType, uri string) DBCredentials {
	return DBCredentials{
		Type: dbType,
		Uri:  uri,
	}
}

//GetMongoDB sets up MongoDB and returns pointer to DB instance.
func (dbc DBCredentials) GetMongoDB() *mongo.Database {
	ctx, _ := context.WithTimeout(context.Background(), 60*time.Second)

	client, err := mongo.Connect(ctx, options.Client().
		ApplyURI(dbc.Uri).
		SetRetryWrites(false).
		SetWriteConcern(writeconcern.New(writeconcern.WMajority())))
	//SetReadConcern(readconcern.Linearizable()))

	checkErr(err)

	ctx, _ = context.WithTimeout(context.Background(), 60*time.Second)
	err = client.Ping(ctx, readpref.Primary()) //proof of successful connection.

	checkErr(err)

	return client.Database("ships")
}

// checkErr checks error, if found it log & exit.
func checkErr(err error) {
	if err != nil {
		log.Fatal(err.Error())
	}
}
