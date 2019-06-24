'use strict';

var BlockScript = require('./block.js');

  var PlayScene = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.physics.p2.restitution=0.9;

    this.blocks=[];
    this.select = 0;
    this.cursors=this.game.input.keyboard.createCursorKeys();
    this.space=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.D=this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.S=this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.space.onDown.add(this.block,this);
    this.D.onDown.add(this.deleate,this);

    this.I=this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.J=this.game.input.keyboard.addKey(Phaser.Keyboard.J);
    this.K=this.game.input.keyboard.addKey(Phaser.Keyboard.K);
    this.L=this.game.input.keyboard.addKey(Phaser.Keyboard.L);

    this.audio1=this.game.add.audio('audio1');
    this.audio2=this.game.add.audio('audio2');
  },
  update:function(){
    //this.block.body.setZeroVelocity();
    if(this.select!=this.blocks.length){
      if (this.J.isDown)
      {
        this.blocks[this.select].body.moveLeft(this.blocks[this.select].speed);
        this.audio2.play();
      }
      else if (this.L.isDown)
      {
        this.blocks[this.select].body.moveRight(this.blocks[this.select].speed);
        this.audio2.play();
      }

      if (this.I.isDown)
      {
        this.blocks[this.select].body.moveUp(this.blocks[this.select].speed);
        this.audio2.play();
      }
      else if (this.K.isDown)
      {
        this.blocks[this.select].body.moveDown(this.blocks[this.select].speed);
        this.audio2.play();
      }
      if(this.S.isDown){        
      this.blocks[this.select].body.angle++;
      }
   }

  },
  block:function(){    
    this.posX=50 + Math.random() * 750;
    this.posY=50 + Math.random() * 550;
    this.s=0 + Math.random() * 600;;
    this.block = new Block(this.game,'caja',{x:this.posX ,y:this.posY});
    this.block.speed = this.s;
    this.blocks.push(this.block);
    this.game.add.existing(this.block);
    this.blocks[this.select].frame = 1;
    this.audio1.play();
  },
  deleate:function(){
    console.log(this.blocks.length);
    if(this.select!=this.blocks.length){      
      this.blocks[this.select].destroy();
      this.select++;
      this.audio2.play();
      if(this.select!=this.blocks.length)
        this.blocks[this.select].frame = 1;
    }
  }  
};

module.exports = PlayScene;
