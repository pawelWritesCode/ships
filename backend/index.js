const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()

const port = 5000
const keys = require('./config/keys')
const errorHandler = require('./services/errorHandler');

require('./models/User');

const authRoutes = require('./routes/usersRoutes');
const basicAuth = require('./services/basicAuth');

mongoose.connect(keys.mongo_uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Mongoose connected succesfuly to mongo db');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use(basicAuth);
authRoutes(app);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))