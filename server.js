const http = require("http");
const fs = require("fs");

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
  // res.writeHead(200, {"Content-Type": "text/plaintext"});
  console.log(`Request was made: ${req.url}`);

  switch (req.url) {
    case '/':
      sendFile("index.html", res);
      break;
    case '/info':
      res.end("Info page");
      break;
    default:
      res.statusCode = 404;
      res.end("Not found");
  }

}).listen(port, host, () => {
  console.log(`Server is up and running at ${host}:${port}`);
});

function sendFile(fileName, res) {
  // This line opens the file as a readable stream
  let readStream = fs.createReadStream(fileName);
  // This will wait until we know the readable stream is actually valid before piping
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
  // This catches any errors that happen while creating the readable stream (usually invalid names)
  readStream.on('error', function(err) {
    res.statusCode = 500;
    res.end(err);
  });

  readStream.on('close', function() {
    readStream.destroy();
  });
}
