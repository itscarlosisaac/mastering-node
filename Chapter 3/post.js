const http = require('http');
const qs = require('querystring');

http.createServer((request, response) => {
  let body = "";
  if ( request.url === "/") {
    response.writeHead( 200, {
      'Content-Type': 'text/html'
    })
    return response.end(
      '<form action="/submit" method="post"> <input type="text" name="sometext">  <input type="text" name="moretext"> <input type="submit" value="Submit data"></form>'
    );
  }
  if( request.url === "/submit" ){
    request.on('readable', () => {
      let data = request.read();
      data && (body += data)
    })
    request.on('end', () => {
      let fields = qs.parse(body);
      console.log(fields)
      response.end(`Thanks for sending ${fields.sometext} & More text: ${fields.moretext}`)
    })
  }
}).listen(8080);