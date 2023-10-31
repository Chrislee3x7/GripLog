const express = require('express');
const app = express();
// for parsing json bodies
const bodyParser = require('body-parser');
// middleware library
// helps log requests (GET api/v1/problems etc...) to the server console
const morgan = require('morgan');
// helps to connect to mongoDB
const mongoose = require('mongoose');
// enable cross origin requests
const cors = require('cors');
// Helps us check that the token that the user provides is valid
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error_handler')
// for access to .env file variables
// any variables defined in .env are accessible anywhere in the
// application with the use of "require('dotenv/config')"
require('dotenv/config');

app.use(cors());
// allow all http requests to be passed from any other origin
app.options('*', cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt); // authenticate token
app.use(errorHandler);

// Routes
const problemsRoutes = require('./routes/problems');
const usersRoutes = require('./routes/users');
const attemptsRoutes = require('./routes/attempts');

const api = process.env.API_URL;

app.use(`${api}/problems`, problemsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/attempts`, attemptsRoutes);


// connect to database before starting server
mongoose.connect(process.env.CONNECTION_STRING, {
  // 'griplogdb' lines up with database name on MongoAtlas
  dbName: 'griplogdb'
}).then(() => {
  console.log('Database Connection is ready...');
}).catch((err) => {
  console.log(err);
});

// starting server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});