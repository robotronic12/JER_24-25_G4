class Bala extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bala');
        
        this.dañoBala = 10;

        scene.add.existing(this); // Añadir al sistema de rendering
        scene.physics.add.existing(this); // Añadir al sistema de físicas
        
        this.setCollideWorldBounds(true); // Que colisione con los bordes del mundo
        this.body.allowGravity = false;  // Sin gravedad por defecto

        this.trailPoints = [];  // Arreglo para almacenar los puntos del trail
    }

    fire(x, y, velocityX, velocityY, daño) {
        this.setPosition(x, y);          // Posición inicial
        this.setActive(true);            // Activar para que esté en el juego
        this.setVisible(true);           // Hacer visible
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
            this.trailPoints.shift();  // Limitar la cantidad de puntos en el trail
        }
    }

}


class Juego extends Phaser.Scene
{
    constructor() {
        super({ key: 'Juego' });
    }

    cursors;
    aKey;
    dKey;
    wKey;

    J1ShootKey;
    J2ShootKey;

    movingPlatform;
    platforms;

    //stars;

    //Jugador:
    j1;
    j2;
    bala;
    vidaLabel1;
    vidaLabel2;
    vida1;
    vida2;

    //Daño
    dañoJ1;
    dañoJ2;
    
    //#region JUGADOR 1

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 1
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ1(){
        //creacion de j1 en una pos
        this.j1 = this.physics.add.sprite(100, 450, 'j1');

        this.j1.setCollideWorldBounds(true);

        //Colliders J1
        this.physics.add.collider(this.j1, this.platforms);
        this.physics.add.collider(this.j1, this.movingPlatform1);
        this.physics.add.collider(this.j1, this.movingPlatform2);

        this.physics.add.overlap(this.j1, this.platforms, this.collectStar, null, this);
    }

    checkPlayer1Movement() {
        if (!this.j1 || !this.j1.active) return; // Salir si J2 no está activo
    
        if (this.aKey.isDown) {
            this.j1.setVelocityX(-160);
            this.j1.anims.play('left', true);
        } else if (this.dKey.isDown) {
            this.j1.setVelocityX(160);
            this.j1.anims.play('right', true);
        } else {
            this.j1.setVelocityX(0);
            this.j1.anims.play('turn');
        }
        if (this.wKey.isDown && this.j1.body.touching.down) {
            this.j1.setVelocityY(-330);
        }
    }

    //#endregion
    
    //#region JUGADOR 2

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 2
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ2(){
        //creacion de J2 en una pos
        this.j2 = this.physics.add.sprite(700, 450, 'j2');

        this.j2.setCollideWorldBounds(true);

        //Colliders J2
        this.physics.add.collider(this.j2, this.platforms);
        this.physics.add.collider(this.j2, this.movingPlatform1);
        this.physics.add.collider(this.j2, this.movingPlatform2);

        this.physics.add.overlap(this.j2, this.platforms, this.collectStar, null, this);
    }

    checkPlayer2Movement() {
        if (!this.j2 || !this.j2.active) return; // Salir si J2 no está activo
    
        const { left, right, up } = this.cursors;
    
        if (left.isDown) {
            this.j2.setVelocityX(-160);
            this.j2.anims.play('left', true);
        } else if (right.isDown) {
            this.j2.setVelocityX(160);
            this.j2.anims.play('right', true);
        } else {
            this.j2.setVelocityX(0);
            this.j2.anims.play('turn');
        }
        if (up.isDown && this.j2.body.touching.down) {
            this.j2.setVelocityY(-330);
        }
    }
    
    //#endregion
    
    //#region Otros

    ///////////////////////////////////////////////////////////////////////////////////////
    // OTROS
    ///////////////////////////////////////////////////////////////////////////////////////
    /**/createBalas()
    {
        this.bala.setCollideWorldBounds(false);
    
        //Colliders Bala
    } 

    handleCollision1(bala, player,){
        bala.destroy();
        this.vida1-=daño;

    }

