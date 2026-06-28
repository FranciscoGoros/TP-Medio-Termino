export default class gameoverscene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  init(data) {
    this.savedPeopleTotal = data?.savedPeopleTotal || 0;
    this.pointsTotal = data?.points || data?.score || 0;
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.text(centerX, centerY - 140, "GAME OVER", {
      fontSize: "64px",
      fontFamily: "sans-serif",
      fill: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(centerX, centerY - 40, `Personas salvadas: ${this.savedPeopleTotal}`, {
      fontSize: "32px",
      fontFamily: "sans-serif",
      fill: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(centerX, centerY + 20, `Puntos totales: ${this.pointsTotal}`, {
      fontSize: "32px",
      fontFamily: "sans-serif",
      fill: "#ffffff",
    }).setOrigin(0.5);

    const buttonBackground = this.add.rectangle(centerX, centerY + 120, 320, 100, 0x004488).setOrigin(0.5);
    const buttonText = this.add.text(centerX, centerY + 120, "VOLVER AL MENÚ", {
      fontSize: "28px",
      fontFamily: "sans-serif",
      fill: "#ffffff",
    }).setOrigin(0.5);

    buttonBackground.setInteractive({ useHandCursor: true });
    buttonBackground.on("pointerdown", () => {
      this.scene.start("Menu");
    });
    buttonText.setInteractive({ useHandCursor: true });
    buttonText.on("pointerdown", () => {
      this.scene.start("Menu");
    });
  }
}
