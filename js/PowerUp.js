var PowerUps = {
    speedUp: 'speedUp',
    speedAtkUp: 'speedAtkUp',
    moreDamage: 'moreDamage',//
    speedBulletkUp: 'speedBulletkUp',//
    moreJump: 'moreJump',//
    moreLive: 'moreLive',//
    multiplesDisparos: 'multiplesDisparos',//
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
        this.crearMini();
        if(this.type === 'speedUp'){
            if(this.player==j1 || jugador.y==j1.y)
                this.Juego.velocidadJ1 *= 1.5;
            if(this.player==j2 || jugador.y==j2.y)
                this.Juego.velocidadJ2 *= 1.5;
        }
    
        if(this.type === 'speedAtkUp'){
            if(jugador==j1 || jugador.y==j1.y)
                this.Juego.cooldownBalaP1*=1.5
            if(jugador==j2 || jugador.y==j2.y)
                this.Juego.cooldownBalaP2*=1.5
        }
    
        if(this.type === 'moreDamage'){
            console.log('Hola');
            if(jugador.x==j1.x || jugador.y==j1.y){
                console.log('HolaJ1');
                if(this.Juego.danioJ1 < 100){
                    this.Juego.danioJ1 += 10;
                }
            }
            if(jugador.x==j2.x || jugador.y==j2.y){
                if(this.Juego.danioJ2 < 100){
                    this.Juego.danioJ2 +=10;
                }
            }
        }
        
        if(this.type === 'speedBulletkUp'){
            if(jugador.x==j1.x || jugador.y==j1.y){
                this.Juego.velBala1 *= 3;
            }
            if(jugador.x==j2.x || jugador.y==j2.y){
                this.Juego.velBala2 *= 3;
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

    crearMini(){  
        if(this.type !== PowerUps.moreLive){
            if(this.player == this.Juego.j1){
                this.verMini = this.Juego.add.image(20 + this.Juego.vidaLabel1.x + 20 * this.Juego.j1PUs - 
                    (this.Juego.vidaLabel1.width/2), this.Juego.vidaLabel1.y - 25, this.type);
                this.verMini.setScale(0.25);
                this.Juego.j1PUs++;
            }      
            if(this.player == this.Juego.j2){
                this.Juego.j2PUs++;
                this.verMini = this.Juego.add.image(this.Juego.vidaLabel2.x - 20 * this.Juego.j2PUs + 
                    (this.Juego.vidaLabel2.width/2), this.Juego.vidaLabel2.y - 25, this.type);
                this.verMini.setScale(0.25);
            }
        }      
    }

    reverse(j1, j2){
        if(this.type==='speedUp'){
            if(this.player==j1)
                this.Juego.velocidadJ1 /= 1.5;
            if(this.player==j2)
                this.Juego.velocidadJ2 /= 1.5;
        }
    
        if(this.type === 'speedAtkUp'){
            if(player==j1)
                this.Juego.cooldownBalaP1/=1.5
            if(jugador==j2)
                this.Juego.cooldownBalaP2/=1.5
        }
        if(this.type === 'moreDamage'){
            if(jugador===j1){
                if(this.Juego.danioJ1<100){
                    this.Juego.danioJ1-=10;
                }
            }
            if(jugador===j2){
                if(this.Juego.danioJ2<100){
                    this.Juego.danioJ2-=10;
                }
            }
        }
    }
}
