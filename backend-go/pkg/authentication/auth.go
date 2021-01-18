package authentication

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"github.com/pawelWritesCode/ships/backend-go/pkg/model/user"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"os"
	"time"
)

//ErrInvalidToken occurs when token is invalid
var ErrInvalidToken = errors.New("invalid token")

//Claims will be encoded to JWT
type Claims struct {
	ID       primitive.ObjectID
	Username string
	jwt.StandardClaims
}

// Create the JWT key used to create the signature
var jwtKey []byte

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Println("Missing .env file, loading env variables from OS")
	}

	jwtKey = []byte(os.Getenv("JWT_KEY"))
}

//CreateJWTToken creates JWT token from given user
func CreateJWTToken(u user.UserInterface) (string, error) {
	expirationTime := time.Now().Add(12 * time.Hour)

	// Create the JWT claims, which includes the username and expiry time
	claims := &Claims{
		ID:       u.GetId(),
		Username: u.GetUsername(),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString(jwtKey)
}

//VerifyJWT verifies JWT token. If verification fails it returns non nil error, otherwise it returns username, _id, nil
func VerifyJWT(token string) (string, primitive.ObjectID, error) {
	claims := &Claims{}

	// Parse the JWT string and store the result in `claims`.
	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		return "", primitive.NilObjectID, err
	}

	if !tkn.Valid {
		return "", primitive.NilObjectID, ErrInvalidToken
	}

	return claims.Username, claims.ID, nil
}
