//定数
var FPS = 32;
var Blast_IMG = "images/effect0.gif";
var BAL_IMG = "images/balloons.gif";
var SE = "SE/pan.wav";
var BACK_IMG = "images/sora.png";
var GAGE_IMG = "images/gage.png";
var BAL_SIZE = 32;
var SPRITE_WIDTH  = 320;
var SPRITE_HEIGHT = 320;
enchant();

window.onload = function() {
	//ゲームオブジェクトの生成
	var game  = new Game(320, 320);
	game.fps = FPS;
	game.score = 0;
	//画像、SEの読み込み
	game.preload(BAL_IMG, BACK_IMG, Blast_IMG,SE,GAGE_IMG);
	
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
            this.x = _x; this.y = 280;
            this.image = game.assets[BAL_IMG];
            this.frame = bal[type].color;
            this.addscore = bal[type].score;
            this.addtime = bal[type].time * game.fps;
            this.speed = bal[type].speed;
		   this.opacity = 0.6;
		   this.scaleX = 0.5;
		   this.scaleY = 0.5;
		   this.count = 0;
		   this.anp = 0.8;
            this.addEventListener(Event.ENTER_FRAME, function () {
                this.x += this.anp * Math.sin(this.count/20);
                	if(this.y < 100){
                	this.x -= 1;
                	}
                	if(this.y < 10){
                	this.x -= 3;
                	}
                this.y -= this.speed;
                
                this.count++;
                //画面外に風船が出てしまったら
                if (this.y < 20) this.remove();
                
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
            this.x = _x; this.y = 280;
            this.image = game.assets[BAL_IMG];
            this.frame = bal2[type1].color;
            this.addscore = bal2[type1].score;
            this.addtime = bal2[type1].time * game.fps;
            this.speed = bal2[type1].speed;
		   this.scaleX = 1.2;
		   this.scaleY = 1.2;
            this.addEventListener(Event.ENTER_FRAME, function () {
                if(this.y < 220){
                this.x -= 0.5;
                }
                this.y -= this.speed;
                //画面外に風船が出てしまったら
                if (this.y < 20) this.remove();
                
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
	var scene = game.rootScene;
	//背景の生成
	var bg = new Sprite(320,320);
	var image = game.assets[GAGE_IMG];
	bg.image = image;
	game.rootScene.addChild(bg);
	// スプライト生成
	var sprite  = new Sprite(SPRITE_WIDTH, SPRITE_HEIGHT);
	var surface = new Surface(SPRITE_WIDTH, SPRITE_HEIGHT);

	// canvas 描画
	surface.context.fillStyle = 'rgb(80,210,225)';
	surface.context.fillRect(20, 20, 280, 280);
	
	surface.context.fillStyle = 'rgb(250,0,255)';
	surface.context.fillRect(0, 0, 120, 20);
	surface.context.fillStyle = 'rgb(50,0,255)';
	surface.context.fillRect(0, 20, 20, 300);
	surface.context.fillStyle = 'rgb(250,150,205)';
	surface.context.fillRect(20, 300, 320, 300);
	surface.context.fillStyle = 'rgb(150,0,255)';
	surface.context.fillRect(300, 0, 20, 300);
	surface.context.fillStyle = 'rgb(0,220,25)';
	surface.context.fillRect(200, 0, 100, 20);
	
	
	sprite.image = surface;	// サーフェスを画像としてセット
	scene.addChild(sprite);	// シーンに追加


	//ラベルの生成
	label = new Label("");
	label.x=120;
	label.y=-5;
	game.rootScene.addChild(label);
	};
	//シーンの定期処理
	//制限時間
	game.tick = FPS * 30;
	game.rootScene.addEventListener(Event.ENTER_FRAME, function() {
		game.tick--;
		
		
		//制限時間がまだ有るならば
		if(game.tick > 20){
			//30フレーム毎に風船を出現させる
			if((game.tick % 30) === 0){
				//風船のx座標はランダム
				var x = Math.floor(Math.random() * 200) + 1;
                	var k = Math.floor(Math.random() * 5) + 1;
                	new BALLOON1(x, k);
                	var y = Math.floor(Math.random() * 280) + 1;
                	var l = Math.floor(Math.random() * 5) + 1;
                	new BALLOON2(y, l);
			}
			label.text = "<BR>スコア:" + game.score;
		} else if(game.tick < 0) {
			//ゲームオーバー画面の表示
			label.text ="<BR>スコア:" + game.score;
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