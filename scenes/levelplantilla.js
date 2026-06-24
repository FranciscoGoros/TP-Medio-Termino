import Player from "./player.js";
import inventario from "./Inventario.js";
import { Interfaz } from "./Interfaz.js";

const Phaser = window.Phaser;

export default class NivelBase extends Phaser.Scene {
  constructor(key) {
    super(key); 
  }

  init(data) {
    this.score = data?.score || 0;
    this.pushedToWaterCount = 0;
    this.timeRemaining = 90;
  }

  crearNivel(mapKey) {
    const map = this.make.tilemap({ key: mapKey });
    const tileset = map.addTilesetImage("Texturetile", "tileset");
    const belowLayer = map.createLayer("Fondo", tileset, 0, 0);
    const waterLayer = map.createLayer("Agua", tileset, 0, 0);
    this.waterLayer = waterLayer;
    const platformLayer = map.createLayer("Paredes", tileset, 0, 0);
    const objectsLayer = map.getObjectLayer("Objetos");

    const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "player");
    
    this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player");
    this.player.setScale(1, 1);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.inventario = new inventario();
    this.inventario.items = [];
    Interfaz(this);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.timeRemaining = Math.max(0, this.timeRemaining - 1);
        this.updateHud();

        if (this.timeRemaining === 0) {
          this.scene.restart();
        }
      },
      loop: true,
    });

    platformLayer.setCollisionByExclusion([-1]);
    platformLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platformLayer);

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
        case "NPC1": {
          const npc = this.NPC1.create(x, y, "NPC1");
          this.setupPushableNpc(npc);
          break;
        }
        case "NPC2": {
          const npc = this.NPC2.create(x, y, "NPC2");
          this.setupPushableNpc(npc);
          break;
        }
        case "NPC3": {
          const npc = this.NPC3.create(x, y, "NPC3");
          this.setupPushableNpc(npc);
          break;
        }
        case "water": this.water.create(x, y, "water"); break;
        case "Enemy": 
          const enemigonuevo = new Enemy(this, x, y, "enemy");
          this.enemigosGroup.add(enemigonuevo);
          break;
      }
    });

    this.physics.add.collider(this.NPC1, platformLayer);
    this.physics.add.collider(this.NPC2, platformLayer);
    this.physics.add.collider(this.NPC3, platformLayer);

    this.physics.add.overlap(this.player, this.enemigosGroup, this.enemycollide, null, this);
    this.physics.add.collider(this.player, this.NPC1, this.handleNpcPush, null, this);
    this.physics.add.collider(this.player, this.NPC3, this.handleNpcPush, null, this);
    this.physics.add.collider(this.player, this.NPC2, this.handleNpcPush, null, this);
    this.physics.add.collider(this.player, this.door, this.enterdoor, null, this);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      console.log("Reiniciando o acción R...");
    }

    if (this.syncHudWithCamera) {
      this.syncHudWithCamera();
    }

    this.checkNpcsInWater(this.NPC1);
    this.checkNpcsInWater(this.NPC2);
    this.checkNpcsInWater(this.NPC3);
  }

  setupPushableNpc(npc) {
      npc.inWater = false;
    if (!npc || !npc.body) {
      return;
    }

    npc.body.setCollideWorldBounds(true);
    npc.body.setBounce(0, 0);
    npc.body.setDrag(800, 800);
    npc.body.setMaxVelocity(300, 300);
    npc.body.setImmovable(false);
    npc.pushable = true;
    npc.collected = false;
  }

  handleNpcPush(player, npc) {
    if (!npc || !npc.body || !player || !player.body) {
      return;
    }

    const velocityX = player.body.velocity.x;
    const velocityY = player.body.velocity.y;
    if (Math.abs(velocityX) < 20 && Math.abs(velocityY) < 20) {
      return;
    }

    npc.body.setVelocity(velocityX * 1.5, velocityY * 1.5);

    if (npc.texture && npc.texture.key === "NPC3" && !npc.collected) {
      npc.collected = true;
      this.inventario.items.push("NPC3");
      this.score += 30;
    }
  }

  npcEnterWater(npc) {
    if (!npc || npc.inWater) return;
    npc.inWater = true;

    if (npc.disableBody) {
      npc.disableBody(true, true);
    } else if (npc.destroy) {
      npc.destroy();
    }

    this.pushedToWaterCount = (this.pushedToWaterCount || 0) + 1;
    if (this.updateHud) {
      this.updateHud();
    }

    if (this.pushedToWaterCount >= 4) {
      this.registry.set('score', this.score);
      this.scene.start("SiguienteNivel");
    }
  }

  checkNpcsInWater(group) {
    if (!group || !this.waterLayer) return;
    group.getChildren().forEach((npc) => {
      if (!npc || !npc.body || npc.inWater) return;
      const x = npc.body.center.x;
      const y = npc.body.center.y;
      const tile = this.waterLayer.getTileAtWorldXY(x, y);
      if (tile) {
        this.npcEnterWater(npc);
      }
    });
  }

  enterdoor(player, door) {
    if (this.inventario.items.length >= 5) {
      door.disableBody(true, true); 
      this.registry.set('score', this.score);
      this.scene.start("SiguienteNivel"); 
    }
  }

  enemycollide(player, Enemy) {
    this.player.vida -= 1;
    Enemy.disableBody(true, true);
  }
}