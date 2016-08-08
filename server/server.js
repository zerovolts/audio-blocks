var connect = require('connect');
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

const port = 8000;
var serve = serveStatic('app', {'index': ['index.html', 'index.htm']});

var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
});

server.listen(port);
console.log("Serving on port: " + port);
