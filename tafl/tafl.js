/*-------------------------------------------------------------*/
/* TO DO                                                       */
/* 1. Make Piece object extend Cell                            */
/* 2. Make persistent game states                              */
/*-------------------------------------------------------------*/

/*Global Tafl object*/
var Tafl = {
	BOARD_WIDTH: 11,
	BOARD_HEIGHT: 11,
	PIECE_WIDTH: 50,
	PIECE_HEIGHT: 50,
	PIXEL_WIDTH: 551,
	PIXEL_HEIGHT: 551
};

Tafl.init = function() {
	'use strict';
	
	//Get the canvas element then draw the lines for the board
	Tafl.canvas = document.getElementById('gameBoard');
	Tafl.c = Tafl.canvas.getContext('2d');
	Tafl.canvas.addEventListener("mousedown", Tafl.onGameBoardClick, false);
	
	Tafl.createBoard();
	Tafl.createPieces();
	
	Tafl.playerTurn = document.getElementById('playerTurn');
	Tafl.defendersTurn = true;
};

/*Draws lines on the canvas and creates the gameBoard array of Cells*/
Tafl.createBoard = function () {
	'use strict';
	
	Tafl.c.clearRect(0,0, Tafl.PIXEL_WIDTH, Tafl.PIXEL_HEIGHT);
	Tafl.c.beginPath();
	
    //vertical lines
    for (var x = 0; x <= Tafl.PIXEL_WIDTH; x += Tafl.PIECE_WIDTH) {
	Tafl.c.moveTo(0.5 + x, 0);
	Tafl.c.lineTo(0.5 + x, Tafl.PIXEL_HEIGHT);
    }
	
	//horizontal lines
    for (var y = 0; y <= Tafl.PIXEL_HEIGHT; y += Tafl.PIECE_HEIGHT) {
	Tafl.c.moveTo(0, 0.5 + y);
	Tafl.c.lineTo(Tafl.PIXEL_WIDTH, 0.5 +  y);
    }
	
	//Corner x's
	function drawAnX(topLeftX, topLeftY) {
		Tafl.c.moveTo(topLeftX, topLeftY);
		Tafl.c.lineTo(topLeftX+0.5+Tafl.PIECE_WIDTH, topLeftY+0.5+Tafl.PIECE_HEIGHT);
		Tafl.c.moveTo(topLeftX+0.5+Tafl.PIECE_WIDTH, topLeftY);
		Tafl.c.lineTo(topLeftX, topLeftY+0.5+Tafl.PIECE_HEIGHT);
	}
	
	drawAnX(0,0);
	drawAnX(Math.floor(Tafl.BOARD_HEIGHT*Tafl.PIECE_HEIGHT/2),Math.floor(Tafl.BOARD_WIDTH*Tafl.PIECE_WIDTH/2));
	drawAnX(0,Tafl.PIXEL_HEIGHT-Tafl.PIECE_HEIGHT);
	drawAnX(Tafl.PIXEL_WIDTH-Tafl.PIECE_WIDTH, 0);
	drawAnX(Tafl.PIXEL_WIDTH-Tafl.PIECE_WIDTH, Tafl.PIXEL_HEIGHT-Tafl.PIECE_HEIGHT);
	
	//draw it!
    Tafl.c.strokeStyle = "#ccc";
    Tafl.c.stroke();
	
	//Create a 2d array of cells which represents the game board
	Tafl.gameBoard = new Array(Tafl.BOARD_HEIGHT);
	for(var row=0; row<Tafl.BOARD_HEIGHT; row++) {
		Tafl.gameBoard[row] = new Array(Tafl.BOARD_WIDTH);
		for(var column=0; column<Tafl.BOARD_WIDTH; column++) {
			Tafl.gameBoard[row][column] = new Tafl.Cell(row, column, false);
		}
	}
};

/*Creates Piece objects and assigns their starting position*/
Tafl.createPieces = function () {
	'use strict';
	
	//Create the white defender pieces
	for (var row=3; row<8; row++){
		for (var column=Math.ceil(4-Math.sin(row*(Math.PI/2))); column<Math.floor(7+Math.sin(row*(Math.PI/2))); column++){
			if(row===5 && column===5){
				Tafl.gameBoard[row][column].placePiece(new Tafl.Piece(false,true));
			} else {
				Tafl.gameBoard[row][column].placePiece(new Tafl.Piece(false, false));
			}
		}
	}
	
	//Place black attacker pieces
	for(var i=3; i<8; i++) {
		Tafl.gameBoard[0][i].placePiece(new Tafl.Piece(true, false));
		Tafl.gameBoard[10][i].placePiece(new Tafl.Piece(true, false));
		Tafl.gameBoard[i][0].placePiece(new Tafl.Piece(true, false));
		Tafl.gameBoard[i][10].placePiece(new Tafl.Piece(true, false));
		
		if(i===5){
			Tafl.gameBoard[1][i].placePiece(new Tafl.Piece(true, false));
			Tafl.gameBoard[9][i].placePiece(new Tafl.Piece(true, false));
			Tafl.gameBoard[i][1].placePiece(new Tafl.Piece(true, false));
			Tafl.gameBoard[i][9].placePiece(new Tafl.Piece(true, false));
		}
	}
	
	Tafl.highlighted = false;
	Tafl.drawPieces();
};

/*Draws the game pieces to the board, called after every move/removal */
Tafl.drawPieces = function () {

	//Loop through cells and call each associated Piece objects' "draw" method
	for(var row=0; row<Tafl.BOARD_HEIGHT; row++) {
		for(var column=0; column<Tafl.BOARD_WIDTH; column++) {
			//Abuses the JS convention of objects evaluating as true
			if (Tafl.gameBoard[row][column].isOccupied) {
				Tafl.gameBoard[row][column].isOccupied.draw(row, column);
			}
		}
	}

};

Tafl.endGame = function (text) {
	Tafl.c.clearRect(0,0, Tafl.PIXEL_HEIGHT, Tafl.PIXEL_WIDTH);
	Tafl.c.font="20pt Verdana";
	Tafl.c.textAlign="center";
	Tafl.c.textBaseline="middle";
	Tafl.c.fillText(text, Tafl.PIXEL_HEIGHT/2, Tafl.PIXEL_WIDTH/2);
	Tafl.canvas.removeEventListener("mousedown", Tafl.onGameBoardClick, false);
	
}