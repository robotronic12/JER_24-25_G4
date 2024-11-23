class Bala extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'bala');

        this.danioBala
        
        scene.add.existing(this); // Añadir al sistema de rendering
        scene.physics.add.existing(this); // Añadir al sistema de físicas

        this.setCollideWorldBounds(true); // Que colisione con los bordes del mundo
        this.body.allowGravity = false;  // Sin gravedad por defecto

        this.trailPoints = [];  // Arreglo para almacenar los puntos del trail

        this.vel = 5;
    }

    fire(x, y, velocityX, velocityY, danio) {
        this.trailPoints = [];

        this.danioBala = danio;

        this.setPosition(x, y);          // Posición inicial
        this.setActive(true);            // Activar para que esté en el juego
        this.setVisible(true);           // Hacer visible
        
        this.setVelocity(this.vel*velocityX, this.vel*velocityY);
    }

    update() {
        // Desactivar si sale de los límites del mundo
        if (this.x < -100 || this.x > 900 || this.y < -100 || this.y > 700) {
            this.trailPoints = [];

            this.setActive(false);
            this.setVisible(false);
        }

        // Guardar las posiciones de la bala para el trail
        this.trailPoints.push({ x: this.x, y: this.y });
        if (this.trailPoints.length > 20) {
            this.trailPoints.shift();  // Limitar la cantidad de puntos en el trail
        }
    }

}