var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

app.use(express.static('public'));

redis.subscribe('orderChannel');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  redis.on("message", function(channel, message) {
    if (channel == "orderChannel") {
      io.emit('order notice', "msg");
    }
  });
});

http.listen(8090, function(){
  console.log('listening on *:8090');
});
