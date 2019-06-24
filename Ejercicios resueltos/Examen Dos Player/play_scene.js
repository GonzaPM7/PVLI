'use strict';

  var PlatformsScript = require('./platform.js');
  var PlayerScript = require('./player.js');

  
  var PlayScene = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.puntacion=0;

    this.background=this.game.add.sprite(0,0,'sky');

    //PLATAFORMAS//  
    this.platforms = [];

    var platform=new Platform(this.game,'ground',{x:0,y:this.game.world.height - 64});    
    this.platforms.push(platform);
    this.game.add.existing(platform);
    platform.scale.setTo(2,2);

    var platform = new Platform(this.game,'ground',{x:400,y:400});
    this.platforms.push(platform);
    this.game.add.existing(platform);

    var platform = new Platform(this.game,'ground',{x:-150,y:250});
    this.platforms.push(platform);
    this.game.add.existing(platform);

    //JUGADOR//
    this.player=new Player(this.game,'dude',{x:32,y:this.game.world.height - 150},5);    
    this.game.add.existing(this.player);

    this.player2=new Player(this.game,'dude',{x:400,y:this.game.world.height - 150},10);    
    this.game.add.existing(this.player2);
    
    //CURSOR
    this.left=this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.right=this.game.input.keyboard.addKey(Phaser.Keyboard.L);
    this.up=this.game.input.keyboard.addKey(Phaser.Keyboard.I);

    this.left2=this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.right2=this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.up2=this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    //Text
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    this.scoretext = this.game.add.text(0, 0, "Player 1: "+ this.player.live, this.style);
    this.scoretext2 = this.game.add.text(500, 0, "Player 2: "+ this.player2.live, this.style);

    this.c=false;
    this.timer=this.game.time.create(false);
  },
  render: function(){
    this.scoretext.setText("Player 1: "+ this.player.live);
    this.scoretext2.setText("Player 2: "+ this.player2.live);
  },
  update: function () {
    
    this.hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    this.hitPlatform2 = this.game.physics.arcade.collide(this.player2, this.platforms);  
    this.game.physics.arcade.collide(this.player, this.player2,this.colision,null,this); 

    this.handlevent(this.left,this.up,this.right,this.player,this.hitPlatform);
    this.handlevent(this.left2,this.up2,this.right2,this.player2, this.hitPlatform2);
    //  Allow the player to jump if they are touching the ground.
    
  },
  handlevent: function(left,up,right,player,hitPlatform) { 
    if(!this.c){
      player.body.velocity.x = 0;
      if(left.isDown){
        player.body.velocity.x = -150;
        player.animations.play('left');
      }
      else if(right.isDown){
        player.body.velocity.x = 150;
        player.animations.play('right');
      }
      else
      {
        player.animations.stop();
        player.frame = 4;
      }
      if(up.isDown && hitPlatform){
        player.body.velocity.y = -350;
      }
    }
    
  },
  colision: function (){
    this.player.live--;
    this.player2.live--;
    this.c=true;    
    this.timer.add(1000,this.Clock,this);
    this.timer.start();
    if(this.player.position.x<this.player2.position.x){
      this.player.body.velocity.y = -150;
      this.player.body.velocity.x = -150;
      this.player2.body.velocity.y = -150;
      this.player2.body.velocity.x = 150;
    }
    else{
      this.player.body.velocity.y = -150;
      this.player.body.velocity.x = +150;
      this.player2.body.velocity.y = -150;
      this.player2.body.velocity.x = -150;
    }
  },
  Clock: function(){
    this.c=false;
    console.log("Hola");
    this.timer.stop();
  } 
};

module.exports = PlayScene;
