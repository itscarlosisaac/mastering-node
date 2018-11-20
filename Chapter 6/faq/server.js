const http = require('http');
const fs = require('fs');
const url = require('url');

let UNIQUE_ID = 1;
let USER_ID	= 1e10;

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
  let args = pathname.split("/");

  args.shift();

  let method = args.shift();
  let parameter = decodeURIComponent(args[0]);

  let sseUserId = request.headers['_sse_user_id_'];

  let broadcast = (toId, msg, eventName) => {
    if( toId === "*" ) {
      for(let p in clients) { broadcast(p, msg); }
      return;
    }

    let clientSocket = clients[toId];
    if(!clientSocket) { return; }

    eventName && clientSocket.write("event: " + eventName + "\n");
    clientSocket.write("id: " + (++UNIQUE_ID) + "\n");
    clientSocket.write("data: " + JSON.stringify(msg) + "\n\n")
  }

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

		broadcast(sseUserId, sseUserId, "login");

    broadcast( sseUserId, {
      type: "questions", questions: questions
    });

    response.on("close", () => { removeClient(sseUserId); });

    setInterval( () => {
      broadcast(sseUserId, new Date().getTime(), "ping");
    }, 10000);
    return;
  }

  if ( method === "askquestion" ){
    if( questions[parameter]){
      return response.end('already asked');
    }
    questions[parameter] = sseUserId;

    broadcast("*", {
      type: "questions", questions: questions
    });
    return response.end();
  }

  if ( method === "addanswer" ){
    if( !parameter ){
      broadcast(sseUserId, {
        type: "notification", message: "Your answer is too short"
      });
      return response.end();
    }

    let curUserQuestion = clientQMap[sseUserId];
    if ( !curUserQuestion ) {
      broadcast(sseUserId, {
        type: "notification", message: "Please select a question to answer"
      });
      return response.end();
    }

    answers[curUserQuestion] = answers[curUserQuestion] || [];
    answers[curUserQuestion].push(parameter);

    for ( let id in clientQMap ) {
      if( clientQMap[id] === curUserQuestion ){
        broadcast(id, {
          type: "answers",
          question: curUserQuestion,
          answers: answers[curUserQuestion]
        });
      }
    }
    return response.end();
  }

  if( method === 'selectquestion'){
    if( parameter && questions[parameter]){
      clientQMap[sseUserId] = parameter;
      broadcast(sseUserId, {
        type: 'answers',
        question: parameter,
        answers: answers[parameter] ? answers[parameter] : []
      });
      return response.end();
    }
  }

  if( !method ) {
    return fs.createReadStream('./index.html').pipe(response);
  }

}).listen(8080);