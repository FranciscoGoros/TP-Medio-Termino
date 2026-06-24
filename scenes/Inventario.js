const Phaser = window.Phaser;

export default class Inventario extends Phaser.Scene {
  constructor() {
    super("inventario");

    this.items = [];
  }

  create() {
    const inventarioText = this.add.text(20, 20, "Personas salvadas:", {
      fontSize: "24px",
      fill: "#ffffff",
    });

    const inventario = this.inventario; 

    }



}