Ball = function Ball(game, graphic, position) {
	Phaser.Sprite.call(this, game, position.x, position.y, graphic);

	this.nCollisions = 0;

	this.anchor.setTo(0.5, 0.5);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.velocity.setTo(200,200);
    this.body.collideWorldBounds = true;
	this.body.bounce.set(1);
	
    this.animations.add('move', [2, 4], 2, true);
    this.animations.add('divide', [1, 3], 2, true);
	this.animations.add('explode', [0, 3], 2, false);
	this.animations.play("move");
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;