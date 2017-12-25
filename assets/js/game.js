const width = 5;
const height = 5;
var count = width*height;

var game = new Phaser.Game(350, 350, Phaser.Auto)
var score = 0;
var scoreText;
var bubbles;
var bubble;
var gameArr = Create2DArray(width, height);
var bubbleDict = {};

var pop;

var GameState = {
	preload: function(){
		game.load.image('sky', 'assets/img/sky.png');
		game.load.spritesheet('ground', 'assets/img/platform.png', 100, 200);
		game.load.image('star', 'assets/img/star.png');
        game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
        game.load.spritesheet('bubble', 'assets/img/bubble.png', 70, 70);
        game.load.audio('pop', 'assets/sound/pop.mp3');
	},
	create: function(){
		game.stage.backgroundColor = "#4488AA";
		bubbles = game.add.group();
		populateBubbles();
		pop = game.add.audio('pop');

	},
	update: function() {
		if (count == 0) {
			resetBubbles();
		}
	}
};

function select (bubble) {
	// console.log('i: ' + bubble.i + ' j: ' + bubble.j);
	pop.play();
	var i = bubble.i;
	var j = bubble.j;

	bubble = bubbleDict[i + ',' + j]
	bubble.destroy();
	// bubbleDict[i + ',' + j] = bubbles.create(70 * j , 70 * i, 'star');
	count--;
}

function createBubble(i, j) {
	bubble = bubbles.create(70 * j , 70 * i, 'bubble');
	bubbleDict[i + ',' + j] = bubble;
	bubble.inputEnabled = true;
	bubble.input.start(0, true);
	bubble.i = i;
	bubble.j = j;
    bubble.events.onInputDown.add(select);
}

function populateBubbles() {
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			gameArr[i][j] = 'bubble';
			createBubble(i, j);
		}
	}
}

function resetBubbles() {
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			bubbleDict[i + ',' + j].destroy();
			gameArr[i][j] = 'bubble';
			createBubble(i, j);
		}
	}
	count = height * width;
}

function Create2DArray(rows,columns) {
   var x = new Array(rows);
   for (var i = 0; i < rows; i++) {
       x[i] = new Array(columns);
   }
   return x;
}

game.state.add('GameState', GameState);
game.state.start('GameState');
