Player=function Ball(game,graphic,position,live_){
    Phaser.Sprite.call(this,game,position.x,position.y,graphic);

    game.physics.enable(this,Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2; //rebote al colisionar
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.live=live_;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
}
Player.prototype=Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;