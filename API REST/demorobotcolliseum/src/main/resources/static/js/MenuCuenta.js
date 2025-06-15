class MenuCuenta extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuCuenta' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("background", "assets/musica/menuMusic.mp3"); //y les pongo sus respestivas etiquetas
        
        //cargamos fondo de título 
        this.load.image('fondo',"assets/entorno/fondo.png");
        
        //Cargo los botones
        this.load.image('start_button', 'assets/botones/Jugar.png');
        this.load.image('opciones', 'assets/botones/Opciones.png');
        this.load.image('salir', 'assets/botones/Salir.png');

        //Cargo icono de usuario conectado/no conectado

      

        this.load.image('vestir', 'assets/botones/Vestir.png');
        //Cargo Fuentes

        

        
    }

    create() {
        
        GlobalData.playing = false;
        //cargamos imagen de fondo
        const fondo = this.add.image(0, 0, 'fondo'); // Creamos el fondo
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  //ajustamos la imagen al tamaño del fondo que es (800x600)
        //añadimos título
        const titulo = this.add.text(150, 75, 'Robot Coliseum', {            
                fontFamily: 'Poppins', 
                fontSize: '60px',
                color: '#ffffff', 
                fontStyle: 'bold'
        })
        const copyright = this.add.text(560, 575, 'Two Chain Studios ©', { fill: '#ffff', fontSize: 20 })
        const ver = this.add.text(10, 575, 'Ver 1.0', { fill: '#ffff', fontSize: 20 })

        //Configuracion de la musica
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.setVolume(GlobalData.volumen); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

         //estado de conexión del jugador
        const icono_conect = this.add.image(500, 60, 'user_conect');

        

        const start_button = this.add.image(400, 300, "start_button")
        .setInteractive()
        .on('pointerdown',() => {
            if(!GlobalData.imConectedToServer) return;
            GlobalData.playing = true;
            this.sound.play('select'); //que suene el sonido de play
            this.scene.stop('MenuInicio'); //carga la escena de intro
            this.scene.start('Juego'); //carga la escena de game
        });
        const salir = this.add.image(400, 450, 'salir');
        
        salir.setInteractive().on('pointerdown', () => {
            console.log('Botón de Salir clickeado');
            // Intentar cerrar la ventana si es posible
            window.close();
        });

        const opciones = this.add.image(400, 375, 'opciones');
        opciones.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); //que suene el sonido de play
            this.scene.stop('MenuInicio'); //carga la escena de intro
            this.scene.start('Ajustes'); //carga la escena de game
        });
        
        const vestir = this.add.image(750, 530, 'vestir');
        
        vestir.setInteractive().on('pointerdown', () => {
            if(!GlobalData.imConectedToServer) return;
            this.sound.play('select'); //que suene el sonido de play
            this.scene.stop('MenuInicio'); //carga la escena de intro
            this.scene.start('SeleccionJugador1'); //carga la escena de game
        });

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }
    update() {} //se puede poner un delta 

}
