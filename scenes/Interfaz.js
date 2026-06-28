export function Interfaz(scene) {
  scene.Interfaz = scene.add.text(16, 16, "", {
    fontSize: "22px",
    fontFamily: "sans-serif",
    fill: "#ffee00",
    align: "left",
    lineSpacing: 8,
  });

  scene.livesText = scene.add.text(0, 0, "", {
    fontSize: "22px",
    fontFamily: "sans-serif",
    fill: "#ffee00",
    align: "center",
  });

  scene.Interfaz.setScrollFactor(0);
  scene.Interfaz.setOrigin(0, 0);
  scene.Interfaz.setDepth(1000);
  scene.livesText.setScrollFactor(0);
  scene.livesText.setOrigin(0.5, 1);
  scene.livesText.setDepth(1000);

  scene.updateHud = () => {
    const savedPeople = scene.pushedToWaterCount || 0;
    const points = scene.points || 0;
    const minutes = Math.floor(scene.timeRemaining / 60);
    const seconds = scene.timeRemaining % 60;
    const lives = scene.player?.vida ?? 0;

    scene.Interfaz.setText(
      `Personas salvadas: ${savedPeople}\nPuntos totales: ${points}\nTiempo restante: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    );
    scene.livesText.setText(`Vidas: ${lives}`);

    
  };

  scene.syncHudWithCamera = () => {
    const camera = scene.cameras.main;
    const zoom = camera?.zoom || 1;
    const width = camera?.width || scene.scale.width;
    const height = camera?.height || scene.scale.height;

    scene.Interfaz.setScale(zoom);
    scene.Interfaz.setPosition(16, 16);
    scene.livesText.setScale(zoom);
    scene.livesText.setPosition(width / 2, height - 16);
  };

  scene.updateHud();
  scene.syncHudWithCamera();
}
