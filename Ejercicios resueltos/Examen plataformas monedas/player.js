var PlayScene = require('./play_scene.js');
Player=function Player(game, graphic, position){
    Phaser.Sprite.call(this, game, position.x, position.y, graphic);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.bounce.y = 0.2; //rebote al colisionar
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.points=0;

    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    this.cursors = game.input.keyboard.createCursorKeys();
}

Player.prototype=Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor=Player;

Player.prototype.update=function(){
    this.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.body.velocity.x = -150;

        this.animations.play('left');
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.body.velocity.x = 150;

        this.animations.play('right');
    }
    else
    {
        //  Stand still
        this.animations.stop();

        this.frame = 4;
    }
}