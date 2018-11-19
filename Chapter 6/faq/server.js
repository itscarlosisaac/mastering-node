const http = require('http');
const fs = require('fs');
const url = require('url');

let clients = {}
let clientQMap = {};
let questions = {};
let answers = {};

const removeClient = (id) => {
  if( id ) {
    delete clients[id];
    delete clientQMap[id];
  }
}

http.createServer( (request, response ) => {
  let parsedURL = url.parse(request.url, true);
  let pathname = parsedURL.pathname;
  let args = pathanem.split("/");
  args.shift();
  let method = args.shift();
  let param = decodeURIComponent(args[0]);

  let sseUserId = request.headers['_sse_user_id_'];
  if( method === "login" ){
    response.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache"
    });

    response.write(":" + Array(2049).join(" ") + "\n");
    response.write("retry: 2000\n");
    removeClient(sseUserId);

    sseUserId = (USER_ID++).toString(36);
    clients[sseUserId] = response;
    broadcast(sseUserId, {
      type: "login", userId: sseUserId
    });
    broadcast( sseUserId, {
      type: "questions", questions: questions
    });

    response.on("close", () => { removeClient(sseUserId); });

    setInterval( () => {
      broadcast(sseUserId, new Date().getTime(), "ping");
    }, 10000);
    return;
  }
}).listen(8080);