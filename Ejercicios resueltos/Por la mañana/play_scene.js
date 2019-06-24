'use strict';

  var PlayScene = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.sprite(0,0,'sky');

    this.player=this.game.add.sprite(0,0,'player');
    this.game.physics.enable(this.player,Phaser.Physics.ARCADE);
    this.player.body.gravity.y = 300;
    this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('move',[0,1,2,3],10,false);
    this.player.animations.add('stop',[5,6,7,8],10,true);

    this.cursor=this.game.input.keyboard.createCursorKeys();

    this.stars=this.game.add.group();

    this.star=this.stars.create(400,400,'star');
    this.game.physics.enable(this.star,Phaser.Physics.ARCADE);
    this.star.body.gravity.y = 300;
    this.star.body.collideWorldBounds = true;
    

    
  },
  update:function(){
    this.game.physics.arcade.collide(this.player, this.star);
    this.player.body.velocity.y=0;
    this.player.body.velocity.x=0;
    this.star.body.velocity.x=0;
  
    if(!this.player.animations._anims.move.isPlaying){
      this.player.animations.play('stop');
    }
    
    if(this.cursor.up.isDown){
      this.player.body.velocity.y=-150;
      this.player.animations.play('move');
    }
    if(this.cursor.down.isDown){
      this.player.body.velocity.y=150;      
      this.player.animations.play('move');
    }
    if(this.cursor.left.isDown){
      this.player.body.velocity.x=-150;      
      this.player.animations.play('move');
    }
    if(this.cursor.right.isDown){
      this.player.body.velocity.x=150;
      this.player.animations.play('move');
    }
  
  }
};

module.exports = PlayScene;
