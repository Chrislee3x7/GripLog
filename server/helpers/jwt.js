const { expressjwt: jwt } = require('express-jwt');
require('dotenv/config');

// This helps us check if the user provided token is valid based
// on the secret

const secret = process.env.SECRET;
const api = process.env.API_URL;
const authJwt = jwt({
  secret,
  algorithms: ['HS256']
}).unless({ // List of api paths that anyone can access "unless it is this api path"
  path: [
    {url: `${api}/problems`, methods: ['GET', 'OPTIONS']}, // Allows non logged in users to see all problems, but not post
    `${api}/users/login`,
    `${api}/users/register`
  ]
});

module.exports = authJwt;