    handleCollision2(bala, player){
        bala.destroy();
        this.vida2-=daño;
    
        //this.bala.setImmovable(true);
        //this.bala.allowGravity(false);
    }/**/

    /**/colisionsBalas(balas, j1, j2)
    {
        //var velocity = 5;
        
        //this.bala = this.physics.add.sprite(xPos + xDir*30, yPos + yDir*30, 'bala');
        //this.bala.body.allowGravity = false;
        //establecemos el tamaño de la bala 
        //this.bala.setScale(2);

        this.physics.add.collider(balas, j1, this.handleCollision1, null, this);
        this.physics.add.collider(balas, j2, this.handleCollision2, null, this);

        //this.bala.setVelocityX(velocity*Math.abs(Math.cos(xDir)));
        //this.bala.setVelocityY(velocity*Math.abs(Math.cos(yDir)));

        // if(xDir != 0)
        // {
        //     this.bala.setVelocity(xDir * velocity, yDir * velocity);
        // }
        // else
        // {
        //     this.bala.setVelocity(xDirWhenInPlace*160 * velocity, yDir * velocity);
        // }

    }/**/

    dispararBala(x, y, velocidadX, velocidadY, dañoJugador) {
        const bala = this.balas.get(); // Obtener una bala disponible del grupo
        if (bala) {
            bala.fire(x, y, velocidadX, velocidadY, dañoJugador); // Configurar la posición y velocidad
        }
    }

    trail() {
        // Limpiar el gráfico antes de dibujar
        this.trailGraphics.clear();

        // Recorrer todas las balas activas
        this.balas.getChildren().forEach(bala => {
            if (bala.trailPoints.length > 1 && bala.active == true) {
                // Dibujar líneas entre los puntos del trail de cada bala
                this.trailGraphics.beginPath();
                this.trailGraphics.moveTo(bala.trailPoints[0].x, bala.trailPoints[0].y);

                for (let i = 1; i < bala.trailPoints.length; i++) {
                    this.trailGraphics.lineTo(bala.trailPoints[i].x, bala.trailPoints[i].y);
                }

                this.trailGraphics.strokePath();
            }
        });
    }


