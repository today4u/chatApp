var app   = require('express')();
var http  = require('http').Server(app);
var io    = require('socket.io')(http);
var users = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  //入室時
  io.emit('chat message','Someone has entered.');
  //chat
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  //退室
  socket.on('disconnect', function() {
     io.emit('chat message','Someone left the room.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

