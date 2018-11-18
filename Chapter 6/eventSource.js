const http = require('http');
const url = require('url');
const fs = require('fs')

http.createServer((request, response) => {
  let parsedURL = url.parse(request.url, true);
  let pathname = parsedURL.pathname;
  let args = pathname.split("/");
  let method = args[1];
  if( method === 'login') {
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection" : "keep-alive"
    });
    response.write(":" + Array(2049).join(" ") + "\n" );
    response.write("retry: 2000\n");
    response.on("close", () => {
      console.log("client diconnected");
    });
    setInterval(() => {
      response.write("data: " + new Date() + "\n\n");
    }, 1000 );
    return;
  }
  if(method = "client") {
		fs.createReadStream("./eventSource.html").pipe(response);
}
}).listen(8080);