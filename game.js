//定数
var FPS = 32;
var Blast_IMG = "images/effect0.gif";
var BAL_IMG = "images/balloons.gif";
var SE = "SE/pan.wav";
var BACK_IMG = "images/sora.png";
var BAL_SIZE = 32;

enchant();

window.onload = function() {
	//ゲームオブジェクトの生成
	var game  = new Game(320, 320);
	game.fps = FPS;
	game.score = 0;
	//画像、SEの読み込み
	game.preload(BAL_IMG, BACK_IMG, Blast_IMG,SE);

	//爆発エフェクト
	var Blast1 = enchant.Class.create(enchant.Sprite, {
    	initialize: function(x, y){
			enchant.Sprite.call(this,16,16);
			this.x = x -2;
			this.y = y -2;
			this.scaleX = 2;
			this.scaleY = 2;
			this.image = game.assets[Blast_IMG];
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
	//爆発エフェクト
	var Blast2 = enchant.Class.create(enchant.Sprite, {
    	initialize: function(x, y){
			enchant.Sprite.call(this,16,16);
			this.x = x -2;
			this.y = y -2;
			this.scaleX = 0.9;
			this.scaleY = 0.9;
			this.image = game.assets[Blast_IMG];
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
	
	BALLOON1 = enchant.Class.create(enchant.Sprite, {
        initialize: function (_x, type) {
            enchant.Sprite.call(this, BAL_SIZE, BAL_SIZE);
            this.x = _x; this.y = 320;
            this.image = game.assets[BAL_IMG];
            this.frame = bal[type].color;
            this.addscore = bal[type].score;
            this.addtime = bal[type].time * game.fps;
            this.speed = bal[type].speed;
		   this.opacity = 0.6;
		   this.scaleX = 0.5;
		   this.scaleY = 0.5;
		   this.count = 0;
		   this.anp = 1;
            this.addEventListener(Event.ENTER_FRAME, function () {
                this.x += this.anp * Math.sin(this.count/12);
                	if(this.y < 200){
                	this.x -= 1;
                	}
                	if(this.y < 150){
                	this.x -= 3;
                	}
                this.y -= this.speed;
                //画面外に風船が出てしまったら
                if (this.y < 0) this.remove();
                this.count++;
            });
            this.addEventListener(Event.TOUCH_START, function (e) {
                //爆発する
                blast = new Blast2(e.x, e.y);
                //サウンドの再生
                var se = game.assets["SE/pan.wav"].clone();
                se.play();
                //スコアの追加
                game.score += this.addscore;
                //タイムの増減
                game.tick += this.addtime;
                //風船の消失
                this.remove();
            });
            game.rootScene.addChild(this);
        },
        remove: function () {
            game.rootScene.removeChild(this);
        }
    });
    
    BALLOON2 = enchant.Class.create(enchant.Sprite, {
        initialize: function (_x, type1) {
            enchant.Sprite.call(this, BAL_SIZE, BAL_SIZE);
            this.x = _x; this.y = 320;
            this.image = game.assets[BAL_IMG];
            this.frame = bal2[type1].color;
            this.addscore = bal2[type1].score;
            this.addtime = bal2[type1].time * game.fps;
            this.speed = bal2[type1].speed;
		   this.scaleX = 1.5;
		   this.scaleY = 1.5;
            this.addEventListener(Event.ENTER_FRAME, function () {
                this.y -= this.speed;
                //画面外に風船が出てしまったら
                if (this.y < 0) this.remove();
            });
            this.addEventListener(Event.TOUCH_START, function (e) {
                //爆発する
                blast = new Blast1(e.x, e.y);
                //サウンドの再生
                var se = game.assets["SE/pan.wav"].clone();
                se.play();
                //スコアの追加
                game.score += this.addscore;
                //タイムの増減
                game.tick += this.addtime;
                //風船の消失
                this.remove();
            });
            game.rootScene.addChild(this);
        },
        remove: function () {
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
	};
	//シーンの定期処理
	//制限時間
	game.tick = FPS * 30;
	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		game.tick--;
		//制限時間がまだ有るならば
		if(game.tick > 0){
			//25フレーム毎に風船を出現させる
			if((game.tick % 25) === 0){
				//風船のx座標はランダム
				var x = Math.floor(Math.random() * 280) + 1;
                	var k = Math.floor(Math.random() * 5) + 1;
                	new BALLOON1(x, k);
                	var y = Math.floor(Math.random() * 280) + 1;
                	var l = Math.floor(Math.random() * 5) + 1;
                	new BALLOON2(y, l);
			}
			label.text = "残り時間:" + Math.floor(game.tick /FPS) +
				"<BR>スコア:" + game.score;
		} else if(game.tick < 0) {
			//ゲームオーバー画面の表示
			label.text = "残り時間:" + "0"+"<BR>スコア:" + game.score;
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