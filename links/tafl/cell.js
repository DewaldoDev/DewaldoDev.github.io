/*global Tafl*/
Tafl.Cell = function(row, column, isOccupied) {
	'use strict';
	this.row = row;
	this.column = column;
	
	//Abuses JavaScript truthiness in a hacky way perhaps
	//Set to false if there's no piece on the cell, otherwise assign a Cell object
	this.isOccupied = isOccupied;
};

Tafl.Cell.prototype.placePiece = function (piece) {
	'use strict';
	if(!this.isOccupied) {
		this.isOccupied = piece;
	} else {
		console.log("Piece placement error at:",this.row, this.column);
	}
};

/*Moves a highlighted piece from Tafl.highlighted to the method calling cell*/
Tafl.Cell.prototype.movePiece = function () {
	'use strict';
	if (Tafl.isValidMove(this)) {
		Tafl.c.clearRect(Tafl.highlighted.column * Tafl.PIECE_WIDTH+2, Tafl.highlighted.row * Tafl.PIECE_HEIGHT+2, Tafl.PIECE_WIDTH-2, Tafl.PIECE_HEIGHT-2);
		this.isOccupied = Tafl.highlighted.isOccupied;
		Tafl.highlighted.isOccupied.isSelected = false;
		this.isOccupied.draw(this.row, this.column);
		
		//Defenders win if the king moves on castle space
		if(Tafl.highlighted.isOccupied.isKing){
			if((this.row === 0 || this.row === Tafl.BOARD_HEIGHT-1) && (this.column === 0 || this.column === Tafl.BOARD_WIDTH-1)){
				Tafl.endGame("The king is safe! Defenders win!");
			}
		}
		
		Tafl.highlighted.isOccupied = false;
		Tafl.gameBoard[Tafl.highlighted.row][Tafl.highlighted.column].isOccupied=false;
		
		//Redraw throne X
		if(Tafl.highlighted.row === Math.floor(Tafl.BOARD_HEIGHT/2) && Tafl.highlighted.column === Math.floor(Tafl.BOARD_WIDTH/2)) {
			var topLeftX = Tafl.highlighted.row*Tafl.PIECE_HEIGHT;
			var topLeftY = Tafl.highlighted.column*Tafl.PIECE_WIDTH;
			Tafl.c.moveTo(topLeftX,topLeftY);
			Tafl.c.lineTo(topLeftX+0.5+Tafl.PIECE_WIDTH, topLeftY+0.5+Tafl.PIECE_HEIGHT);
			Tafl.c.moveTo(topLeftX+0.5+Tafl.PIECE_WIDTH, topLeftY);
			Tafl.c.lineTo(topLeftX, topLeftY+0.5+Tafl.PIECE_HEIGHT);
			Tafl.c.strokeStyle = "#ccc";
			Tafl.c.stroke();
		}
		
		Tafl.highlighted = false;
		Tafl.toggleTurn();
		Tafl.capturePiece(this);
	} else {
		//do nothing
	}
	
};
