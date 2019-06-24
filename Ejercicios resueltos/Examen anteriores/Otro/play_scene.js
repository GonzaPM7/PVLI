'use strict';

var BallScript = require('./ball.js');

  var PlayScene = {
  create: function () {
    this.nColisiones = 7;
    this.tiempo = 30;
    this.mensaje = "";
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.balls = [];
    this.gameEnded = false;

    this.audio1 = this.game.add.audio('audio1');
    this.audio2 = this.game.add.audio('audio2');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Primera bola
    var ball = new Ball(this.game, 'balls', {x: 100, y: 100});
    this.balls.push(ball);
    this.game.add.existing(ball);

    // Player
    this.player = this.game.add.sprite(400, 300, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.immovable = true;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('idle', [2, 3], 2, true);
    this.player.animations.add('walk', [0, 1, 2, 3], 5, false);
    this.player.animations.play("idle");

    // Timer
    this.game.time.events.repeat(Phaser.Timer.SECOND, this.tiempo, this.updateTime, this);
  },

  update: function() {
    if (!this.player.animations._anims.walk.isPlaying) {
      this.player.animations.play("idle");
    }
    
    this.checkInput();
    this.game.physics.arcade.collide(this.player, this.balls, this.divideBall);
  },

  render: function() {
    this.game.debug.text("Quedan " + this.nColisiones + " colisiones y " + this.tiempo + " segundos",
     30, 45, 'rgba(0, 0, 0)', '20px Courier');
    this.game.debug.text(this.mensaje, 50, 500, 'rgba(0, 0, 0)', '100px Courier');
  },

  checkInput: function() {
    PlayScene.player.body.velocity.setTo(0);
    
    if(!PlayScene.gameEnded) {
      if (PlayScene.cursors.left.isDown)
      {
        PlayScene.player.body.velocity.x = -200;
        PlayScene.player.animations.play("walk");
      }
      else if (PlayScene.cursors.right.isDown)
      {
        PlayScene.player.body.velocity.x = 200;
        PlayScene.player.animations.play("walk");
      }
  
      if (PlayScene.cursors.up.isDown)
      {
        PlayScene.player.body.velocity.y = -200;
        PlayScene.player.animations.play("walk");
      } else if (PlayScene.cursors.down.isDown)
      {
        PlayScene.player.body.velocity.y = 200;
        PlayScene.player.animations.play("walk");
      }
    }

    if(PlayScene.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && PlayScene.gameEnded) {
      PlayScene.game.state.start('play');
    }
  },

  divideBall: function(player, ball) {
    PlayScene.nColisiones--;
    if (PlayScene.nColisiones == 0) {
      PlayScene.mensaje = "Has ganado";
      PlayScene.endGame();
    }

    if (ball.nCollisions != 2) {
      ball.nCollisions++;
      ball.scale.setTo(ball.scale.x / 2, ball.scale.y / 2);
      var newPosition = {x: ball.position.x + ball.body.velocity.x/5, y: ball.position.y + ball.body.velocity.y/5};
      var newBall = new Ball(PlayScene.game, 'balls', newPosition);
      newBall.scale.setTo(ball.scale.x, ball.scale.y);
      newBall.nCollisions = ball.nCollisions;
      newBall.body.velocity.setTo(ball.body.velocity.x, -ball.body.velocity.y);
      PlayScene.balls.push(newBall);
      PlayScene.game.add.existing(newBall);
      PlayScene.audio2.play()
      ball.animations.play("divide");
    } else {
      ball.animations.play("explode");
      ball.destroy();
      PlayScene.audio1.play()
    }
  },

  updateTime: function() {
    if (!PlayScene.gameEnded) {
      this.tiempo--;
      if (this.tiempo == 0) {
        this.mensaje = "Has perdido";
        PlayScene.endGame();
        for (var i = 0; i < this.balls.length; i++) {
          this.balls[i].body.velocity.setTo(0);
        }
      }
    }
  },

  endGame: function() {
    this.gameEnded = true;
  }
};

module.exports = PlayScene;
