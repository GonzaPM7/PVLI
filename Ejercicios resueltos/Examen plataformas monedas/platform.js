Platform=function Platform(game, graphic, position){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);    

    game.physics.enable(this, Phaser.Physics.ARCADE);  
    this.body.checkCollision.down = false;  
    this.body.immovable=true;
}

Platform.prototype=Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor=Platform;