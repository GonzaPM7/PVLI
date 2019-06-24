'use strict';

  var BordeScript = require('./borde.js');
  var BallScript = require('./ball.js');
  
  var PlayScene = {
  create: function () {

    this.game.stage.backgroundColor='rgb(200,200,200)';

    //Variables
    this.colisiones=7;

    //Plataformas//
    this.bordes = [];

    var borde=new Borde(this,'borde',{x:0, y:0});
    this.bordes.push(borde);
    borde.scale.setTo(2,0.15);
    this.game.add.existing(borde);

    var borde=new Borde(this,'borde',{x:0, y:0});
    this.bordes.push(borde);
    borde.scale.setTo(0.15,1.5);
    this.game.add.existing(borde);

    var borde=new Borde(this,'borde',{x:800-60, y:0});
    this.bordes.push(borde);
    borde.scale.setTo(0.15,1.5);
    this.game.add.existing(borde);

    var borde=new Borde(this,'borde',{x:0, y:600-60});
    this.bordes.push(borde);
    borde.scale.setTo(2,0.15);
    this.game.add.existing(borde);

    //Player//
    this.player=this.game.add.sprite(300,400,'player');
    this.game.physics.enable(this.player,Phaser.Physics.ARCADE);

    this.player.animations.add('move',[0,1,2,3],10,false);
    this.player.animations.add('stop',[5,6,7,8],10,true);

    //Ball
    this.balls=[];

    var ball = new Ball(this.game,'balls',{x:200, y:200});
    this.balls.push(ball);
    ball.body.velocity.setTo(200,200);
    ball.scale.setTo(0.75,0.75);
    this.game.add.existing(ball);
    
    //Teclas
    this.cursor=this.game.input.keyboard.createCursorKeys();
    this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);    

    //Sonido
    this.audio1=this.game.add.audio('audio1');
    this.audio2=this.game.add.audio('audio2');

    //Time
    this.second=30;
    this.game.time.events.loop(Phaser.Timer.SECOND,this.updateCounter,this);

    //Texto
    this.message='';
    this.text=this.game.add.text(0,0,'Colisiones: '+this.colisiones+' Segundos: '+this.second,{font:"24px Arial",fill:"#ffffff",align:"center"});
    this.text2=this.game.add.text(400,400,'',{font:"48px Arial",fill:"#ffffff",align:"center"});
    
    this.run=true;
  },
  update: function (){
    this.game.physics.arcade.collide(this.player, this.bordes);
    this.game.physics.arcade.collide(this.balls, this.bordes);
    this.game.physics.arcade.overlap(this.player,this.balls,this.colision, null, this);

    this.player.body.velocity.y=0;
    this.player.body.velocity.x=0;
    if(this.run){
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
    if(!this.run){
      if(this.space.isDown){
        this.game.state.start('play');
      }
    }
  }, 
  render: function (){
    this.text.setText('Colisiones: '+this.colisiones+' Segundos: '+this.second);
    this.text2.setText(this.message);
  },
  colision: function(player, ball) {    
    // Removes the star from the screen
    ball.divisiones--;    
    this.colisiones--;    

    if(ball.divisiones>0){
      ball.scale.setTo(ball.scale.x/2,ball.scale.y/2);
      ball.body.velocity.setTo(ball.body.velocity.x,-ball.body.velocity.y);
      var pos={x: ball.position.x, y: ball.position.y}
      var newBall= new Ball(this.game,'balls',pos);
      this.balls.push(newBall);
      newBall.body.velocity.setTo(-ball.body.velocity.x,ball.body.velocity.y);
      newBall.scale.setTo(ball.scale.x,ball.scale.y);
      newBall.divisiones=ball.divisiones;
      this.game.add.existing(newBall);
      ball.animations.play("divide");     
      this.audio2.play();
    }
    else{
      ball.animations.play("explode");
      ball.kill();
      this.audio1.play();
    }

    if(this.colisiones==0){
      //this.game.state.start('play');
      this.message="Has ganado";
      this.run = false;
    }
    
  },
  updateCounter: function(){
    if(this.run){
      this.second--;
      console.log(this.second);
      if(this.second==0){
        this.message="Has perdido";
        this.run=false;
        for(var x=0; x<this.balls.length;x++){
          this.balls[x].body.velocity.setTo(0);
        }
      }
    }    
  }
};

module.exports = PlayScene;
