var GameBoard = {

	TILE_WIDTH: 100,
	TILE_HEIGHT: 100,
	X_TILE_COUNT: 6,
	Y_TILE_COUNT: 6,
	LINE_WIDTH: 2
};

GameBoard.init = function(){
	'use strict';

	GameBoard.BOARD_WIDTH = GameBoard.TILE_WIDTH * GameBoard.X_TILE_COUNT + GameBoard.LINE_WIDTH * (GameBoard.X_TILE_COUNT+1);
	GameBoard.BOARD_HEIGHT = GameBoard.TILE_HEIGHT * GameBoard.Y_TILE_COUNT + GameBoard.LINE_WIDTH * (GameBoard.Y_TILE_COUNT+1);

	//Grab and grab the canvas to use as the play area
	GameBoard.instructions = document.getElementById('instructions');
	GameBoard.templeCoordinates = document.getElementById('templeCoordinates');
	GameBoard.canvas = document.getElementById('playArea');
	GameBoard.context = GameBoard.canvas.getContext('2d');


	GameBoard.drawBoard();

	//Set up the click event handler
	GameBoard.canvas.addEventListener('mousedown', onPlayAreaClick, false);
};

GameBoard.drawBoard = function() {
	'use strict';

	//Resize the canvas
	GameBoard.context.canvas.width = GameBoard.BOARD_WIDTH;
	GameBoard.context.canvas.height = GameBoard.BOARD_HEIGHT;

	TileArray.init();

	for (var x=0; x<GameBoard.X_TILE_COUNT; x++) {
		for (var y=0; y<GameBoard.Y_TILE_COUNT; y++) {
			TileArray.tiles[x][y].drawTile();
		}
	}

	GameBoard.drawLines();
};

GameBoard.drawLines = function() {
	'use strict';

	var ctx = GameBoard.context;

	for(var x = 1; x<=GameBoard.BOARD_WIDTH; x+=(GameBoard.TILE_WIDTH+GameBoard.LINE_WIDTH)){
		ctx.beginPath();
		ctx.moveTo(x, 1);
		ctx.lineTo(x, GameBoard.BOARD_HEIGHT);
		ctx.lineWidth = GameBoard.LINE_WIDTH;
		ctx.stroke();
	}

	for(var y = 1; y<=GameBoard.BOARD_HEIGHT; y+=(GameBoard.TILE_HEIGHT+GameBoard.LINE_WIDTH)){
		ctx.beginPath();
		ctx.moveTo(1, y);
		ctx.lineTo(GameBoard.BOARD_WIDTH, y);
		ctx.lineWidth = GameBoard.LINE_WIDTH;
		ctx.stroke();
	}
};