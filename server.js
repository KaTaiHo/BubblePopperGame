var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html'); 
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayerID = 0;

io.on('connection', function(socket){
	console.log("a new player has joined the game!")
	socket.on('newplayer', function(){
		socket.player = {
			id: server.lastPlayerID++,
			x: randomInt(100, 400),
			y: randomInt(100, 400)
		};

		socket.on('disconnect', function(){
			console.log("User with ID: " + socket.player.id + " has disconnected");
			io.emit('remove', socket.player.id);
		});
	});
});

function getAllPlayers(){
	var players = [];
	Object.keys(io.sockets.connected).forEach(function(socketID){
		var player = io.sockets.connected[socketID].player;
		if(player) players.push(player);
	});
	return players;
}

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}
