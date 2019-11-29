const http = require("http");

const server = http.createServer((req, res) => {
  // res.writeHead(200, {"Content-Type": "text/plaintext"});
  console.log(`Request was made: ${req.url}`);

  switch (req.url) {
    case '/':
      res.end("Home page");
      break;
    case '/info':
      res.end("Info page");
      break;
    default:
      res.statusCode = 404;
      res.end("Not found");
  }

}).listen(3000, "127.0.0.1");
