
var game = new Phaser.Game(1024, 1024, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var chessboard;
var layer1;
var layer2;
var map=[];
var n=8;
var figure={
	name:"",
	x:0,
	y:0,
	side:""
}


function preload() {
	game.load.image('tileset', 'assets/tileset.png');

}

function create() {
	drawBoard();
	initFigures();
	drawMap();
    
}

function update() {


}

function drawBoard(){
	chessboard=game.add.tilemap();
	chessboard.setTileSize(128,128);
	chessboard.addTilesetImage('tileset');
	layer1 = chessboard.create('l1',8, 8, 128, 128);
	layer2 = chessboard.createBlankLayer('l2',8, 8, 128, 128);
	layer1.resizeWorld();
    for(var i=0;i<8;i++)
    	for(var j=0;j<8;j++)
			chessboard.putTile((i+j)%2, i, j,layer1);
}

function initFigures(){
	for(var i=0;i<n;i++){
		map[i]=[];
		for(var j=0;j<n;j++)
			map[i][j]={	
				name:"",
				x:-1,
				y:-1,
				side:"",
				tile:0};
	}
	//rooks
	place(map[0][0],"rook",0,0,"black",4);
	place(map[0][7],"rook",0,7,"black",4);
	place(map[7][0],"rook",7,0,"white",5);
	place(map[7][7],"rook",7,7,"white",5);
	//knights,
	place(map[0][1],"pawn",0,1,"black",6);
	place(map[0][6],"pawn",0,6,"black",6);
	place(map[7][1],"pawn",7,1,"white",7);
	place(map[7][6],"pawn",7,6,"white",7);
	//bishops,
	place(map[0][2],"pawn",0,2,"black",8);
	place(map[0][5],"pawn",0,5,"black",8);
	place(map[7][2],"pawn",7,2,"white",9);
	place(map[7][5],"pawn",7,5,"white",9);
	//queens
	place(map[0][3],"pawn",0,3,"black",10);
	place(map[7][3],"pawn",7,3,"white",11);
	//pawns
	for(var j=0;j<n;j++){ 
		place(map[1][j],"pawn",1,j,"black",2);
		place(map[6][j],"pawn",6,j,"white",3);
	}
	//kings
	place(map[0][4],"king",0,4,"black",12);
	place(map[n-1][4],"king",n-1,4,"white",13);
}

function place(map,name,x,y,side,tile){
	map.name=name;
	map.x=y;
	map.y=x;
	map.side=side;
	map.tile=tile;
}

function drawMap(){
	for(var i=0;i<n;i++)
		for(var j=0;j<n;j++)
			if(map[i][j].name)
				chessboard.putTile(map[i][j].tile, map[i][j].x, map[i][j].y,layer2);
}