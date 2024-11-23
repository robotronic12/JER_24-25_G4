var PowerUps = {
    speedUp: 'speedUp',
    speedAtkUp: 'speedAtkUp',
    moreDamage: 'moreDamage',
    moreJump: 'moreJump',
    moreLive: 'moreLive',
    multiplesDisparos: 'multiplesDisparos',
}

class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipeOfPP, juego) {
        super(scene, x, y, tipeOfPP);
        this.type = tipeOfPP;
        this.player;
        this.Juego = juego;

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
                this.Juego.cooldownBalaP1*=1.5
            if(jugador==j2)
                this.Juego.cooldownBalaP2*=1.5
        }
    
        if(this.type === 'moreDamage'){
            console.log('Hola');
            if(jugador.x==j1.x){
                console.log('HolaJ1');
                if(this.Juego.dañoJ1 < 100){
                    this.Juego.dañoJ1 += 10;
                }
            }
            if(jugador.x==j2.x){
                if(this.Juego.dañoJ2 < 100){
                    this.Juego.dañoJ2 +=10;
                }
            }
        }

        if(this.type === 'moreJump'){
            if(jugador.x==j1.x){
                this.Juego.fuerzaSaltoJ1*=1.2;
            }
            if(jugador.x==j2.x){
                this.Juego.fuerzaSaltoJ2*=1.2;
            }
        }

        if(this.type === 'speedAtkUp'){
            if(jugador==j1)
                this.Juego.cooldownBalaP1*=1.5
            if(jugador==j2)
                this.Juego.cooldownBalaP2*=1.5
        }

        if(this.type === 'moreLive'){
            if(jugador===j1){
                this.Juego.curarj1(30);
            }
            if(jugador===j2){
                this.Juego.curarj2(30);
            }
                
        }
        if(this.type === 'multiplesDisparos'){
            if(jugador===j1){
                this.Juego.numeroBalasJ1+=2;
            }
            if(jugador===j2){
                this.Juego.numeroBalasJ2+=2;
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
                this.Juego.cooldownBalaP1/=1.5
            if(jugador==j2)
                this.Juego.cooldownBalaP2/=1.5
        }
    
        
    }
}
