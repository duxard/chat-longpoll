const http = require("http");
const fs = require("fs");
const chat = require("./chat");

const server = http.createServer((req, res) => {
  // console.log(`Request was made: ${req.url}`);
  switch (req.url) {
    case '/':
      fs.readFile("index.html", (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
      break;

    case '/info':
      res.end("Info page");
      break;

    case '/subscribe':
      chat.subscribe(req, res);
      break;

    case '/publish':
      let message = '';

      req.setEncoding('utf8');
      req.on('data', function(chunk) {
        message += chunk;
      }).on('end', function() {
        chat.publish(message);
        res.end("ok");
      });

      // var postData;
      // req.on("data", function(postDataChunk) {
      //   postData = postDataChunk;
      //   console.log("Received POST data chunk '"+
      //   postDataChunk.length + "'.");
      // });
      // req.on("end", function() {
      //   try {
      //    postData = JSON.parse(postData);
      //   } catch (err) {
      //    res.statusCode = 400;
      //    res.end("Bad request");
      //    return;
      //   }
      //   chat.publish(postData.message);
      //   res.end('ok');
      // });

      break;

    default:
      res.statusCode = 404;
      res.end("Not found");
  }

}).listen(process.env.PORT || 3000, "127.0.0.1");
