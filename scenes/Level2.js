import NivelBase from "./levelplantilla.js";

export default class Level2 extends NivelBase {
  constructor() {
    super("Level2");
  }

  create() {
    this.crearNivel("map_level2");
  }

  enterdoor(player, door) {
    if (this.inventario.items.length >= 5) {
      door.disableBody(true, true); 
      this.registry.set('score', this.score);
      this.scene.start("Level2", { score: this.score }); 
    }
  }
}
