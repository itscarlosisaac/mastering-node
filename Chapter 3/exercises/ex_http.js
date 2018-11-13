const http = require('http');
const url = require('url');

let server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  response.write(` <!DOCTYPE html>
                    <html>
                    <head><title>Page Title</title></head>
                    <body>
                    
                    <h1>This is a Heading</h1>
                    <p>This is a paragraph.</p>
                    <script type="text/javascript">
                      console.log("Hello")
                    </script>
                    </body>
                    </html>
                `)
  response.end(  () => console.log("End response")  )
}).listen(8080)

server.on('request', (request, response)=>{
  // console.log(url.parse('https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_message_headers'))
  // console.log(request.rawHeaders)
  request.setEncoding("utf8");
  request.on("readable", () =>  console.log( http.STATUS_CODES ))
  request.on('end', () => console.log("DONE")  )
})