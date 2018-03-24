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
  socket.on('enter room', function(username) {
    users[socket.id] = username;
    io.emit('chat message', users[socket.id] +' entered.');
  });
  //chat
  socket.on('chat message', function(msg){
    io.emit('chat message', users[socket.id]+' : '+msg);
  });
  //退室
  socket.on('disconnect', function() {
     io.emit('chat message', users[socket.id] +' left the room.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

