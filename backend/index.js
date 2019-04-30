const express = require('express')
const mongoose = require('mongoose');
const app = express()

const port = 5000
const keys = require('./config/keys');

mongoose.connect(keys.mongo_uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected succesfuly to mongo db');
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))