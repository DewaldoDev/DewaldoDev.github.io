/*Global Tafl*/

/*Executes when the canvas is clicked*/
/*Will either select or move a piece on the board*/
Tafl.onGameBoardClick = function (e) {
	'use strict';
	var cell = Tafl.getCursorPosition(e);
	
	//If a piece is selected, draw a highlight otherwise move the piece
	if(cell.isOccupied) {
		if(!cell.isOccupied.isBlack ^ Tafl.defendersTurn) {
			console.log("Cannot select piece out of turn");
			return
		}
		if(Tafl.highlighted) {
			Tafl.highlighted.isOccupied.isSelected = false;
			Tafl.highlighted.isOccupied.draw(Tafl.highlighted.row, Tafl.highlighted.column);
		}
		cell.isOccupied.isSelected = true;
		Tafl.highlighted = cell;
		cell.isOccupied.draw(cell.row, cell.column);
	
	//If a piece is highlighted and an empty cell selected, call move function
	} else if (Tafl.highlighted) {
		cell.movePiece();
	} else {
		console.log("No piece selected for movement");
	}
};

/*Calculates which Cell is being clicked and returns it*/
Tafl.getCursorPosition = function (e) {
	'use strict';
	var x;
	var y;
	
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= Tafl.canvas.offsetLeft;
	y-= Tafl.canvas.offsetTop;
	x = Math.min(x, Tafl.BOARD_WIDTH * Tafl.PIECE_WIDTH);
	y = Math.min(y, Tafl.BOARD_HEIGHT * Tafl.PIECE_HEIGHT);
	
	return (Tafl.gameBoard[Math.floor(y/Tafl.PIECE_HEIGHT)][Math.floor(x/Tafl.PIECE_WIDTH)]);
};

/*Takes in cell, returns true if no piece is blocking movement path*/
/*!Variable names are a little sloppy?*/
Tafl.isValidMove = function(d) {
	'use strict';
	var c = Tafl.highlighted;
	//First disallow castle movement for all but the king
	if (!c.isOccupied.isKing) {
		if((d.row === 0 || d.row === Tafl.BOARD_HEIGHT-1)&&(d.column === 0 || d.column === Tafl.BOARD_WIDTH-1)) {
			return false;
		}
	}
	
	//Disallow non-king throne movement
	if (!c.isOccupied.isKing && (d.row === Math.floor(Tafl.BOARD_HEIGHT/2) && d.column === Math.floor(Tafl.BOARD_WIDTH/2))) {
		return false;
	}
	
	//Creep outwards from the highlighted piece to the clicked cell checking for pieces
	if (d.row === c.row) {
		var i;
		d.column > c.column ? i=1: i=-1;
		for (var x=c.column+i; x!=d.column; x+=i) {
			if(Tafl.gameBoard[d.row][x].isOccupied) {
				return false;
			}
		}
		return true;
	} else if (d.column === c.column) {
		var i;
		d.row > c.row ? i=1: i=-1;
		for (var y=c.row+i; y!=d.row; y+=i) {
			if (Tafl.gameBoard[y][d.column].isOccupied){
				return false;
			}
		}
		return true;
	} else {
		console.log("Invalid move location");
		return false;
	}
};

/*Checks to see if a piece is surrounded then removes it from the game*/
/*!These if statements are massive, clean these up?*/
Tafl.capturePiece = function(cell) {
	'use strict';
	for(var i=-1; i<=1; i+=2){
		//Checks if cell is outside of array bounds
		if (cell.row+(i*2) >= 0 && cell.row+(i*2) < Tafl.BOARD_HEIGHT) {
			//Checks if piece is the king
			if (Tafl.gameBoard[cell.row+i][cell.column].isOccupied.isKing) {
				Tafl.captureKing(Tafl.gameBoard[cell.row+i][cell.column]);
				return;
			}
			//Checks above then below the moved piece for pieces of opposite color
			if (Tafl.gameBoard[cell.row+i][cell.column].isOccupied && (cell.isOccupied.isBlack != Tafl.gameBoard[cell.row+i][cell.column].isOccupied.isBlack)) {
				if(Tafl.gameBoard[cell.row+(i*2)][cell.column].isOccupied.isBlack === cell.isOccupied.isBlack) {
					Tafl.gameBoard[cell.row+i][cell.column].isOccupied.removePiece(cell.row+i, cell.column);
				}else if((cell.row+(i*2) === 0 || cell.row+(i*2) === Tafl.BOARD_HEIGHT-1)&&(cell.column === 0 || cell.column === Tafl.BOARD_WIDTH-1)){
					Tafl.gameBoard[cell.row+i][cell.column].isOccupied.removePiece(cell.row+i, cell.column);
				}
			}
		}
		//Checks if the cell is outside the array bounds
		if (cell.column+(i*2) >= 0 && cell.column+(i*2) < Tafl.BOARD_WIDTH) {
			//Checks if piece is the king
			if (Tafl.gameBoard[cell.row][cell.column+i].isOccupied.isKing) {
				Tafl.captureKing(Tafl.gameBoard[cell.row][cell.column+i]);
				return;
			}
			//Checks to the left and right of the moved piece
			if (Tafl.gameBoard[cell.row][cell.column+i].isOccupied && (cell.isOccupied.isBlack != Tafl.gameBoard[cell.row][cell.column+i].isOccupied.isBlack)) {
				if(Tafl.gameBoard[cell.row][cell.column+(i*2)].isOccupied.isBlack === cell.isOccupied.isBlack) {
					Tafl.gameBoard[cell.row][cell.column+i].isOccupied.removePiece(cell.row, cell.column+i);
				}else if((cell.row === 0 || cell.row === Tafl.BOARD_HEIGHT-1)&&(cell.column+(1*2) === 0 || cell.column+(i*2) === Tafl.BOARD_WIDTH-1)){
					Tafl.gameBoard[cell.row][cell.column+i].isOccupied.removePiece(cell.row, cell.column+i);
				}
			}
		}
	}
};

/*Modifies playerTurn variable and changes turn text*/
Tafl.toggleTurn = function() {
	'use strict';
	if(Tafl.defendersTurn) {
		Tafl.playerTurn.innerHTML = "Attacker's Turn";
	} else {
		Tafl.playerTurn.innerHTML = "Defender's Turn";
	}
	Tafl.defendersTurn = !Tafl.defendersTurn; 
};

/*Calls this function for king capture rules*/
Tafl.captureKing = function(cell) {
	'use strict';
	console.log("King capture function triggered");
	//Might cause an error checking a property of a non-existant piece... oh well
	//Checks above and below the king
	if(Tafl.gameBoard[cell.row+1][cell.column].isOccupied.isBlack && Tafl.gameBoard[cell.row-1][cell.column].isOccupied.isBlack) {
		if(Tafl.gameBoard[cell.row][cell.column+1].isOccupied.isBlack && Tafl.gameBoard[cell.row][cell.column-1].isOccupied.isBlack) {
			cell.isOccupied.removePiece(cell.row, cell.column);
			Tafl.endGame("The king is dead! The attackers win!");
		}
	}
};