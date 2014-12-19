
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
			chessboard.putTile((i+j+1)%2, i, j,layer1);
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
	}/*
	//rooks
	map[0][0]=place("rook",0,0,"black");
	map[0][7]=place("rook",0,7,"black");
	map[7][0]=place("rook",7,0,"white");
	map[7][7]=place("rook",7,7,"white");
	//knights
	map[0][1]=place("pawn",0,1,"black");
	map[0][6]=place("pawn",0,6,"black");
	map[7][1]=place("pawn",7,1,"white");
	map[7][6]=place("pawn",7,6,"white");
	//bishops
	map[0][2]=place("pawn",0,2,"black");
	map[0][5]=place("pawn",0,5,"black");
	map[7][2]=place("pawn",7,2,"white");
	map[7][5]=place("pawn",7,5,"white");
	//queens
	map[0][3]=place("pawn",0,3,"black");
	map[7][3]=place("pawn",7,3,"white");*/
	//pawns
	for(var j=0;j<n;j++){
		place(map[1][j],"pawn",1,j,"black",2);
		place(map[6][j],"pawn",6,j,"white",3);
	}
	//kings
	//map[0][4]=place("king",0,4,"black");
	//map[n-1][4]=place("king",0,n-1,"white");
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