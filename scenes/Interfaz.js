export function Interfaz(scene) {
  scene.Interfaz = scene.add.text(16, 16, "", {
    fontSize: "22px",
    fontFamily: "sans-serif",
    fill: "#ffffff",
    align: "left",
    lineSpacing: 8,
  });

  scene.Interfaz.setScrollFactor(0);
  scene.Interfaz.setOrigin(0, 0);

  scene.updateHud = () => {
    const savedPeople = scene.pushedToWaterCount || 0;
    const minutes = Math.floor(scene.timeRemaining / 60);
    const seconds = scene.timeRemaining % 60;

    scene.Interfaz.setText(
      `Personas salvadas: ${savedPeople}\nTiempo restante: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
  };

  scene.syncHudWithCamera = () => {
    const camera = scene.cameras.main;
    const zoom = camera?.zoom || 1;

    scene.Interfaz.setScale(zoom);
    scene.Interfaz.setPosition(16, 16);
  };

  scene.updateHud();
  scene.syncHudWithCamera();
}
