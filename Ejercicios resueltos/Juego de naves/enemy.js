Enemy=function Enemy(game, graphic, position,speed){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);

    this.life=true;

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.setTo(speed,0);
    this.body.collideWorldBounds=true;
    this.body.bounce.set(1);

    this.animations.add('move',[0,1,2,3],5,true);
    this.animations.play("move");
}

Enemy.prototype=Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor=Enemy;