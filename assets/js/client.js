var Client = {};

Client.socket = io.connect();

Client.askNewPlayer = function() {
	Client.socket.emit('newplayer');
}

Client.socket.on('newplayer', function(data){
	game.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('allplayers', function(data){
	for (var i = 0; i < data.length; i++) {
		game.addNewPlayer(data[i].id, data[i].x, data[i].y);
	}
});

Client.socket.on('remove', function(id){
	game.removePlayer(id);
});

Client.socket.on('moveUp', function(data){
	game.movePlayerUp(data.id);
});

Client.socket.on('moveDown', function(data){
	game.movePlayerDown(data.id);
});

Client.socket.on('moveLeft', function(data){
    game.movePlayerLeft(data.id);
});

Client.socket.on('moveRight', function(data){
    game.movePlayerRight(data.id);
});

Client.socket.on('stopMoving', function(data){
	game.stopMoving(data.id);
});
