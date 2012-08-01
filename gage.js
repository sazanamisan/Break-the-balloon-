enchant();

var SPRITE_WIDTH  = 200;
var SPRITE_HEIGHT = 200;

window.onload = function() {
    var game = new Game();
    
    game.onload = function() {
	var scene = game.rootScene;
	scene.backgroundColor = "black";
	
	// �X�v���C�g����
	var sprite  = new Sprite(SPRITE_WIDTH, SPRITE_HEIGHT);	// �X�v���C�g����
	var surface = new Surface(SPRITE_WIDTH, SPRITE_HEIGHT);	// �T�[�t�F�X����

	// canvas �`��
	surface.context.fillStyle = "white";
	surface.context.fillRect(0, 0, 100, 100);
	surface.context.fillStyle = "green";
	surface.context.fillRect(10, 10, 80, 80);
	
	sprite.image = surface;	// �T�[�t�F�X���摜�Ƃ��ăZ�b�g
	scene.addChild(sprite);	// �V�[���ɒǉ�
    };
    
    game.start();
};
