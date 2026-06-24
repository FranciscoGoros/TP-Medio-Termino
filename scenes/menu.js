export default class Menu extends Phaser.Scene {
  constructor() {

    super("Menu");
  }

  init() {

  }

  create() {
    const rectangle_button = this.add.rectangle(230, 220, 300, 100, 0x08888).setOrigin(0.5);
    const button = this.add.text(230, 220, "START", {
      fontSize: "48px",
      fill: "#ffffff",
    }).setOrigin(0.5);

    rectangle_button.setInteractive();
    rectangle_button.on("pointerdown", () => {
      this.scene.start("Level1");
    });
  }
}
