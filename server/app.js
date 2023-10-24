const express = require('express');
const app = express();
// for parsing json bodies
const bodyParser = require('body-parser');
// middleware library
// helps log requests (GET api/v1/problems etc...) to the server console
const morgan = require('morgan');
// helps to connect to mongoDB
const mongoose = require('mongoose');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const problemSchema = mongoose.Schema({
  name: String,
  grade: Number,
  image: String,
  attemptCount: {
    type: Number,
    required: true
  }
});

const Problem = mongoose.model('Problem', problemSchema);

// for access to .env file variables
// any variables defined in .env are accessible anywhere in the
// application with the use of "require('dotenv/config')"
require('dotenv/config');

const api = process.env.API_URL;

// Initial route that a Get request will take.
// Visitinghttp://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems
app.get(`${api}/problems`, async (req, res) => {
  // gets all Problems
  const problemList = await Problem.find();
  if (!problemList) {
    res.status(500).json({succes: false});
  }
  res.send(problemList);
});

app.post(`${api}/problems`, async (req, res) => {
  const problem = new Problem({
    name: req.body.name,
    grade: req.body.grade,
    image: req.body.image,
    attemptCount: req.body.attemptCount
  });

  const createdProblem = await problem.save();
  if (!createdProblem) {
    res.status(500).json({
      error: err,
      success: false
    });
  } else {
    res.status(201).json(createdProblem);
  }
});

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