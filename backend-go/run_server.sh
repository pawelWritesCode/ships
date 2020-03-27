#This script runs auto refreshing server.
#Assuming you have a working Go environment
./reflex -r '\.go$' -s -- sh -c 'go run ./main.go'
