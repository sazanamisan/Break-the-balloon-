enchant();

var SPRITE_WIDTH  = 200;
var SPRITE_HEIGHT = 200;

window.onload = function() {
    var game = new Game();
    
    game.onload = function() {
	var scene = game.rootScene;
	scene.backgroundColor = "black";
	
	// スプライト生成
	var sprite  = new Sprite(SPRITE_WIDTH, SPRITE_HEIGHT);	// スプライト生成
	var surface = new Surface(SPRITE_WIDTH, SPRITE_HEIGHT);	// サーフェス生成

	// canvas 描画
	surface.context.fillStyle = "white";
	surface.context.fillRect(0, 0, 100, 100);
	surface.context.fillStyle = "green";
	surface.context.fillRect(10, 10, 80, 80);
	
	sprite.image = surface;	// サーフェスを画像としてセット
	scene.addChild(sprite);	// シーンに追加
    };
    
    game.start();
};
