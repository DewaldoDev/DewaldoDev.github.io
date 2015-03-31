/*Global Tafl*/
Tafl.Piece = function(isBlack, isKing) {
	'use strict';
	this.isBlack = isBlack;
	this.isKing = isKing;
	this.isSelected = false;
};

Tafl.Piece.prototype.draw = function (row, column) {
	'use strict';
	//Translate "row" and "column" into canvas pixels
	var x = (column * Tafl.PIECE_WIDTH) + (Tafl.PIECE_WIDTH/2);
    var y = (row * Tafl.PIECE_HEIGHT) + (Tafl.PIECE_HEIGHT/2);
    var radius = (Tafl.PIECE_WIDTH/2) - (Tafl.PIECE_WIDTH/10);
	
	Tafl.c.clearRect(x-(Tafl.PIECE_WIDTH/2)+2, y-(Tafl.PIECE_HEIGHT/2)+2, Tafl.PIECE_WIDTH-2, Tafl.PIECE_HEIGHT-2);
	
	//highlight selected piece with a faint yellow border
	//draw this before doing the piece so it appears behind it
	if(this.isSelected) {
		this.drawHighlight(x,y,radius);
	}
	
    Tafl.c.beginPath();
    Tafl.c.arc(x, y, radius, 0, Math.PI*2, false);
    Tafl.c.closePath();

    if (this.isBlack) {
	Tafl.c.fillStyle = "#000";
	Tafl.c.fill();
    }
	
	/* Designate the king with a + */
	if(this.isKing) {
		Tafl.c.moveTo(x-(Tafl.PIECE_WIDTH/4),y-(Tafl.PIECE_HEIGHT/4));
		Tafl.c.lineTo(x+(Tafl.PIECE_WIDTH/4), y+(Tafl.PIECE_HEIGHT/4));
		Tafl.c.moveTo(x+(Tafl.PIECE_WIDTH/4), y-(Tafl.PIECE_HEIGHT/4));
		Tafl.c.lineTo(x-(Tafl.PIECE_WIDTH/4), y+(Tafl.PIECE_HEIGHT/4));
	}
	
	Tafl.c.strokeStyle = "#000";
	Tafl.c.lineWidth = 1;
    Tafl.c.stroke();
}

Tafl.Piece.prototype.drawHighlight = function (x, y, radius) {
	'use strict';
	Tafl.c.beginPath();
	Tafl.c.arc(x, y, radius, 0, Math.PI*2, false);
	Tafl.c.closePath();
	Tafl.c.strokeStyle = "#FFFF00";
	Tafl.c.lineWidth = 7;
	Tafl.c.stroke();
}

Tafl.Piece.prototype.removePiece = function (row, column) {
	'use strict';
	Tafl.c.clearRect(column * Tafl.PIECE_WIDTH + 2, row * Tafl.PIECE_HEIGHT + 2, Tafl.PIECE_WIDTH - 2, Tafl.PIECE_HEIGHT - 2);
	Tafl.gameBoard[row][column].isOccupied = false;
	Tafl.gameBoard[row][column] = new Tafl.Cell(row, column, false);
	delete this
};