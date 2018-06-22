const https = require('https');
const fs = require('fs');

let server = https.createServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
}, (req, res) => {
  // console.log(req)
}).listen(443)

server.on('connection', (req, res) => {
  console.log('Connected')
})