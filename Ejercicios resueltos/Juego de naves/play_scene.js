'use strict';

  var EnemyScript = require('./enemy.js');
  var GunScript = require('./gun.js');

  var PlayScene = {
  create: function () {
    this.game.add.sprite(0, 0, 'sky');

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //Player    
    this.player = this.game.add.sprite(100, 500, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left',[0,1,2,3],10,true);
    this.player.animations.add('right',[5,6,7,8],10,true);

    //Enemys
    this.enemys=[];
    this.enemy=new Enemy(this.game,'enemy',{x:100, y:0},100);
    this.enemys.push(this.enemy);
    this.game.add.existing(this.enemy);

    this.enemy=new Enemy(this.game,'enemy',{x:200, y:50},200);
    this.enemys.push(this.enemy);
    this.game.add.existing(this.enemy);

    this.enemy=new Enemy(this.game,'enemy',{x:100, y:100},150);
    this.enemys.push(this.enemy);
    this.game.add.existing(this.enemy);

    this.enemy=new Enemy(this.game,'enemy',{x:200, y:150},50);
    this.enemys.push(this.enemy);
    this.game.add.existing(this.enemy);

    this.enemy=new Enemy(this.game,'enemy',{x:400, y:200},100);
    this.enemys.push(this.enemy);
    this.game.add.existing(this.enemy);
    
    //Balas    
    this.guns=[];

    //Controles
    this.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Sonido
    this.sho=this.game.add.audio('audio1');

    //Variables
    this.active=false;
    this.timer=this.game.time.create(false);
  },
  update: function(){
    this.handlevent();
    this.game.physics.arcade.collide(this.guns, this.enemys, this.hit, null, this);
  },

  hit:function(gun,enemy){
    gun.destroy();
    enemy.destroy();
    enemy.life=false;
    this.detecte=true;
    for(var x=0; x<this.enemys.length;x++){
      if(this.enemys[x].life){
        this.detecte=false;
      }
    }
    if(this.detecte){
      var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
      this.victory = this.game.add.text(400, 300, "WIN", this.style);
    }
  },

  handlevent: function(){
    this.player.body.velocity.x=0;
    if(this.left.isDown){
      this.player.body.velocity.x=-250;
      this.player.animations.play('left');
    }
    else if(this.right.isDown){
      this.player.body.velocity.x=250;
      this.player.animations.play('right');
    }
    else{
      this.player.animations.stop();

      this.player.frame = 4;
    }

    if(this.shoot.isDown && !this.active){
      this.timer.add(500,this.Clock,this);
      this.timer.start();
      this.active=true;
      this.gun=new Gun(this,'gun',{x:this.player.position.x, y:this.player.position.y});
      this.guns.push(this.gun);
      this.game.add.existing(this.gun);
      this.sho.play();
    }
  },
  Clock: function(){
    this.active=false;
  }
};

module.exports = PlayScene;
