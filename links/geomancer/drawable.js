Drawable = function(character, options) {
	
	this.character = character;
	this.options = options ? options : {font:'48px serif', color:'black'};
};

//Calculates the center point of the character to use for drawing
Drawable.prototype.init = function() {
	'use strict';
	var text = GameBoard.context.measureText(this.character);
	this.xOffset =  (text.width/2);
	console.log('Text width is', text.width);
};

//Given the coordinates of the top-left corner of a tile, draw a character
Drawable.prototype.draw = function(x, y) {
	'use strict';

	GameBoard.context.font = this.options.font;
	GameBoard.context.fillStyle = this.options.color;
	GameBoard.context.fillText(this.character, x-this.xOffset, y);
};