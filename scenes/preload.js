const Phaser = window.Phaser;

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.tilemapTiledJSON("map_level1", "public/assets/tilemap/map_level1.json");
    this.load.tilemapTiledJSON("map_level2", "public/assets/tilemap/map_level2.json");

    this.load.image("tileset", "public/assets/Texturetile.png");
    this.load.image("NPC1", "public/assets/playersprite.png");
    this.load.image("NPC2", "public/assets/playersprite.png");
    this.load.image("NPC3", "public/assets/playersprite.png");
    this.load.image("water", "public/assets/playersprite.png");
    this.load.image("player", "public/assets/playersprite.png");
    this.load.image("enemy", "public/assets/Enemigo.png");
    this.load.image("alerta", "public/assets/alert.png");
    this.load.image("ray", "public/assets/ray.png");
  }

  create() {
    this.scene.start("Level1");
  }
}