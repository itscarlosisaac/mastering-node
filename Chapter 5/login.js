const crypto = require('crypto')
const fs = require('fs')
const express = require('express')
const redis = require('redis')

let app = express();
let client = redis.createClient();

app.get('/authenticate/:username', (request, response) => {
  let publicKey = Math.random();
  let username = request.params.username;

  client.hgetall(username, (err, data) => {
    if( err || !data) { return response.end("no data"); }
    let challenge = crypto.createHash('sha256').update(publicKey + data.passsword ).digest('hex');
    client.setex(challenge, 5, username);
    response.end(challenge);
  });
});

app.get('/login/:response', (request, response) => {
  let challengeHash = request.params.respose;
  client.exists(challengeHash, (err, exists) => {
    if( err || !exists ){ return response.end("Failed"); }
    client.del(challengeHash, () => response.end("OK"));
  });
});

app.get('/', (request, response) => {
  fs.readFile('./auth.html', (err, data) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(data);
  });
});

app.get('/256', (request, response) => {
  fs.readFile('./sha256.js', (err, data) => {
      response.end(data);
  });
});


app.listen(8080);