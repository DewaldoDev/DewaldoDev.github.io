Tile = function(xPos, yPos, color) {
	this.xPos = xPos;
	this.yPos = yPos;
	this.color = color;
};

Tile.prototype.swapColor = function (tile) {
	'use strict';

	var temp = this.color;
	this.color = tile.color;
	tile.color = temp;
};

Tile.prototype.drawTile = function() {
	'use strict';

	var x = this.xPos;
	var y = this.yPos;

	switch (this.color) {

		case 'blue':
			GameBoard.context.fillStyle = '#6699FF';
			break;

		case 'red':
			GameBoard.context.fillStyle = '#FF6699';
			break;

		case 'green':
			GameBoard.context.fillStyle = '#66FF99';
			break; 
	}

	GameBoard.context.fillRect(x, y, GameBoard.TILE_WIDTH, GameBoard.TILE_HEIGHT);
	this.drawDrawable();

};

Tile.prototype.addDrawable = function(drawable) {
	'use strict';

	drawable.init();
	this.drawable = drawable;
	return true;
};

Tile.prototype.drawDrawable = function() {
	'use strict';
	var tileCenterX = this.xPos + (GameBoard.TILE_WIDTH/2);
	var tileCenterY = this.yPos + (GameBoard.TILE_HEIGHT/2);
	if(this.drawable){
		this.drawable.draw(tileCenterX, tileCenterY);
	}
};