const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

mongoose.model('users', userSchema); //creating collection of users as passed in userSchema. It will not override if it exist.
