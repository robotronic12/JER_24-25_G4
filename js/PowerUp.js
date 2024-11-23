var PowerUps = {
    speedUp: 'speedUp',
    speedAtkUp: 'speedAtkUp',
    moreDamage: 'moreDamage',
}

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipeOfPP) {
        super(scene, x, y, tipeOfPP);
        this.type = tipeOfPP;
        this.player;

        scene.add.existing(this); // Añadir al sistema de rendering
        scene.physics.add.existing(this); // Añadir al sistema de físicas

        this.body.allowGravity = false; // Sin gravedad por defecto
    }

    collected(jugador, j1, j2){
        this.player = jugador;
        if(this.type==='speedUp'){
            jugador.body.velocity.x *= 2;
        }
    
        if(this.type === 'speedAtkUp'){
            if(jugador==j1)
                this.cooldownBalaP1*=1.5
            if(jugador==j2)
                this.cooldownBalaP2*=1.5
        }
    
        if(this.type === 'moreDamage'){
            console.log('Hola');
            if(jugador.x==j1.x){
                console.log('HolaJ1');
                if(this.dañoJ1 < 100){
                    this.dañoJ1 += 10;
                }
            }
            if(jugador.x==j2.x){
                if(this.dañoJ2 < 100){
                    this.dañoJ2 +=10;
                }
            }
        }
    }

    reverse(j1, j2){
        if(this.type==='speedUp'){
            if(this.player==j1)
                this.j1.body.velocity.x /= 2;
            if(this.player==j2)
                this.j1.body.velocity.x /= 2;
        }
    
        if(this.type === 'speedAtkUp'){
            if(player==j1)
                this.cooldownBalaP1/=1.5
            if(jugador==j2)
                this.cooldownBalaP2/=1.5
        }
    
        if(this.type === 'moreDamage'){
            if(jugador===j1){
                if(this.dañoJ1<100){
                    this.dañoJ1-=10;
                }
            }
            if(jugador===j2){
                if(this.dañoJ2<100){
                    this.dañoJ2-=10;
                }
            }
        }
    }
}
