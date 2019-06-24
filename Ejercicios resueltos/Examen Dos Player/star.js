Star=function Star(game, graphic, position){
    Phaser.Sprite.call(this,game,position.x,position.y,graphic);
    this.live=true; 
    game.physics.enable(this,Phaser.Physics.ARCADE);
    this.body.gravity.y = 6;
    this.body.collideWorldBounds = true;       
    
}
Star.prototype = Object.create(Phaser.Sprite.prototype);
Star.prototype.constructor=Star;