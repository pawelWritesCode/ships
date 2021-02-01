FROM golang:latest

WORKDIR /app

ENV DB_CONNECTION_STRING="mongodb+srv://test_user:sali142@cluster0.uilju.mongodb.net/test_db?retryWrites=true&w=majority"
ENV DB_TYPE="mongodb"
ENV TIMEOUT=20

COPY go.mod /app/go.mod
COPY go.sum /app/go.sum

RUN go get -v -t -d ./...

COPY . /app

CMD ["go", "run", "main.go"]