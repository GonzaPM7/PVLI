'use strict';

  var PlatformsScript = require('./platform.js');
  var StarScript = require('./star.js');

  var background;
  var player;
  var suelo;
  var cursors;
  var hitPlatform;
  
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
    this.player = this.game.add.sprite (32, this.game.world.height - 150, 'dude');
    this.game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2; //rebote al colisionar
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;

    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    //ESTRELLAS
    this.stars = [];
    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = new Star(this.game,'star',{x:i * 70,y:0});
        this.stars.push(star);
        this.game.add.existing(star);

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    //CURSOR
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //Text
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    this.scoretext = this.game.add.text(0, 0, "Puntación: "+ this.puntacion, this.style);
  },
  
  update: function () {
    
    this.hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.stars, this.platforms);
    this.game.physics.arcade.collide(this.player, this.stars, this.collectStar);
    
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right');
    }
    else
    {
        //  Stand still
        this.player.animations.stop();

        this.player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.hitPlatform)
    {
      this.player.body.velocity.y = -350;
    }
  },

  collectStar: function(player, star) {
    
    // Removes the star from the screen
    PlayScene.puntacion++;
    star.live=false;
    star.destroy();
    PlayScene.scoretext.setText("Puntación: "+PlayScene.puntacion);
    var num=0;
    for (var i = 0; i < 12; i++)
    {
        if(PlayScene.stars[i].live==false){
          num++;
        }
    }
    if(num==12)
    PlayScene.game.state.start('play');
  }
};

module.exports = PlayScene;
