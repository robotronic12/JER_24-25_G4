class Bala extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bala');
        
        scene.add.existing(this); // Añadir al sistema de rendering
        scene.physics.add.existing(this); // Añadir al sistema de físicas
        
        this.setCollideWorldBounds(true); // Que colisione con los bordes del mundo
        this.body.allowGravity = false;  // Sin gravedad por defecto

        this.trailPoints = [];  // Arreglo para almacenar los puntos del trail
    }

    fire(x, y, velocityX, velocityY) {
        this.setPosition(x, y);          // Posición inicial
        this.setActive(true);            // Activar para que esté en el juego
        this.setVisible(true);           // Hacer visible
        this.setVelocity(velocityX, velocityY); // Aplicar velocidad
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
    j1;
    j2;
    
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
        this.physics.add.collider(this.j1, this.movingPlatform);

        this.physics.add.overlap(this.j1, this.platforms, this.collectStar, null, this);
    }

    checkPlayer1Movement(){
        const { aKey, dKey, wKey } = this;

        //J1
        if (aKey.isDown)
            {
                this.j1.setVelocityX(-160);

                this.j1.anims.play('left', true);
            }
            else if (dKey.isDown)
            {
                this.j1.setVelocityX(160);

                this.j1.anims.play('right', true);
            }
            else
            {
                this.j1.setVelocityX(0);
        
                this.j1.anims.play('turn');
            }
            if (wKey.isDown && this.j1.body.touching.down)
            {
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
        this.physics.add.collider(this.j2, this.movingPlatform);

        this.physics.add.overlap(this.j2, this.platforms, this.collectStar, null, this);
    }

    checkPlayer2Movement(){
        const { left, right, up } = this.cursors;
        
        //J2
        if (left.isDown)
        {
            this.j2.setVelocityX(-160);

            this.j2.anims.play('left', true);
        }
        else if (right.isDown)
        {
            this.j2.setVelocityX(160);

            this.j2.anims.play('right', true);
        }
        else
        {
            this.j2.setVelocityX(0);

            this.j2.anims.play('turn');
        }
        if (up.isDown && this.j2.body.touching.down)
        {
            this.j2.setVelocityY(-330);
        }
    }
    //#endregion
    
    //#region Otros

    ///////////////////////////////////////////////////////////////////////////////////////
    // OTROS
    ///////////////////////////////////////////////////////////////////////////////////////
    /*createBalas()
    {
        this.bala.setCollideWorldBounds(false);
    
        //Colliders Bala
    }

    handleCollision1(bala, player){
        bala.destroy();
    }

    handleCollision2(bala, player){
        bala.destroy();
    }
        this.bala.setImmovable(true);
        this.bala.allowGravity(false);
    }*/

    /*shootBala(xPos, yPos, xDir, yDir, xDirWhenInPlace)
    {
        var velocity = 5;
        
        this.bala = this.physics.add.sprite(xPos + xDir*30, yPos + yDir*30, 'bala');
        this.bala.body.allowGravity = false;
        //establecemos el tamaño de la bala 
        this.bala.setScale(2);

        this.physics.add.collider(this.bala, this.j1, this.handleCollision1, null, this);
        this.physics.add.collider(this.bala, this.j2, this.handleCollision2, null, this);

        //this.bala.setVelocityX(velocity*Math.abs(Math.cos(xDir)));
        //this.bala.setVelocityY(velocity*Math.abs(Math.cos(yDir)));

        if(xDir != 0)
        {
            this.bala.setVelocity(xDir * velocity, yDir * velocity);
        }
        else
        {
            this.bala.setVelocity(xDirWhenInPlace*160 * velocity, yDir * velocity);
        }

    }*/

    dispararBala(x, y, velocidadX, velocidadY) {
        const bala = this.balas.get(); // Obtener una bala disponible del grupo
        if (bala) {
            bala.fire(x, y, velocidadX, velocidadY); // Configurar la posición y velocidad
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
       
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    ///////////////////////////////////////////////////////////////////////////////////////
    create ()
    {
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

        const ground = this.platforms.create(400, 568, 'ground');
        ground.displayWidth = 810;
        
        ground.refreshBody();
        

        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');

        this.movingPlatform = this.physics.add.image(400, 400, 'plataforma');
        this.movingPlatform.setScale(1.2,1);

        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

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
        this.cooldownBala=500;       //tiempo entre bala y bala en ms (5 seg)
        this.tiempoUltimoDisparoP1 = 0; // Inicializa el tiempo del último disparo
        this.tiempoUltimoDisparoP2 = 0; // Inicializa el tiempo del último disparo

            
        // Crear el objeto trail, que será el contorno del camino de las balas
        this.trailGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xFFFF00 } });

        // Colisiones entre balas y jugadores
        this.physics.add.collider(this.balas, this.j1, (bala, j1) => {
            bala.setActive(false);
            bala.setVisible(false);
            console.log('Jugador 1 golpeado');
        });

        this.physics.add.collider(this.balas, this.j2, (bala, j2) => {
            bala.setActive(false);
            bala.setVisible(false);
            console.log('Jugador 2 golpeado');
        });

        this.instanceKeyboardKeys();
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    // UPDATE
    ///////////////////////////////////////////////////////////////////////////////////////
    
    update ()
    {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) //para comprobar que la pantalla de victoria funciona
            {
                this.bgMusic.stop();
                this.scene.stop('Juego'); //carga la escena de intro
                this.scene.start('MenuVictoriaJ1'); //carga la escena 
        }

        if(this.bgMusic.isPaused){
            this.bgMusic.resume();
        }

        //Movimiento personajes
        this.checkPlayer1Movement();
        this.checkPlayer2Movement();

        //Disparo
        this.trail();
        ////////// Disparo del jugador 1/////////////
        const currentTime = this.time.now; // Tiempo actual
        //utilizamos los atributos creados para aplicar cooldown y así limitar las balas/seg
        if (Phaser.Input.Keyboard.JustDown(this.J1ShootKey)) {
            
            if(currentTime-this.tiempoUltimoDisparoP1>this.cooldownBala){  //si la bala se dispara dentro del cooldown aparece si no no aparece
                this.dispararBala(this.j1.x, this.j1.y, 600, 0); // Dirección horizontal derecha
                this.tiempoUltimoDisparoP1=currentTime;   //actualizamos el tiempo de nuestro ultimo disparo al actual
            }
        }

        // Disparo del jugador 2
        
        if (Phaser.Input.Keyboard.JustDown(this.J2ShootKey)) {
            if(currentTime-this.tiempoUltimoDisparoP2>this.cooldownBala){  //si la bala se dispara dentro del cooldown aparece si no no aparece
                this.dispararBala(this.j2.x, this.j2.y, -600, 0); // Dirección horizontal izquierda
                this.tiempoUltimoDisparoP2=currentTime;   //actualizamos el tiempo de nuestro ultimo disparo al actual
            }
        }

        if(this.bala != null)
        {
            //this.trail(this.bala.x, this.bala.y);
        }

        //Plataformas
        if (this.movingPlatform.x >= 500)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 300)
        {
            this.movingPlatform.setVelocityX(50);
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.pause('Juego');
            this.bgMusic.pause(); //que deje de sonar           
            this.scene.launch('MenuPausa'); 
            this.scene.bringToTop('MenuPausa');
        }

    }

    
}