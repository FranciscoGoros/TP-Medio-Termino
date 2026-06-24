const Phaser = window.Phaser;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {

        super(scene, x, y, texture);
        this.setScale(1, 1);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(600, 900);
        this.setCollideWorldBounds(true);
        this.vida = 1;
        this.velocidad = 160;

        this.inventario = [];

        console.log(this.inventario);
        
        this.teclas = scene.input.keyboard.createCursorKeys();
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.teclas.left.isDown) {
            this.setVelocityX(-this.velocidad);
        } 
        else if (this.teclas.right.isDown) {
            this.setVelocityX(this.velocidad);
        }
        else {
        this.setVelocityX(0); 
        }
        
        if (this.teclas.up.isDown) {
            this.setVelocityY(-this.velocidad);
        } else if (this.teclas.down.isDown) {
            this.setVelocityY(this.velocidad);
        }

        else { 
            this.setVelocityY(0);
        }


        if (this.vida <= 0 && !this.isDead) {
            this.isDead = true;
            this.scene.scene.restart();
        }
    }
}