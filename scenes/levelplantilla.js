import Player from "./player.js";
import inventario from "./Inventario.js";
import { Interfaz } from "./Interfaz.js";
import Enemy from "./Enemy.js"; 

const Phaser = window.Phaser;

export default class NivelBase extends Phaser.Scene {
  constructor(key) {
    super(key); 
  }

  init(data) {
    this.score = data.score || 0; 
  }

  crearNivel(mapKey) {
    const map = this.make.tilemap({ key: mapKey });
    const tileset = map.addTilesetImage("Texturetile", "tileset");
    
    const belowLayer = map.createLayer("Fondo", tileset, 0, 0);
    const platformLayer = map.createLayer("Plataformas", tileset, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    const spawnPoint = map.findObject("Personas", (obj) => obj.name === "player");
    
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "dude");
    this.player.setScale(1, 1);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.inventario = new inventario();
    
    Interfaz(this);

    platformLayer.setCollisionByExclusion([-1]);
    platformLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platformLayer);

    // Grupos
    this.NPC1 = this.physics.add.group();
    this.NPC2 = this.physics.add.group();
    this.NPC3 = this.physics.add.group();
    this.stars = this.physics.add.group();
    this.enemigosGroup = this.physics.add.group();
    this.water = this.physics.add.group(); 
    this.door = this.physics.add.group(); 

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (type) {
        case "NPC1": this.NPC1.create(x, y, "NPC1"); break;
        case "NPC2": this.NPC2.create(x, y, "NPC2"); break;
        case "NPC3": this.NPC3.create(x, y, "NPC3"); break;
        case "water": this.water.create(x, y, "water"); break;
        case "Enemy": 
          const enemigonuevo = new Enemy(this, x, y, "enemy");
          this.enemigosGroup.add(enemigonuevo);
          break;
      }
    });

    this.physics.add.overlap(this.player, this.enemigosGroup, this.enemycollide, null, this);
    this.physics.add.collider(this.player, this.NPC1, this.pushnpc1, null, this);
    this.physics.add.collider(this.player, this.NPC3, this.pushnpc3, null, this);
    this.physics.add.collider(this.player, this.NPC2, this.pushnpc2, null, this);
    this.physics.add.collider(this.player, this.door, this.enterdoor, null, this);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Reiniciando o acción R...");
    }
  }

  enterdoor(player, door) {
    if (this.inventario.items.length >= 5) {
      door.disableBody(true, true); 
      this.registry.set('score', this.score);
      this.scene.start("SiguienteNivel"); 
    }
  }

  pushnpc1(player, NPC1) {
    NPC1.disableBody(true, true);
    this.inventario.items.push("NPC1");
    this.score += 10;
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.Puntos.setText(`Puntos: ${this.score}`);
  }

  pushnpc3(player, NPC3) {
    NPC3.disableBody(true, true);
    this.inventario.items.push("NPC3");
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.score += 30;
    this.Puntos.setText(`Puntos: ${this.score}`);
  }

  pushnpc2(player, NPC2) {
    NPC2.disableBody(true, true);
    this.inventario.items.push("NPC2");
    this.Interfaz.setText(`Objetos: ${this.inventario.items.length}`);
    this.score += 10;
    this.Puntos.setText(`Puntos: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
    }
  }

  enemycollide(player, Enemy) {
    this.player.vida -= 1;
    Enemy.disableBody(true, true);
  }
}