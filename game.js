//定数
var FPS = 16;


enchant();


window.onload = function() {
	var game  = new Game(320, 320);
	game.fps = FPS;
	game.preload("images/maru.gif",
	"images/sora.png");
	var score = 0; 
	var label;
	var bear;
			ScoreLabel = Class.create(Label,{
			initialize:function(x,y){
				enchant.Label.call(this,"SCORE:0");
				this.x =x;
				this.y =y;
				this.score = 0;
			},
			//スコアを加算
			add:function(pts){
				this.score+=pts;
				//表示を修正
				this.text= "SCORE: "+this.score;
			}
		});
	game.onload = function() {
		
	scoreLabel=new ScoreLabel(5, 5);
		
	var bg = new Sprite(320,320);
	var maptip = game.assets["images/sora.png"];
	var image = new Surface(320,320);
	for (var j = 0; j < 320; j += 16) {
		for (var i = 0; i < 320; i += 16) {
			image.draw(maptip, 0, 0, 16, 16, i, j, 16, 16);
		}
	}
	bg.image = image;
	game.rootScene.addChild(bg);
};
	
	label = new Label("");
	game.rootScene.addChild(label);
	
	//熊の追加
	game.addBear = function(x){
		var bear = new Sprite(32, 32);
		bear.image = game.assets["images/maru.gif"];
		bear.x = x;
		bear.y = 320;
		bear.speed =Math.floor(Math.random() * 20);
		bear.frame = 4;
		game.rootScene.addChild(bear);
		//熊の定期処理
		bear.addEventListener(Event.ENTER_FRAME, function(e){
			bear.y -= bear.speed;
			//画面外に熊が出てしまったら
			if(bear.y < 0){
				game.rootScene.removeChild(bear);
			}
		});
		//熊がタッチされた時
		bear.addEventListener(Event.TOUCH_START, function(){
			//得点追加
			scoreLabel.add(100);
			
			game.rootScene.removeChild(bear);
		});	
	};
	
	//シーンの定期処理
	//制限時間
	game.tick = FPS * 20;
	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		game.tick--;
		//制限時間がまだ有るならば
		if(game.tick > 0){
			//10フレーム毎に熊を出現させる
			if((game.tick % 8) === 0){
				//熊のx座標はランダム
				var x = Math.floor(Math.random() *280);
				game.addBear(x);
			}
			label.text = "残り時間:" + Math.floor(game.tick /FPS) +
				"<BR>スコア:" + game.score;
		}else if(game.tick === 0){
			game.end(game.score, "あなたのスコアは" + game.score);
			
		}
		game.rootScene.addChild(scoreLabel);
	});
	game.start();
};
//乱数生成
function rand(num){
	return Math.floor(Math.random() * num);	
}