    createAnimations(){ //Por hacer
        this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: -1
        });

        this.anims.create({
           key: 'turn',
           frames: [ { key: 'dude', frame: 4 } ],
           frameRate: 20
        });

        this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
           frameRate: 10,
           repeat: -1
        });
    }

    createColectables(){ //por implementar
        this.stars = this.physics.add.group({
           key: 'star',
           repeat: 11,
           setXY: { x: 12, y: 0, stepX: 70 }
        });

        for (const star of this.stars.getChildren())
        {
           star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
    }

    instanceKeyboardKeys(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.J1ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.J2ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    acabarPartida(){    //para enseñar la pantalla de fin cuando uno de los jugadores muere
        this.bgMusic.stop();
        this.scene.stop('Juego'); //carga la escena de intro
        this.scene.start('MenuVictoriaJ1'); //carga la escena 
    }
    //para power ups
    speedUp(jugador){
        jugador.body.velocity.x *= 2;
    }

    speedAtkUp(jugador){
        if(jugador==this.j1)
            this.cooldownBalaP1*=1.5
        if(jugador==this.j2)
            this.cooldownBalaP2*=1.5
    }

    handleColision1(player,bala) {
        if (this.j1 && this.j1.active) {
            bala.destroy(); // Destruye la bala
            this.vida1 -= 10;
            console.log(this.vida1);
            if (this.vida1 <= 0) {
                console.log('Jugador 1 eliminado');
                this.j1.setActive(false);
                this.j1.setVisible(false);
            }
        }
    }

    handleColision2(player,bala) {
        if (this.j2 && this.j2.active) {
            bala.destroy(); // Destruye la bala
            this.vida2 -= 10;
            console.log(this.vida2);
            if (this.vida2 <= 0) {
                console.log('Jugador 2 eliminado');
                this.j2.setActive(false);
                this.j2.setVisible(false);
            }
        }
    }

    //collectStar (j1, star)
    //{
    //    star.disableBody(true, true);
    //}
    //#endregion

    ///////////////////////////////////////////////////////////////////////////////////////
    // PRELOAD
    ///////////////////////////////////////////////////////////////////////////////////////
    preload ()
    {
        this.load.audio("background", "assets/musica/menuMusic.mp3"); //y les pongo sus respestivas etiquetas

        this.load.image('sky', 'assets/entorno/fondo.png');
        this.load.image('ground', 'assets/entorno/suelo.png');
        this.load.image('plataforma', 'assets/entorno/plataforma.png');
        this.load.image('player', 'assets/jugador/j1.png'); // Ruta de tu imagen del jugador
        this.load.image('player2', 'assets/jugador/j2.png'); // Ruta de tu imagen del jugador
        //this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('j1', 'assets/jugador/j1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('j2', 'assets/jugador/j2.png', { frameWidth: 48, frameHeight: 48 });

        this.load.image('bala', 'assets/jugador/bala.png', { frameWidth: 10, frameHeight: 10 });

        this.load.image('marcoVida', 'assets/jugador/MarcoVida.png');
        this.load.image('vida', 'assets/jugador/Vida.png');

        this.dañoJ1 = 10;
        this.dañoJ2 = 10;
       
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    ///////////////////////////////////////////////////////////////////////////////////////
    create ()
    {
        //daño inicial
        this.dañoJ1 = 10;
        this.dañoJ2 = 10;

        GlobalData.playing = true;
        ////////////Inputs extra//////////////////////////////
        //para comprobar la Pulsación de space
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Comprobamos que se usa el escape
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        ////////////Configuracion de la musica//////////////////
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.setVolume(0.01); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

      

        //Añadimos el cielo
        this.add.image(400, 300, 'sky');
        
        
        //creamos plataformas
        this.platforms = this.physics.add.staticGroup();
 
        //suelo
        const ground = this.platforms.create(400, 568, 'ground');   //suelo
        ground.displayWidth = 810;  //nuevo tamaño
        ground.refreshBody();   //actualizamos hitbox
        
         this.plat1=this.platforms.create(100, 300, 'plataforma');  //platf izq medio
         this.plat2=this.platforms.create(700, 300, 'plataforma');  //platf der medio
         //this.plat3=this.platforms.create(400, 200, 'plataforma');  //platf centro alto
         this.plat4=this.platforms.create(150, 100, 'plataforma');  //platf centro alto
         this.plat4.displayWidth = 300;  //cambiamos el tamaño de plat4
         this.plat4.refreshBody();  //actualizamos la hitbox al nuevo tamaño

        //plataforma movil 1 (abajo)
        this.movingPlatform1 = this.physics.add.image(400, 400, 'plataforma');   
        this.movingPlatform1.setScale(1.2,1);

        this.movingPlatform1.setImmovable(true);
        this.movingPlatform1.body.allowGravity = false;
        this.movingPlatform1.setVelocityX(50);

        //plataforma movil 2
        this.movingPlatform2 = this.physics.add.image(410, 250, 'plataforma');   
        //this.movingPlatform2.setScale(1.2,1);

        this.movingPlatform2.setImmovable(true);
        this.movingPlatform2.body.allowGravity = false;
        this.movingPlatform2.setVelocityY(50);


        //jugadores
        this.createJ1();
        this.createJ2();
       
        //Colliders entre los jugadores
        this.physics.add.collider(this.j1, this.j2);

        // Crear un grupo para las balas
        this.balas = this.physics.add.group({
            classType: Bala,        // Especificar la clase personalizada
            maxSize: 10,            // Número máximo de balas activas
            runChildUpdate: true    // Ejecutar el método `update` en cada bala
           
        });
        //variables para el cooldown de la bala
        this.cooldownBalaP1=500;       //tiempo entre bala y bala en ms (5 seg)
        this.cooldownBalaP2=500;       //tiempo entre bala y bala en ms (5 seg)
        this.tiempoUltimoDisparoP1 = 0; // Inicializa el tiempo del último disparo
        this.tiempoUltimoDisparoP2 = 0; // Inicializa el tiempo del último disparo

            
        // Crear el objeto trail, que será el contorno del camino de las balas
        this.trailGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xFFFF00 } });
        this.colisionsBalas(this.balas, this.j1, this.j2);

        // Colisiones entre balas y jugadores
        this.physics.add.collider(this.balas, this.j1, this.handleColision1, null, this);

        this.physics.add.collider(this.balas, this.j2, this.handleColision2, null, this);


        this.instanceKeyboardKeys();

        //Marcadores de vida;
        const recuadro2 = this.add.image(700, 568, 'marcoVida');
        this.vidaLabel1 = this.add.image(700, 568, 'vida');

        const recuadro1 = this.add.image(100, 568, 'marcoVida');
        this.vidaLabel2 = this.add.image(100, 568, 'vida');

        this.vida1 = 100
        this.vida2 = 100
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    // UPDATE
    ///////////////////////////////////////////////////////////////////////////////////////
    
    update ()
    {
        if (this.vida1===0||this.vida2===0) //para comprobar que la pantalla de victoria funciona
        {
            this.acabarPartida();
            return; // Detenemos aquí el ciclo de actualización
        }

        if(this.bgMusic.isPaused){
            this.bgMusic.resume();
        }

        //Movimiento personajes
        this.checkPlayer1Movement();
        this.checkPlayer2Movement();
        
        //para depurar power ups
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) 
            this.speedAtkUp(this.j1);
        //Disparo
        this.trail();
        ////////// Disparo del jugador 1/////////////
        const currentTime = this.time.now; // Tiempo actual
        //utilizamos los atributos creados para aplicar cooldown y así limitar las balas/seg
        if (Phaser.Input.Keyboard.JustDown(this.J1ShootKey)) {
            
            if(currentTime-this.tiempoUltimoDisparoP1>this.cooldownBalaP1){  //si la bala se dispara dentro del cooldown aparece si no no aparece
                this.dispararBala(this.j1.x, this.j1.y, 600, 0, dañoJ1); // Dirección horizontal derecha
                this.tiempoUltimoDisparoP1=currentTime;   //actualizamos el tiempo de nuestro ultimo disparo al actual
            }
        }

        // Disparo del jugador 2
        
        if (Phaser.Input.Keyboard.JustDown(this.J2ShootKey)) {
            if(currentTime-this.tiempoUltimoDisparoP2>this.cooldownBalaP2){  //si la bala se dispara dentro del cooldown aparece si no no aparece
                this.dispararBala(this.j2.x, this.j2.y, -600, 0, dañoJ2); // Dirección horizontal izquierda
                this.tiempoUltimoDisparoP2=currentTime;   //actualizamos el tiempo de nuestro ultimo disparo al actual
            }
        }

        if(this.bala != null)
        {
            //this.trail(this.bala.x, this.bala.y);
        }

        //Plataformas
        //pataforma móvil 1 (abajo)
        if (this.movingPlatform1.x >= 500)
        {
            this.movingPlatform1.setVelocityX(-50);
        }
        else if (this.movingPlatform1.x <= 300)
        {
            this.movingPlatform1.setVelocityX(50);
        }
        //plataforma móvil 2 (arriba)
        if (this.movingPlatform2.y >= 250)
            {
                this.movingPlatform2.setVelocityY(-50);
            }
            else if (this.movingPlatform2.y <= 125)
            {
                this.movingPlatform2.setVelocityY(50);
            }
        
        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.pause('Juego');
            this.bgMusic.pause(); //que deje de sonar           
            this.scene.launch('MenuPausa'); 
            this.scene.bringToTop('MenuPausa');
        }

        //Cambiar el tamaño y la posición de la barra de vida
         this.vidaLabel1.displayWidth = ((this.vida2) / 100) * 180;
         var tam1 = this.vidaLabel1.width;
        // this.vidaLabel1.setOrigin(700, 568);

         this.vidaLabel2.displayWidth = ((this.vida1)/ 100) * 180;
         var tam2 = this.vidaLabel2.width;
        // this.vidaLabel2.setOrigin(100, 568);
    }

    
}