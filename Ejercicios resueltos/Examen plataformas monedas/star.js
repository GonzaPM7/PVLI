Star=function Star(game, graphic, position){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);

    game.physics.enable(this, Phaser.Physics.ARCADE);    
    this.body.immovable=true;
}

Star.prototype=Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor=Star;