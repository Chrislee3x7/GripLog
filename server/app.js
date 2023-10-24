const express = require('express');
const app = express();
// for parsing json bodies
const bodyParser = require('body-parser');
// middleware library
// helps log requests (GET api/v1/problems etc...) to the server console
const morgan = require('morgan');
// helps to connect to mongoDB
const mongoose = require('mongoose');
// for access to .env file variables
// any variables defined in .env are accessible anywhere in the
// application with the use of "require('dotenv/config')"
require('dotenv/config');

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Routes
const problemsRoutes = require('./routes/problems');
const usersRoutes = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/problems`, problemsRoutes);
app.use(`${api}/users`, usersRoutes);


// add connection before starting server
mongoose.connect(process.env.CONNECTION_STRING, {
  // 'griplogdb' lines up with database name on MongoAtlas
  dbName: 'griplogdb'
}).then(() => {
  console.log('Database Connection is ready...');
}).catch((err) => {
  console.log(err);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});