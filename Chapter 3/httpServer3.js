const http = require('http');
http.request({
  host: 'www.example.org',
  method: 'GET',
  path: "/"
}, function(response) {
  response.setEncoding('utf8')
  response.on('readable', () => console.log(response.read() ))
}).end()

// Short way to get requests

http.get('http://www.example.org', response => {
  console.log(`Status: ${response.statusCode}`)
}).on('error', err => {
  console.log(`Errpr ${err.message}`)
})