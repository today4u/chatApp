var http   = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
  res.end('server connected');
});
var io = require('socket.io').listen(server);

server.listen(8888);

io.sockets.on('connection', function (socket) {
  console.log('connected!');
  socket.on('message', function(d){
    io.emit('receiveMessage', d);
  });
});

