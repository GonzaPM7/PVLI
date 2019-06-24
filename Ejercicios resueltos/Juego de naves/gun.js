Gun=function Gun(game, graphic, position){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.setTo(0,-300);
}

Gun.prototype=Object.create(Phaser.Sprite.prototype);
Gun.prototype.constructor=Gun;

Gun.prototype.update=function(){
    if(this.position.y<0){
        this.destroy();
    }
}