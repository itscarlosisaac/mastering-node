const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const expressjwt = require('express-jwt')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const jwtCheck = expressjwt({
  secret: "mysupersecretkey"
})

const users = [
  { id: 1, username: 'admin', password: 'admin'},
  { id: 2, username: 'guest', password: 'guest'}
]

app.get("/resourse", (req, res) => {
  res.status(200).send("Public resourse, you can see this")
})

app.get("/resourse/secret", jwtCheck, (req, res) => {
  res.status(200).send("Secret resourse, you should be logged in to see this");
})

app.post("/login", (req, res) => {
  if( !req.body.username || !req.body.password ){
    res.status(400)
    .send("Yoy need a username and password");
    return;
  }

  const user = users.find( (u) => {
    return u.username === req.body.username && u.password === req.body.password
  });

  if( !user ) {
    res
    .status(401)
    .send("User not found")
  }
  
  const token = jwt.sign({
    sub: user.id,
    username: user.username,
    iat: Date.now(),
  }, "mysupersecretkey", {expiresIn: "3 hours"});

  res
  .status(200)
  .send({access_token: token})

})

app.get("/status", (req, res) => {
  const localTime = (new Date()).toLocaleDateString();

  res
  .status(200)
  .send(`Server time is ${localTime}.`)
});

app.get("*", (req, res) => {
  res.sendStatus(404)
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})