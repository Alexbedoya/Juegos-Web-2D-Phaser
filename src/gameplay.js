var AMOUNT_DIAMONDS = 30;

GamePlayManager = {
    init:function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  // ajusta la imagen a la pantalla
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        this.flagFirstMouseDown = false;
    },
    preload:function(){
        game.load.image('background', 'assets/images/background.png'); //carga la imagen
        game.load.spritesheet('horse', 'assets/images/horse.png', 84, 156, 2);
        game.load.spritesheet('diamonds', 'assets/images/diamonds.png', 81, 84, 4);
    },
    create:function(){
        game.add.sprite(0, 0, 'background'); //pone la imagen en el lienzo
        this.horse = game.add.sprite(0, 0, 'horse');
        this.horse.frame = 0;
        this.horse.x = game.width/2;
        this.horse.y = game.height/2;
        //this.horse.anchor.setTo(0.5,0.5); 
        /*this.horse.angle = 15; //grado de inclinacion
        this.horse.scale.setTo(1,2);
        this.horse.alpha = 0.5; //opacidad de la imagen*/
        game.input.onDown.add(this.onTap, this);
        
        this.diamonds = [];
        for(var i=0; i<AMOUNT_DIAMONDS; i++){
            var diamond = game.add.sprite(100,100, 'diamonds'); 
            diamond.frame = game.rnd.integerInRange(0,3);
            diamond.scale.setTo(0.30 + game.rnd.frac());
            diamond.anchor.setTo(0.5);
            diamond.x = game.rnd.integerInRange(50, 1050);
            diamond.y = game.rnd.integerInRange(50, 600);
        }
    },
    onTap:function(){
        this.flagFirstMouseDown = true;
    },
    update:function(){
        //this.horse.angle += 1; 
        if(this.flagFirstMouseDown){
            var pointerX = game.input.x;
            var pointerY = game.input.y;
    
            var distX = pointerX - this.horse.x;
            var distY = pointerY - this.horse.y;
    
            if(distX > 0){
                this.horse.scale.setTo(1,1);
            }else{
                this.horse.scale.setTo(-1,1);
            }
            
            this.horse.x += distX * 0.02;
            this.horse.y += distY * 0.02;
        }
    }
}

var game = new Phaser.Game(1136, 640, Phaser.CANVAS);

//game.state.add("gameplay", GamePlayManager);
game.state.add('gameplay', GamePlayManager);
game.state.start('gameplay');

