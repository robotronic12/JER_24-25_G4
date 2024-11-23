class Bala extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bala');

        this.dañoBala;

        scene.add.existing(this); // Añadir al sistema de rendering
        scene.physics.add.existing(this); // Añadir al sistema de físicas

        this.setCollideWorldBounds(true); // Que colisione con los bordes del mundo
        this.body.allowGravity = false; // Sin gravedad por defecto

        this.trailPoints = []; // Arreglo para almacenar los puntos del trail
    }

    fire(x, y, velocityX, velocityY, daño) {
        this.setPosition(x, y); // Posición inicial
        this.setActive(true); // Activar para que esté en el juego
        this.setVisible(true); // Hacer visible
        this.setVelocity(velocityX, velocityY); // Aplicar velocidad
        this.dañoBala = daño;
    }

    update() {
        // Desactivar si sale de los límites del mundo
        if (this.x < 0 || this.x > 800 || this.y < 0 || this.y > 600) {
            this.setActive(false);
            this.setVisible(false);
        }

        // Guardar las posiciones de la bala para el trail
        this.trailPoints.push({ x: this.x, y: this.y });
        if (this.trailPoints.length > 20) {
            this.trailPoints.shift(); // Limitar la cantidad de puntos en el trail
        }
    }
}
