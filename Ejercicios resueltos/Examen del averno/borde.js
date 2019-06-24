Borde = function Borde(game, graphic, position) {
    Phaser.Sprite.call(this,game,position.x,position.y,graphic);

    game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.immovable=true;
}

Borde.prototype = Object.create(Phaser.Sprite.prototype);
Borde.prototype.constructor = Borde;