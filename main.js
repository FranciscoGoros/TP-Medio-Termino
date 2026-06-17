import Menu from "./scenes/menu.js";

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 480,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
      render: {
      pixelArt: true,
      antialias: false, 
      roundPixels: true,
    },

  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 0},
      debug: false,
    },
  },

  scene: [Menu],
};

window.game = new Phaser.Game(config);