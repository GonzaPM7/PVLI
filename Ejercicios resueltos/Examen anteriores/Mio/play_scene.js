'use strict';

  var PlayScene = {
  create: function () {
    /*var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);*/

    this.game.physics.startSystem(Phaser.Physics.ARCADE);    
    this.game.stage.backgroundColor='rgb(250,244,227)';
    this.lose=false;
    this.win=false;

    //Paredes//
    this.bordeleft=this.add.sprite(0,0,'borde');
    this.bordeleft.scale.setTo(0.15,1.5);
    this.game.physics.enable(this.bordeleft,Phaser.Physics.ARCADE);    
    this.bordeleft.body.immovable=true;

    this.bordeup=this.add.sprite(0,0,'borde');
    this.bordeup.scale.setTo(2,0.15);
    this.game.physics.enable(this.bordeup,Phaser.Physics.ARCADE);    
    this.bordeup.body.immovable=true;

    this.borderight=this.add.sprite(800-60,0,'borde');
    this.borderight.scale.setTo(0.15,1.5);
    this.game.physics.enable(this.borderight,Phaser.Physics.ARCADE);    
    this.borderight.body.immovable=true;

    this.bordedown=this.add.sprite(0,600-60,'borde');
    this.bordedown.scale.setTo(2,0.15);
    this.game.physics.enable(this.bordedown,Phaser.Physics.ARCADE);    
    this.bordedown.body.immovable=true;    

    //Bola//
    this.ball=this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bola');
    this.ball.scale.setTo(0.15,0.15);
    this.game.physics.enable(this.ball,Phaser.Physics.ARCADE);   
    this.ball.body.velocity.setTo(200,200);
    this.ball.body.collideWorldBounds=true;
    this.ball.body.bounce.set(1);

    //Jugador//
    this.player=this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'player');//this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'cruz');
    //this.player.scale.setTo(0.05,0.05);
    this.player.animations.add('diamond',[0,1,2,3,4,5,6,7,8], 7, true);
    this.player.animations.play('diamond');
    this.game.physics.enable(this.player,Phaser.Physics.ARCADE);  
    this.player.body.checkCollision=false; 

    //Teclas
    this.cursors=this.game.input.keyboard.createCursorKeys();
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //HUD
    this.segundos=30;
    this.colisiones=5;
    this.time=this.game.add.text(0,0,'Quedan ' + this.colisiones + ' colisiones y '+ this.segundos+ ' segundos',{ font: "12px Arial", fill: "#ffffff", align: "center" });    
    this.game.time.events.loop(Phaser.Timer.SECOND,this.Clock,this);


  },
  update:function() {
    this.Colision();
    
    this.Animation(); 

    if(!this.lose || !this.win)
      this.handleEvents();
      
    this.END();
    
  },

  Colision : function(){
    //Paredes vs Bola
    this.game.physics.arcade.collide(this.ball, this.borderight);
    this.game.physics.arcade.collide(this.ball, this.bordeleft);
    this.game.physics.arcade.collide(this.ball, this.bordeup);
    this.game.physics.arcade.collide(this.ball, this.bordedown);

    //Paredes vs Player
    this.game.physics.arcade.collide(this.player, this.borderight);
    this.game.physics.arcade.collide(this.player, this.bordeleft);
    this.game.physics.arcade.collide(this.player, this.bordeup);
    this.game.physics.arcade.collide(this.player, this.bordedown);

    //Player vs Bola
    this.game.physics.arcade.collide(this.ball,this.player,this.collisionCallback,null,this);
  },

  handleEvents: function(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -250;        
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 250;        
    }
    else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -250;        
    }
    else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 250;
    }
  },

  Animation: function(){
    if(this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0)
      this.player.animations.stop('diamond');
    else{
      this.player.animations.play('diamond');
    }
  },

  Clock:function(){
    if(!this.lose && !this.win){
      this.segundos--;
      this.time.setText('Quedan ' +this.colisiones+ ' colisiones y '+ this.segundos+ ' segundos');
    }
    if(this.segundos==0){
      this.lose=true;
    }    
  },

  Reset:function(){
    if (this.space.isDown)
    {
      this.game.state.start('play');
    }
  },

  collisionCallback: function(){
    this.colisiones--;
    this.time.setText('Quedan ' +this.colisiones+ ' colisiones y '+ this.segundos+ ' segundos');
    if(this.colisiones==0){
      this.win=true;
    }
  },
  
  END: function(){
    if(this.lose || this.win){
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;

      this.ball.body.velocity.setTo(0,0);
      if(this.lose)
        this.gameOver=this.add.sprite(this.game.world.centerX-200, this.game.world.centerY-200, 'perder');
      else
        this.gameOver=this.add.sprite(this.game.world.centerX-200, this.game.world.centerY-200, 'ganar');
      this.Reset();
    }
  }
};

module.exports = PlayScene;
