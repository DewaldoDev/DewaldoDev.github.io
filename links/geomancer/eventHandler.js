//Grabs the coordinates of the click and fits it to a particular tile
function onPlayAreaClick (e){
	'use strict';

	var x, y;
	
	if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= GameBoard.canvas.offsetLeft;
	y -= GameBoard.canvas.offsetTop;

	var tile = TileArray.getTile(x,y);
	if(tile){
		onTileClick(tile);
	}
};

//Currently adds a "T" for "temple" to the tile's drawable array
function onTileClick(tile){
	'use strict';

	if (tile.addDrawable(new Drawable ('T'))) {
		tile.drawTile();
	}
};