import NivelBase from "./levelplantilla.js";

export default class Level1 extends NivelBase {
  constructor() {
    super("Level1");
  }

  create() {
    this.crearNivel("map_level1");
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.zoom = 1;
  }

  enterdoor(player, door) {
    if (this.inventario.items.length >= 5) {
      door.disableBody(true, true); 
      this.registry.set('score', this.score);
      this.scene.start("Level2", { score: this.score }); 
    }
  }
}