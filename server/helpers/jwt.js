const { expressjwt: jwt } = require('express-jwt');
require('dotenv/config');

// This helps us check if the user provided token is valid based
// on the secret

const secret = process.env.ACCESS_TOKEN_SECRET;
const api = process.env.API_URL;
const authJwt = jwt({
  secret,
  algorithms: ['HS256']
}).unless({ // List of api paths that anyone can access "unless it is this api path"
  path: [
    {url: `${api}/problems`, methods: ['GET', 'OPTIONS']}, // Allows non logged in users to see all problems, but not post
    {url: `${api}/attempts`, methods: ['GET', 'OPTIONS']}, // Allows non logged in users to see all attempts, but not post
    {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS']},
    `${api}/users/login`,
    `${api}/users/register`
  ]
});

module.exports = authJwt;