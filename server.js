const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  console.log(`Request was made: ${req.url}`);

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
    default:
      res.statusCode = 404;
      res.end("Not found");
  }

}).listen(process.env.PORT || 3000, "127.0.0.1");
