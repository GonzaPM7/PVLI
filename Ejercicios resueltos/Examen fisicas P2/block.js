Block=function Block(game,graphic,position){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);
    this.anchor.setTo(0.5,0.5);
    this.speed;
    game.physics.p2.enable(this,false);
}
Block.prototype=Object.create(Phaser.Sprite.prototype);
Block.prototype.constructor=Block;