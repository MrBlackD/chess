
var game = new Phaser.Game(1024, 1024, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });


var cursors;
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
var selected;


function preload() {
	game.load.image('tileset', 'assets/tileset.png');

}

function create() {
	drawBoard();
	initFigures();
	drawMap();
	cursors = game.input.keyboard.createCursorKeys();
    game.input.onDown.add(action, this);
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
	place(map,"rook",0,0,"black",8);
	place(map,"rook",0,7,"black",8);
	place(map,"rook",7,0,"white",9);
	place(map,"rook",7,7,"white",9);
	//knights
	place(map,"knight",0,1,"black",4);
	place(map,"knight",0,6,"black",4);
	place(map,"knight",7,1,"white",5);
	place(map,"knight",7,6,"white",5);
	//bishops
	place(map,"bishop",0,2,"black",6);
	place(map,"bishop",0,5,"black",6);
	place(map,"bishop",7,2,"white",7);
	place(map,"bishop",7,5,"white",7);
	//queens
	place(map,"queen",0,3,"black",10);
	place(map,"queen",7,3,"white",11);
	//pawns
	for(var j=0;j<n;j++){ 
		place(map,"pawn",1,j,"black",2);
		place(map,"pawn",6,j,"white",3);
	}
	//kings
	place(map,"king",0,4,"black",12);
	place(map,"king",n-1,4,"white",13);
}

function place(m,name,x,y,side,tile){
	var map=m[y][x];
	map.name=name;
	map.x=y;
	map.y=x;
	map.side=side;
	map.tile=tile;
}

function drawMap(){
	for(var i=0;i<n;i++)
		for(var j=0;j<n;j++)
			if(map[i][j].name){
				chessboard.putTile(map[i][j].tile, map[i][j].x, map[i][j].y,layer2);
			}
}

function action(){
	var x=Math.floor(game.input.x/128);
	var y=Math.floor(game.input.y/128);
	if(!selected&&map[x][y].name){
		selected=map[x][y];
		console.log("In");
	}
	else
		moveTo(x,y);

}

function moveTo(x,y){
	chessboard.removeTile(selected.x,selected.y,layer2);
	selected.x=x;
	selected.y=y;
	map[x][y]=selected;
	chessboard.putTile(map[x][y].tile, map[x][y].x, map[x][y].y,layer2);
	console.log(map[x][y]);
	console.log(selected);
	selected=0;
}