const Phaser = window.Phaser;

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.tilemapTiledJSON("map_level1", "public/assets/tilemap/map.json");
    this.load.tilemapTiledJSON("map_level2", "public/assets/tilemap/map2.json");

    this.load.image("tileset", "public/assets/Texturetile.png");
    this.load.image("NPC1", "public/assets/star.png");
    this.load.image("NPC2", "public/assets/door.png");
    this.load.image("NPC3", "public/assets/ruby.png");
    this.load.image("water", "public/assets/gold.png");
    this.load.image("dude", "./public/assets/Personaje.png");
    this.load.image("enemy", "./public/assets/Enemigo.png");
  }

  create() {
    this.scene.start("Level1");
  }
}