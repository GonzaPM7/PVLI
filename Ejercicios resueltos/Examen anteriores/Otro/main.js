'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('ball', 'images/ball.png');
		this.game.load.spritesheet('player', 'images/player.png', 12, 12);
		this.game.load.spritesheet('balls', 'images/balls.png', 128, 128);
		this.game.load.audio('audio1', 'audio/audio1.mp3');
		this.game.load.audio('audio2', 'audio/audio2.mp3');
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var config = {
		width: 800,
		height: 600,
		renderer: Phaser.AUTO,
		backgroundColor: '#ffffff',
		parent: 'game',
		transparent: false,
		antialias: false,
		state: this,
		scaleMode: Phaser.ScaleManager.EXACT_FIT
	};
  var game = new Phaser.Game(config);

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
