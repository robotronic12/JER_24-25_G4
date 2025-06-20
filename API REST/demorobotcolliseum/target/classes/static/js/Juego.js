class Juego extends Phaser.Scene
{
    constructor() {
        super({ key: 'Juego' });
    }


    cursors;
    chatKey;

    keyStates = {
        w: false,
        a: false,
        s: false,
        d: false,
        arrowup: false,
        arrowdown: false,
        arrowleft: false,
        arrowright: false,
        t: false,
        esc: false,
        mouseLeft: false 
        
    };

    J1ShootKey;
    J2ShootKey;

    movingPlatform;
    platforms;

    currentTime;


    //stars;
    //Jugadores
    j1;
    j2;
    j1PUs;
    j2PUs;

    //Jugador:
    bala;

    vidaLabel1;
    vidaLabel2;
    vida1;
    vida2;

    lastJ1Vel;
    lastJ2Vel;
    velocidadJ1;
    velocidadJ2;
    velBala1;
    velBala2;
    
    //danio
    danioJ1;
    danioJ2;

    //Multiples Disparos
    numeroBalasJ1;
    numeroBalasJ2;

    //Fuerza salto
    fuerzaSaltoJ1;
    fuerzaSaltoJ2;

    //Sonidos
    recogSonido;

    PowerUps = [];
    webManager = new WebManager(this);

    JuegoAcabaDeEmpezar=false;
    start = false;

    //#region JUGADOR 1

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 1
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ1(){
        //creacion de j1 en una pos
        
        this.j1 = this.physics.add.sprite(147, 450, 'j1');
        this.fuerzaSaltoJ1=-330;
        this.j1.setCollideWorldBounds(true);

        //Colliders J1
        this.physics.add.collider(this.j1, this.platforms);
        this.physics.add.collider(this.j1, this.movingPlatform1);
        this.physics.add.collider(this.j1, this.movingPlatform2);

        this.physics.add.overlap(this.j1, this.platforms, this.collectStar, null, this);
    }

    checkPlayer1Movement() {
        if (GlobalData.isInChat) return;
        if (!this.j1 || !this.j1.active) return; // Salir si J2 no está activo

        
            
            if (this.keyStates.a) {
                this.j1.setVelocityX(-this.velocidadJ1);
                this.j1.setFlipX(false);
                // this.j1.anims.play('left', true);
            } else if (this.keyStates.d) {
                this.j1.setVelocityX(this.velocidadJ1);
                this.j1.setFlipX(true);
                // this.j1.anims.play('right', true);
            } else {
                this.j1.setVelocityX(0);
                // this.j1.anims.play('turn');
            }
            if (this.keyStates.w && this.j1.body.touching.down) {
                this.j1.setVelocityY(this.fuerzaSaltoJ1);
            }
                
            //console.log("Métodos WebManager:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.webManager)));
              
                this.webManager.sendPlayerPosition("J1", this.j1.x, this.j1.y, this.j1.body.velocity.x, this.j1.body.velocity.y);

                this.pulsado=false
            
    }
    updateRemotePlayer1(playerData) {
        if (!this.j1) return;
        this.j1.x = playerData.x;
        this.j1.y = playerData.y;
        this.j1.body.velocity.x = playerData.vx;
        this.j1.body.velocity.y = playerData.vy;
    }

    //#endregion
    
    //#region JUGADOR 2

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 2
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ2(){
        //creacion de J2 en una pos
        this.j2 = this.physics.add.sprite(700, 450, 'j2');
        this.fuerzaSaltoJ2=-330;
        this.j2.setCollideWorldBounds(true);

        //Colliders J2
        this.physics.add.collider(this.j2, this.platforms);
        this.physics.add.collider(this.j2, this.movingPlatform1);
        this.physics.add.collider(this.j2, this.movingPlatform2);

        this.physics.add.overlap(this.j2, this.platforms, this.collectStar, null, this);
    }

    checkPlayer2Movement() {
        if (GlobalData.isInChat) return;
        if (!this.j2 || !this.j2.active) return; // Salir si J2 no está activo
    
        // const { left, right, up } = this.cursors;
        
            
            if (this.keyStates.a) {
                this.j2.setVelocityX(-this.velocidadJ2);
                this.j2.setFlipX(false);
                // this.j2.anims.play('left', true);
            } else if (this.keyStates.d) {
                this.j2.setVelocityX(this.velocidadJ2);
                this.j2.setFlipX(true);
                // this.j2.anims.play('right', true);
            } else {
                this.j2.setVelocityX(0);
                // this.j2.anims.play('turn');
            }
            if (this.keyStates.w && this.j2.body.touching.down) {
                this.j2.setVelocityY(this.fuerzaSaltoJ2);
            }
            
            this.webManager.sendPlayerPosition("J2", this.j2.x, this.j2.y, this.j2.body.velocity.x, this.j2.body.velocity.y)

    }
    updateRemotePlayer2(playerData) {
        
        this.j2.x = playerData.x;
        this.j2.y = playerData.y;
        this.j2.body.velocity.x = playerData.vx;
        this.j2.body.velocity.y = playerData.vy;
    }
    //#endregion
    
    //#region BALAS

    ///////////////////////////////////////////////////////////////////////////////////////
    // BALAS
    ///////////////////////////////////////////////////////////////////////////////////////
    //input de balas nuevo con ratón
    inputDisparoBala(){
            if (this.keyStates.mouseLeft) {
                const isMaster = GlobalData.isMaster;
                const jugador = isMaster ? this.j1 : this.j2;
                const cooldown = isMaster ? this.cooldownBalaP1 : this.cooldownBalaP2;
                const tiempoUltimoDisparo = isMaster ? this.tiempoUltimoDisparoP1 : this.tiempoUltimoDisparoP2;
                const numeroBalas = isMaster ? this.numeroBalasJ1 : this.numeroBalasJ2;
                const danio = isMaster ? this.danioJ1 : this.danioJ2;
                const velBala = isMaster ? this.velBala1 : this.velBala2;

                const currentTime = this.time.now;
            if (currentTime - tiempoUltimoDisparo < cooldown) return;

                const startX = jugador.x;
                const startY = jugador.y;

                const pointer = this.input.activePointer;
                const worldX = pointer.worldX;
                const worldY = pointer.worldY;

                const dirX = worldX - startX;
                const dirY = worldY - startY;
                const length = Math.sqrt(dirX * dirX + dirY * dirY);
                const normX = dirX / length;
                const normY = dirY / length;

                for (let i = 0; i < numeroBalas; i++) {
                    let balaOffset;
                    if (i % 2 === 0) {
                        balaOffset = (-30) + i * 10;
                    } else {
                        balaOffset = (-30) - i * 10;
                    }

                    const offsetX = normX * velBala;
                    const offsetY = normY * velBala + balaOffset;

                    //this.dispararBala(startX, startY, offsetX, offsetY, danio, velBala);
                    //paso del disparo al servidor
                    
                    this.webManager.sendDisparo(startX, startY, offsetX, offsetY,danio,velBala)
                            
                                
                            
            }

            if (isMaster) {
                this.tiempoUltimoDisparoP1 = currentTime;
            } else {
                this.tiempoUltimoDisparoP2 = currentTime;
            }
        }
    }


    dispararBala(x, y, velocidadX, velocidadY, danio, velBala) {
        const bala = this.balas.get(); // Obtener una bala disponible del grupo
        bala.vel = velBala;
        let modul = Math.sqrt(velocidadX * velocidadX + velocidadY * velocidadY);
        if (bala) {
            this.disparoSonido.play();
            console.log("sonido disparo ralizado, se va a realizar el disparo")
            bala.fire(x, y, velocidadX/modul, velocidadY/modul, danio); // Configurar la posición y velocidad
        }
    
        //Colliders
        this.physics.add.collider(bala, this.platforms, this.handleBounce, null, this);
        this.physics.add.collider(bala, this.movingPlatform1, this.handleBounce, null, this);
        this.physics.add.collider(bala, this.movingPlatform2, this.handleBounce, null, this);
        this.physics.add.collider(bala, this.j1, this.handleColision1PU, null, this);    
        this.physics.add.collider(bala, this.j2, this.handleColision2PU, null, this);
    }

    handleBounce(bala, plataforma){
        bala.body.velocity.y = -bala.body.velocity.y;
    }

    trail() {
        // Limpiar el gráfico antes de dibujar
        this.trailGraphics.clear();
    
        // Recorrer todas las balas activas
        this.balas.getChildren().forEach(bala => {
            if (bala.trailPoints.length > 1){// && bala.active == true) {
                for (let i = 1; i < bala.trailPoints.length; i++) {
                    // Calcular grosor basado en la posición del punto en el trail
                    let thickness = Phaser.Math.Linear(1, 5, i / bala.trailPoints.length);
                    this.trailGraphics.lineStyle(thickness, 0xffffff, 1); // Inicialmente blanco
                    
                    // Calcular la interpolación de color
                    let color = Phaser.Display.Color.Interpolate.ColorWithColor(
                        { r: 255, g: 125, b: 0 },   // Color de final de la bala
                        { r: 255, g: 255, b: 255 }, // Color de inicio de la bala
                        bala.trailPoints.length,    // Número total de puntos en el trail
                        i                           // Índice del punto actual
                    );
    
                    // Aplicar color interpolado y grosor calculado
                    this.trailGraphics.lineStyle(thickness, Phaser.Display.Color.GetColor(color.r, color.g, color.b), 1);
    
                    // Dibujar una línea entre el punto actual y el anterior
                    this.trailGraphics.beginPath();
                    this.trailGraphics.moveTo(bala.trailPoints[i - 1].x, bala.trailPoints[i - 1].y);
                    this.trailGraphics.lineTo(bala.trailPoints[i].x, bala.trailPoints[i].y);
                    this.trailGraphics.strokePath();
                }
            }
        });
    }  

    //#endregion

    //#region Chat

    ///////////////////////////////////////////////////////////////////////////////////////
    // CHAT
    ///////////////////////////////////////////////////////////////////////////////////////

    checkChat(){
        if(!GlobalData.imConectedToServer)
        {
            this.noConectado.setText('Necesitas estar \nconectado \nal servidor\npara abrir el chat');
            return;
        }

        if(GlobalData.isInChat) return;
        
        this.noConectado.setText('');

        if (this.keyStates.t) {
            //Quito los controles
            this.recogSonido.play();
            this.scene.launch('Chat'); 
            this.scene.bringToTop('Chat');

            GlobalData.isInChat = true;
        }
    }

    //#endregion

    //#region Otros

    ///////////////////////////////////////////////////////////////////////////////////////
    // OTROS
    ///////////////////////////////////////////////////////////////////////////////////////
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

    checkPause(){
        if(GlobalData.isInChat) return;

        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.bgMusic.pause();         
            this.scene.launch('MenuPausa'); 
            this.scene.bringToTop('MenuPausa');
        }
    }

    curarj1(cura){
        this.vida1+=cura;
        if(this.vida1>100){
            this.vida1=100;
        }
    }

    curarj2(cura){
        this.vida2+=cura;
        if(this.vida2>100){
            this.vida2=100;
        }
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

    //Teclas
    //instanceKeyboardKeys(){
    //    this.cursors = this.input.keyboard.createCursorKeys();
    //    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    //    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    //    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    //    this.J1ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    //    this.J2ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    //    this.chatKey= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        
    //}

    //Final
    acabarPartida(){    //para enseñar la pantalla de fin cuando uno de los jugadores muere
        this.webManager.sendEndGame(GlobalData.ganador); // Enviar el ganador al servidor      
    }

    endGame(){
        this.bgMusic.stop();
        
        if (GlobalData.isInChat){
            this.juego.scene.stop('Chat');
            GlobalData.isInChat = false;
        }
        
        console.log("Juego terminado, cerrando conexión WebSocket");
        this.webManager.closeConection(); // Cerrar la conexión WebSocket
        this.scene.stop('Juego');
        this.scene.stop('Ajustes');
        this.start = false;
        this.scene.start('MenuVictoriaJ1'); //carga la escena 
    }

    endToMenu(){
        this.bgMusic.stop();

        console.log("Juego terminado, cerrando conexión WebSocket");
        this.webManager.closeConection(); // Cerrar la conexión WebSocket
        this.scene.stop('Juego');
        this.start = false;
        this.scene.start('MenuInicio'); //carga la escena 
    }

    startUpdate(){
        this.start = true;
        this.JuegoAcabaDeEmpezar = false;
    }

    //Para power ups

    handleColision1(player, bala) {
        if (this.j1 && this.j1.active) {
            bala.destroy();
            if (GlobalData.isMaster) {
                this.webManager.sendDamage("J1", bala.danioBala);
            }
        }
    }

    handleColision2(player, bala) {
        if (this.j2 && this.j2.active) {
            bala.destroy();
            if (GlobalData.isMaster) {
                this.webManager.sendDamage("J2", bala.danioBala);
            }
        }
    }

    spawnPowerUp(x, y, type) {
        //let powerUp = this.powerups.get(x, y, type, this); // Usa un objeto del grupo o crea uno nuevo
        let powerUp = new PowerUp(this, x, y, type, this); // Crea un nuevo PowerUp
        if (powerUp) {
            powerUp.type = type; // Define el tipo de PowerUp
            powerUp.setActive(true).setVisible(true); // Activa y haz visible el PowerUp
            powerUp.setPosition(x, y); // Ubícalo en las coordenadas específicas
            powerUp.body.setVelocity(0, 0); // Opcional: inicializa sin velocidad
            powerUp.setCollideWorldBounds(true);
            powerUp.body.setAllowGravity(true); 
            
            this.physics.add.collider(powerUp, this.platforms);
            this.physics.add.collider(powerUp, this.movingPlatform1);
            this.physics.add.collider(powerUp, this.movingPlatform2);

            //Colliders
            this.physics.add.collider(powerUp, this.j1, this.handleColision1PU, null, this);   
            this.physics.add.collider(powerUp, this.j2, this.handleColision2PU, null, this);

            //this.webManager.sendItem(powerUp.id, powerUp.x, powerUp.y, powerUp.type, false, "J1"); // Enviar el PowerUp al servidor   

            this.PowerUps.push(powerUp); // Añade el PowerUp al array de PowerUps
            console.log('PowerUp creado con ID: ' + powerUp.id);

            return powerUp; // Devuelve el PowerUp creado
        }
    }

    handleColision1PU(powerUp, jugador){
        //this.powerUpTake.play();
        console.log('J1 coge el PowerUp');
        console.log(this.danioJ1);
        //powerUp.destroy();
        //powerUp.collected(this.j1,this.j1,this.j2);
        //this.recogSonido.play();
        console.log(this.danioJ1);    
        this.webManager.sendItem(powerUp.id, powerUp.x, powerUp.y, powerUp.type, true, "J1"); // Enviar el PowerUp al servidor      
    }

    handleColision2PU(powerUp, jugador){
        //this.powerUpTake.play();
        console.log('J2 coge el PowerUp');
        console.log(this.danioJ2);
        //powerUp.destroy();
        //powerUp.collected(this.j2,this.j1,this.j2);
        //this.recogSonido.play();
        console.log(this.danioJ2);
        this.webManager.sendItem(powerUp.id, powerUp.x, powerUp.y, powerUp.type, true, "J2"); // Enviar el PowerUp al servidor  
    }

    takeItem(idPwUp, jugador){
        var powerUp = this.PowerUps.find(item => item.id === idPwUp); // Busca el PowerUp por su ID
    
        this.PowerUps = this.PowerUps.filter(item => item !== powerUp); // Elimina el PowerUp del array
        this.recogSonido.play();
        powerUp.destroy(); // Destruye el PowerUp
        if(jugador == "J1"){
            powerUp.collected(this.j1,this.j1,this.j2);
        }
        if(jugador == "J2"){
            powerUp.collected(this.j2,this.j1,this.j2);
        }
        console.log('PowerUp recogido por ' + jugador + ': ' + powerUp.type);
    }

    addItem(powerUp){ // Crea un PowerUp real usando tu grupo de Phaser
        if (this.PowerUps.find(item => item.id === powerUp.id)) {
            console.log('PowerUp con ID ' + powerUp.id + ' ya existe, no se creará de nuevo.');
            return; // Si el PowerUp ya existe, no lo creamos de nuevo
        }
        var newPowerUp = this.spawnPowerUp(powerUp.x, powerUp.y, powerUp.type); // Re-spawnea el PowerUp
        newPowerUp.id = powerUp.id; // Asigna el ID del PowerUp recibido

        console.log('PowerUp creado con ID: ' + powerUp.id);
    }

    createPowerUp(){
        let randomType = Phaser.Utils.Array.GetRandom(Object.values(PowerUps));
        let x;
        let y;
        let numberOfPositions = 5;
        let ramdomPos = Math.floor(Math.random()*(numberOfPositions+1));
        x = ramdomPos * 100;
        y = 0;
        this.spawnPowerUp(x,y,randomType);
    }

    //collectStar (j1, star)
    //{
    //    star.disableBody(true, true);
    //}
    //#endregion
    
    //#region Preload
    //////////////////////////////////////¡/////////////////////////////////////////////////
    // PRELOAD
    ///////////////////////////////////////////////////////////////////////////////////////
    preload ()
    {
        

        switch (usuario.color1) {
            case 1:
                this.load.image('j1', 'assets/jugador/PersonajesA.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 2:
                this.load.image('j1', 'assets/jugador/PersonajesV.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 3:
                this.load.image('j1', 'assets/jugador/PersonajesN.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 4:
                this.load.image('j1', 'assets/jugador/PersonajesR.png', { frameWidth: 60, frameHeight: 70 });
                break;
        }

        switch (usuario.color2) {
            case 1:
                this.load.image('j2', 'assets/jugador/PersonajesA.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 2:
                this.load.image('j2', 'assets/jugador/PersonajesV.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 3:
                this.load.image('j2', 'assets/jugador/PersonajesN.png', { frameWidth: 60, frameHeight: 70 });
                break;
            case 4:
                this.load.image('j2', 'assets/jugador/PersonajesR.png', { frameWidth: 60, frameHeight: 70 });
                break;
        }
        

        this.load.image('marcoVida', 'assets/jugador/MarcoVida.png');
        this.load.image('vida', 'assets/jugador/Vida.png');  
        
        GlobalData.initPlay = false;
        
        console.log("Abrir conexión WebSocket al iniciar la escena");
        this.webManager.openConnection(); // Abrir la conexión WebSocket al iniciar la escena

        
    }
    //#endregion
    
    //#region Create
    ///////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    ///////////////////////////////////////////////////////////////////////////////////////
    create ()
    {
        this.input.keyboard.on('keydown', (event) => {
            const key = event.key.toLowerCase();
            if (key in this.keyStates) {
                this.keyStates[key] = true;
            }
        });

        this.input.keyboard.on('keyup', (event) => {
            const key = event.key.toLowerCase();
            if (key in this.keyStates) {
                this.keyStates[key] = false;
            }
        });

        //parte ratón
        this.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.keyStates.mouseLeft = true;
            }
        });

        this.input.on('pointerup', (pointer) => {
            if (pointer.leftButtonReleased()) {
                this.keyStates.mouseLeft = false;
            }
        });

        for (let key in this.keyStates) {
            this.keyStates[key] = false;
        }
        
        GlobalData.playing = true;
        ////////////Inputs extra//////////////////////////////
        //para comprobar la Pulsación de space
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //Comprobamos que se usa el escape
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        ////////////Configuracion de la musica//////////////////
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.setVolume(GlobalData.volumen); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

        this.recogSonido = this.sound.add('powerUpTake');
        this.recogSonido.setVolume(GlobalData.volumen);
        this.disparoSonido = this.sound.add('shoot');
        this.disparoSonido.setVolume(GlobalData.volumen);

        //danio inicial
        this.danioJ1 = 10;
        this.danioJ2 = 10;

        //Velocidad inicial
        this.velocidadJ1 = 160;
        this.velocidadJ2 = 160;

        //Velocidad bala
        this.velBala1 = 700;
        this.velBala2 = 700;
        
        //Velocidad bala
        this.j1PUs = 0;
        this.j2PUs = 0;

        //Numero de balas
        this.numeroBalasJ1=1;
        this.numeroBalasJ2=1;

        //Añadimos el cielo
        this.add.image(400, 300, 'sky');

        //this.scene.start('EstadoServidor');
        
        
        //creamos plataformas
        this.platforms = this.physics.add.staticGroup();
 
        //suelo
        const ground = this.platforms.create(400, 568, 'ground');   //suelo
        ground.displayWidth = 810;  //nuevo tamaño
        ground.refreshBody();   //actualizamos hitbox
        
         this.plat1=this.platforms.create(100, 300, 'plataforma');  //platf izq medio
         this.plat2=this.platforms.create(700, 300, 'plataforma');  //platf der medio
         //this.plat3=this.platforms.create(400, 200, 'plataforma');  //platf centro alto
         //this.plat4=this.platforms.create(150, 100, 'plataforma');  //platf centro alto
         //this.plat4.displayWidth = 300;  //cambiamos el tamaño de plat4
         //this.plat4.refreshBody();  //actualizamos la hitbox al nuevo tamaño

        //plataforma movil 1 (abajo)
        this.movingPlatform1 = this.physics.add.image(400, 400, 'plataforma');   
        this.movingPlatform1.setScale(1.2,1);

        this.movingPlatform1.setImmovable(true);
        this.movingPlatform1.body.allowGravity = false;
        //this.movingPlatform1.setVelocityX(50); <-------------------------Aqui se mueven las platafomas

        //plataforma movil 2
        this.movingPlatform2 = this.physics.add.image(410, 250, 'plataforma');   
        this.movingPlatform2.setScale(1.2,1);

        this.movingPlatform2.setImmovable(true);
        this.movingPlatform2.body.allowGravity = false;
        //this.movingPlatform2.setVelocityY(50); <-------------------------Aqui se mueven las platafomas


        //jugadores
        this.createJ1();
        this.createJ2();

        this.j1.setFlipX(true);
       
        //Colliders entre los jugadores
        this.physics.add.collider(this.j1, this.j2);

        // Crear un grupo para las balas
        this.balas = this.physics.add.group({
            classType: Bala,        // Especificar la clase personalizada
            maxSize: 30,            // Número máximo de balas activas
            runChildUpdate: true    // Ejecutar el método `update` en cada bala
           
        });
        //variables para el cooldown de la bala
        this.cooldownBalaP1=500;       //tiempo entre bala y bala en ms (5 seg)
        this.cooldownBalaP2=500;       //tiempo entre bala y bala en ms (5 seg)
        this.tiempoUltimoDisparoP1 = 0; // Inicializa el tiempo del último disparo
        this.tiempoUltimoDisparoP2 = 0; // Inicializa el tiempo del último disparo

            
        // Crear el objeto trail, que será el contorno del camino de las balas
        this.trailGraphics = this.add.graphics({ lineStyle: { width: 2, color: 0xFFFFFF } });

        // Colisiones entre balas y jugadores
        this.physics.add.collider(this.balas, this.j1, this.handleColision1, null, this);

        this.physics.add.collider(this.balas, this.j2, this.handleColision2, null, this);

    //this.instanceKeyboardKeys();

        //Marcadores de vida;
        const recuadro2 = this.add.image(700, 568, 'marcoVida');
        this.vidaLabel2 = this.add.image(700, 568, 'vida');

        const recuadro1 = this.add.image(100, 568, 'marcoVida');
        this.vidaLabel1 = this.add.image(100, 568, 'vida');

        this.vida1 = 100
        this.vida2 = 100

        // Crear un grupo para los powerups
        this.powerups = this.physics.add.group({
            classType: PowerUp,
            maxSize: 2,            // Número máximo de powerups activas           
        });

        this.startWaitForSinchronization();

        
        this.noConectado = this.add.text(150, 50, '' , { 
            fill: '#f00', 
            fontSize: 20,
            stroke: '#000',
            strokeThickness: 2  
        }).setOrigin(0.5, 0.5);
    }

    startWaitForSinchronization() {           
        this.scene.launch('EsperaSincronizacion'); // Inicia la escena sin parar la actual
        this.scene.bringToTop('EsperaSincronizacion');
    }

    createPowerUps(){
        this.time.addEvent({
                delay: 10000,        // Milisegundos
                callback: () => {
                    if(this.start === false || GlobalData.initPlay === false) return;
                    this.createPowerUp();
                },
                callbackScope: this,
                loop: true          // Se repite indefinidamente
            });
    }

    //#endregion
    
    //#region Update    
    ///////////////////////////////////////////////////////////////////////////////////////
    // UPDATE
    ///////////////////////////////////////////////////////////////////////////////////////
    reiniciarPlataformas(){
        //this.movingPlatform1.setVelocityX(50);
        //this.movingPlatform1.x = 
        this.movingPlatform2.setVelocityY(-50);
        this.movingPlatform2.x = 410;
        this.movingPlatform2.y = 250;
        this.JuegoAcabaDeEmpezar = true;
        console.log("Coordinando plataformas");
    }

    update ()
    {       
        
        //Plataformas
        //pataforma móvil 1 (abajo)
        //if (this.movingPlatform1.x >= 500)
        //{
        //    this.movingPlatform1.setVelocityX(-50);
        //}
        //else if (this.movingPlatform1.x <= 300)
        //{
        //    this.movingPlatform1.setVelocityX(50);
        //}
        //plataforma móvil 2 (arriba)
        if (this.movingPlatform2.y > 250)
        {
            this.movingPlatform2.setVelocityY(-50);
            this.webManager.sendPlatform();
        }
        else if (this.movingPlatform2.y <= 125)
        {
            this.movingPlatform2.setVelocityY(50);
        }


        if(this.start === false || GlobalData.initPlay === false || GlobalData.noPlaying ) return; // Si no se ha iniciado el juego, no hacemos nada

        //platamorfas móviles
        
        if(!this.JuegoAcabaDeEmpezar)
        {            
            //this.movingPlatform1.setVelocityX(50);
            this.movingPlatform2.setVelocityY(50);
            this.JuegoAcabaDeEmpezar = true;
        }

        if(GlobalData.volumenCambiado){
            this.bgMusic.setVolume(GlobalData.volumen);
            GlobalData.volumenCambiado = false;
        }
        if(GlobalData.playing === false){            
            GlobalData.playing = true;
        }

        if (this.vida2<=0) //para comprobar que la pantalla de victoria funciona
        {
            GlobalData.ganador=1;
            this.acabarPartida();
            return; // Detenemos aquí el ciclo de actualización
        }else if (this.vida1<=0){
            GlobalData.ganador=2;
            this.acabarPartida();
            return; // Detenemos aquí el ciclo de actualización
        }

        if(this.bgMusic.isPaused){
            this.bgMusic.resume();
        }

        //Movimiento personajes
        this.j1.body.setVelocityX(0)
        this.j2.body.setVelocityX(0)
        if(GlobalData.isMaster){
            this.checkPlayer1Movement();
        }
        else{
            this.checkPlayer2Movement();
        }
        
        //Disparo
        this.trail();
        
        this.currentTime = this.time.now; // Tiempo actual

        if (Math.abs(this.j1.body.velocity.x) > 10) {
            this.lastJ1Vel = this.j1.body.velocity.x;
        }

        //console.log('lastJ1Vel: ' + this.lastJ1Vel);

        if (Math.abs(this.j2.body.velocity.x) > 10) {
            this.lastJ2Vel = this.j2.body.velocity.x;
        }

        //gestionamos el disparo
        this.inputDisparoBala();

        this.checkPause();

        //Cambiar el tamaño y la posición de la barra de vida

         this.vidaLabel1.displayWidth = ((this.vida1) / 100) * 180;
         var tam1 = this.vidaLabel1.width;
        // this.vidaLabel1.setOrigin(700, 568);

         this.vidaLabel2.displayWidth = ((this.vida2)/ 100) * 180;
         var tam2 = this.vidaLabel2.width;
        // this.vidaLabel2.setOrigin(100, 568);

        //Abrir chat

        this.checkChat();

        if(GlobalData.isInChat){
            Object.keys(this.keyStates).forEach(key => {
                this.keyStates[key] = false;
            });        
        }
        
    }
}