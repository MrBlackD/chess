
var game = new Phaser.Game(512, 512, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var chessboard;
var layer1;
function preload() {
	game.load.image('chessfield', 'assets/chessfield.png');

}

function create() {
	drawBoard();

    
}

function update() {


}

function drawBoard(){
	chessboard=game.add.tilemap();
	chessboard.setTileSize(64,64);
	chessboard.addTilesetImage('chessfield');
	layer1 = chessboard.create('',8, 8, 64, 64);
	layer1.resizeWorld();
    for(var i=0;i<8;i++)
    	for(var j=0;j<8;j++)
    		chessboard.putTile((i+j)%2, i, j);
}