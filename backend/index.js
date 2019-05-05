const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()

const port = 5000
const keys = require('./config/keys');

require('./models/User');

const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const basicAuth = require('./middlewares/basicAuth');

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
userRoutes(app);

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))