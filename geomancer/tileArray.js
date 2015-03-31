//A singleton that holds an array of Tile objects that make up the play area
var TileArray = {
	tiles : new Array(GameBoard.X_TILE_COUNT)
};

TileArray.init = function() {
	'use strict';

	//Give each array position a new tile reference
	for(var x=0; x<GameBoard.X_TILE_COUNT; x++) {
		this.tiles[x] = new Array(GameBoard.Y_TILE_COUNT)
		var xLineOffset = GameBoard.LINE_WIDTH + (GameBoard.LINE_WIDTH * x);
		for(var y=0; y<GameBoard.Y_TILE_COUNT; y++) {
			var yLineOffset = GameBoard.LINE_WIDTH + (GameBoard.LINE_WIDTH * y);
			if (y<2) {
				this.tiles[x][y] = new Tile (x*GameBoard.TILE_WIDTH+xLineOffset, y*GameBoard.TILE_HEIGHT+yLineOffset,'blue');
			} else if (y<4) {
				this.tiles[x][y] = new Tile (x*GameBoard.TILE_WIDTH+xLineOffset, y*GameBoard.TILE_HEIGHT+yLineOffset,'green');
			} else {
				this.tiles[x][y] = new Tile (x*GameBoard.TILE_WIDTH+xLineOffset, y*GameBoard.TILE_HEIGHT+yLineOffset,'red');
			}
		}

		//Shuffle the colors of each tile to randomize the layout
		var i = this.tiles[x].length, j, tempi, tempj;
		while(i--) {
			j = Math.floor(Math.random() * (i+1));
			this.tiles[x][i].swapColor(this.tiles[x][j]);
		}
	}
};

//Given coordinates on the screen, return the tile that is clicked on
TileArray.getTile = function(xPos, yPos) {
	'use strict';
	var x = Math.floor(xPos / GameBoard.TILE_WIDTH);
	var y = Math.floor(yPos / GameBoard.TILE_HEIGHT);

	if((x>=0 && x<GameBoard.X_TILE_COUNT) && (y>=0 && y<GameBoard.Y_TILE_COUNT)) {
		return this.tiles[x][y];
	} else {
		console.log('Could not resolve play area click');
		return;
	}
};

