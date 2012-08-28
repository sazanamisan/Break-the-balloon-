//定数
var FPS = 60;
var Blast_IMG = "images/effect0.gif";
var BAL_IMG = "images/balloons.gif";
var SE = "SE/pan.wav";
var BACK_IMG = "images/sora.jpg";
var BAL_SIZE = 32;
var SPRITE_WIDTH  = 320;
var SPRITE_HEIGHT = 320;
enchant('draw', 'nineleap');

window.onload = function() {
	//ゲームオブジェクトの生成
	var game  = new Game(320, 320);
	game.fps = 60;
	game.time = 60;
	game.score = 0;
	var label;
	var rate = 0.0;
	
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
			this.duration =20;
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
			this.duration = 20;
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
		   this.scaleX = 0.8;
		   this.scaleY = 0.8;
		   this.count = 0;
		   this.anp = 0.4;
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
                game.scoreText.drawScore(game.score);
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
                this.x -= 0.4;
                }
                if(this.y < 120){
                this.x += 1.0;
                }
                if(this.y < 50){
                this.x -= 1.5;
                }
                this.y -= this.speed;
                
                
            });
            this.addEventListener(Event.TOUCH_START, function (e) {
                //爆発する
                blast = new Blast1(e.x, e.y);
                //サウンドの再生
                var se = game.assets["SE/pan.wav"].clone();
                se.play();
                //スコアの追加
                game.score += this.addscore;
                game.scoreText.drawScore(game.score);

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
	//背景
		var bg = new Sprite(320, 320);
		bg.image=game.assets[BACK_IMG];
		game.rootScene.addChild(bg);
	//ラベル
		label = new Label("");
		label.x = 120;
		label.y = 0;
		game.scoreText = new Text(110, 30, "score:"+game.score);
		game.scoreText.drawScore = function(score){
			game.scoreText.draw("score:"+score);
		}
        game.scoreText.drawScore(0);
      //game.rootScene.addChild(game.scoreText);
		game.rootScene.addChild(label);
		
		//制限時間
		var scene = game.rootScene;
		var sprite = new Sprite(320, 320);
		var surface = new Surface(320, 320);
		var game_width = game.width;
		var game_height = game.height;
		var gauge_hmargin = 5;
		var gauge_vmargin = 5;
		var gauge_width = 20;
		var gauge_height = 20;
		var cutoff_width = 100;
		//
		var segment_length_arr = [
			(game_width - cutoff_width - gauge_hmargin*2)/2,
			(game_height - gauge_height - gauge_vmargin*2),
			(game_width - gauge_width - gauge_hmargin*2),
			(game_height - gauge_height - gauge_vmargin*2),
			((game_width - gauge_hmargin *2 - cutoff_width)/2 - gauge_width)
		];
		//
		var segment_start_arr = [];
		var segment_start_rate_arr = [0];
		//
		var segment_length_total = 0;
		for(var i = 0; i < segment_length_arr.length; i++){
			segment_length_total += segment_length_arr[i];
			segment_start_arr.push(segment_length_total);
		}
		//
		var segment_rate_total = 0;
		for(var i = 0; i < segment_length_arr.length; i++){
			var segment_start_rate = segment_start_arr[i] / segment_length_total;
			segment_start_rate_arr.push(segment_start_rate);
		}
		//
		var indicator_length = segment_length_total * rate;
		//
		var gauge_draw_arr = [
			function(rate){
				var segment_rate =　rate / segment_start_rate_arr[1];
				segment_rate = (segment_rate < 0) ? 0 : ((1 < segment_rate) ? 1 : segment_rate);
				var w = (game_width - gauge_hmargin * 2 - cutoff_width) / 2;
				surface.context.fillRect(gauge_hmargin + w * (1 - segment_rate), gauge_vmargin, w * segment_rate, gauge_height);
			},
			function(rate){
				var segment_rate =　(rate - segment_start_rate_arr[1]) / (segment_start_rate_arr[2] - segment_start_rate_arr[1]);
                segment_rate = (segment_rate < 0) ? 0 : ((1 < segment_rate) ? 1 : segment_rate);
				var h = game_height - gauge_vmargin * 2 - gauge_height;
				surface.context.fillRect(gauge_hmargin, gauge_height + gauge_vmargin, gauge_width, h * segment_rate);		
			},
			function(rate){
				var segment_rate =　(rate - segment_start_rate_arr[2]) / (segment_start_rate_arr[3] - segment_start_rate_arr[2]);
                segment_rate = (segment_rate < 0) ? 0 : ((1 < segment_rate) ? 1 : segment_rate);
				var w = game_width - gauge_hmargin * 2 - gauge_width;
				surface.context.fillRect(gauge_width + gauge_hmargin, game_height - gauge_vmargin - gauge_height, w * segment_rate, gauge_height);
			},
			function(rate){
				var segment_rate =　(rate - segment_start_rate_arr[3]) / (segment_start_rate_arr[4] - segment_start_rate_arr[3]);
                segment_rate = (segment_rate < 0) ? 0 : ((1 < segment_rate) ? 1 : segment_rate);
				var h = game_height - gauge_vmargin * 2 - gauge_height;
				surface.context.fillRect(game_width - gauge_hmargin - gauge_width, gauge_vmargin + h * (1 - segment_rate), gauge_width, h * segment_rate);
			},
			function(rate){
				var segment_rate =　(rate - segment_start_rate_arr[4]) / (segment_start_rate_arr[5] - segment_start_rate_arr[4]);
                segment_rate = (segment_rate < 0) ? 0 : ((1 < segment_rate) ? 1 : segment_rate);
				var w = (game_width - gauge_hmargin * 2 - cutoff_width) / 2 - gauge_width;
				surface.context.fillRect(game_width - gauge_hmargin - gauge_width - w * segment_rate, gauge_vmargin, w * segment_rate, gauge_height);
			}
		];
		//		
		sprite.image = surface;
		scene.addChild(sprite);
		sprite.addEventListener(Event.ENTER_FRAME, function(){
			if(rate <= 1.0){
				surface.context.fillStyle = 'rgb(0, 255, 180)';
				for(var i = 0; i < segment_start_arr.length; i++){
					if(segment_start_rate_arr[i] <= rate){
						gauge_draw_arr[i](rate);
					}
				}
			}
			if(rate < 1.0){
				rate += 0.01;
			}else{
				rate = 1.0;
			}
		});
	}
	//シーンの定期処理
	game.tick = game.fps * game.time;
	game.rootScene.addEventListener(Event.ENTER_FRAME, function(){
		game.tick--;
		
		
		//制限時間がまだ有るならば
		if(game.tick > 0){
			//30フレーム毎に風船を出現させる
			if((game.tick % 80) === 0){
				//風船のx座標はランダム
				var x = Math.floor(Math.random() * 200) + 1;
                	var k = Math.floor(Math.random() * 5) + 1;
                	new BALLOON1(x, k);
                	var y = Math.floor(Math.random() * 280) + 1;
                	var l = Math.floor(Math.random() * 5) + 1;
                	new BALLOON2(y, l);
			}
			label.text =  "<BR>制限時間:" + Math.floor(game.tick / game.time) + "</br> スコア：" + game.score;
		//ゲームオーバー	
		}else if(game.tick === 0){
			label.text = "残り時間:" + "0"+"<BR>スコア:" + game.score;
			game.end(game.score, "あなたのスコアは" + game.score + "です。");
		}
	});
	
	//ゲームの開始
	game.start();
};
//乱数生成
function rand(num){
	return Math.floor(Math.random() * num);	
}