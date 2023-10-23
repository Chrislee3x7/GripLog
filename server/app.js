const express = require('express');
const app = express();
// for parsing json bodies
const bodyParser = require('body-parser');

//middleware
app.use(bodyParser.json());

// for access to .env file variables
// any variables defined in .env are accessible anywhere in the
// application with the use of "require('dotenv/config')"
require('dotenv/config');

const api = process.env.API_URL;

// Initial route that a Get request will take.
// Visitinghttp://localhost:3000 will yield "hello API!"
// http://localhost:3000/api/v1/problems
app.get(`${api}/problems`, (req, res) => {
  const problem = {
    id: 1,
    name: 'Inevitable',
    grade: 'v6',
    image: 'some_url'
  }
  res.send(problem);
});

app.post(`${api}/problems`, (req, res) => {
  const newProblem = req.body;
  console.log(newProblem);
  res.send(newProblem);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});