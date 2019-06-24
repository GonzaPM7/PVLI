'use strict';

var PlatformScript = require('./platform.js');
var PlayerScript = require('./player.js');
var StarScript = require('./star.js');

  var PlayScene = {
  create: function () {
    this.game.add.sprite(0, 0, 'sky');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Platform
    this.platforms=[];

    this.platform=new Platform(this.game,'platform',{x:100,y:400});    
    this.platform.scale.setTo(0.5,1);
    this.platforms.push(this.platform);
    this.game.add.existing(this.platform);

    this.platform=new Platform(this.game,'platform',{x:500,y:400});    
    this.platform.scale.setTo(0.5,1);
    this.platforms.push(this.platform);
    this.game.add.existing(this.platform);

    this.platform=new Platform(this.game,'platform',{x:300,y:250});    
    this.platform.scale.setTo(0.5,1);
    this.platforms.push(this.platform);
    this.game.add.existing(this.platform);

    //Player
    this.player=new Player(this.game,'player',{x:50,y:500});
    this.game.add.existing(this.player);
    this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Star
    this.stars=[];

    this.star=new Star(this.game, 'star',{x:200, y:350});
    this.stars.push(this.star);
    this.game.add.existing(this.star);

    this.star=new Star(this.game, 'star',{x:600, y:350});
    this.stars.push(this.star);
    this.game.add.existing(this.star);

    this.star=new Star(this.game, 'star',{x:380, y:150});
    this.stars.push(this.star);
    this.game.add.existing(this.star);

    //Audio
    this.salto=this.game.add.audio('salto');
    this.hit=this.game.add.audio('hit');

    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    this.scoretext = this.game.add.text(0, 0, "Puntación: "+ this.player.points, this.style);
  },
  update:function(){
    this.hitPlatform = this.game.physics.arcade.collide(this.player,this.platforms);
    this.game.physics.arcade.overlap(this.player,this.stars,this.dado,null,this);

    if (this.space.isDown && (this.hitPlatform || this.player.body.onFloor()))
    {
      this.player.body.velocity.y = -350;
      this.salto.play();
    }
  },
  dado:function(player,star){    
    star.destroy();
    this.hit.play();
    player.points++;
    this.scoretext.setText("Puntación: "+player.points);
  }
};

module.exports = PlayScene;
