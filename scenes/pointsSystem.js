export function setupPointsSystem(scene) {
  scene.points = scene.points || 0;

  scene.addPoints = (amount) => {
    scene.points = Math.max(0, (scene.points || 0) + amount);
    if (scene.updateHud) {
      scene.updateHud();
    }
  };
}
