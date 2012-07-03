//定数
var FPS = 32;
enchant();
window.onload = function() {
	//ゲームオブジェクトの生成
	var game  = new Game(320, 320);
	game.fps = FPS;
	game.score = 0;
	var balloon;
	//画像の読み込み
	game.preload("images/balloon1.gif",
	"images/sora.png","images/effect0.gif");
	//サウンドの読み込み
	game.se = Sound.load("SE/pan.wav");

	//爆発エフェクト
var Blast = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y){
	enchant.Sprite.call(this,16,16);
	this.x = x;
	this.y = y;
	this.scaleX = 2;
	this.scaleY = 2;
	this.image = game.assets["images/effect0.gif"];
	this.time = 0;
	//アニメーションの遅れ
	this.duration = 5;
	this.frame = 0;
	
	this.addEventListener('enterframe', function(){
	    this.time++;
	    //爆発アニメーション
	    this.frame = Math.floor(this.time/this.duration *5);
	    if(this.time == this.duration)this.remove();
	});
	game.rootScene.addChild(this);
   },
    remove: function(){
        game.rootScene.removeChild(this);
    }
});
	//ロード完了時に呼ばれる	
	game.onload = function() {
	//背景の生成
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

	//ラベルの生成
	label = new Label("");
	game.rootScene.addChild(label);
	
	//風船の追加
	game.addballoon = function(x){
		var balloon = new Sprite(32, 32);
		balloon.image = game.assets["images/balloon1.gif"];
		balloon.x = x;
		balloon.y = 320;
		balloon.speed =Math.floor(Math.random() * 20);
		game.rootScene.addChild(balloon);
		//風船の定期処理
		balloon.addEventListener(Event.ENTER_FRAME, function(e){
			balloon.y -= balloon.speed;
			//画面外に風船が出てしまったら
			if(balloon.y < 0){
				game.rootScene.removeChild(balloon);
			}
		});
		//風船がタッチされた時
		balloon.addEventListener(Event.TOUCH_START, function(e){
			//爆発する
			var blast = new Blast(e.x,e.y);
			//サウンドの再生
			game.se.play();
			//スコアの追加
			game.score+=100;
			//風船の消失
			game.rootScene.removeChild(balloon);
		});	
	};
};	
	//シーンの定期処理
	//制限時間
	game.tick = FPS * 30;
	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		game.tick--;
		//制限時間がまだ有るならば
		if(game.tick > 0){
			//8フレーム毎に風船を出現させる
			if((game.tick % 8) === 0){
				//風船のx座標はランダム
				var x = Math.floor(Math.random() *280);
				game.addballoon(x);
			}
			label.text = "残り時間:" + Math.floor(game.tick /FPS) +
				"<BR>スコア:" + game.score;
		} else if(game.tick === 0) {
			//ゲームオーバー画面の表示
			game.end(game.score, "あなたのスコアは" + game.score);			
		}
	});
	
	//ゲームの開始
	game.start();
};
//乱数生成
function rand(num){
	return Math.floor(Math.random() * num);	
}