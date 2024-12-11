class MenuLogin extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuLogin' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("background", "assets/musica/menuMusic.mp3");
        //Cargo los botones
        this.load.image('volver', 'assets/botones/Volver.png');
        this.load.image('opciones', 'assets/botones/Opciones.png');
        this.load.image('salir', 'assets/botones/Salir.png');
    }

    create() {     

        // Añadimos título
        const titulo = this.add.text(280, 100, 'Pausa', { 
            fontFamily: 'Poppins', 
            fontSize: '75px',
            color: '#ffffff', 
            fontStyle: 'bold' 
        });

        //Configuracion de la musica
        //this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        //this.bgMusic.setVolume(0); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        //this.bgMusic.loop = true; //que sea loop
        //this.bgMusic.play(); //que suene

        const start_button = this.add.image(400, 300, "volver")
        .setInteractive()
        .on('pointerdown',() => {
                this.sound.play('select'); //que suene el sonido de play
                this.scene.stop('MenuPausa'); //carga la escena de intro
                this.scene.resume('Juego'); //carga la escena de game
        });

        const opciones = this.add.image(400, 375, 'opciones');
        opciones.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); //que suene el sonido de play
            this.scene.stop('MenuPausa'); //carga la escena de intro
            this.scene.launch('Ajustes'); //carga la escena de game
        });

        const salir = this.add.image(400, 450, 'salir');        
        salir.setInteractive().on('pointerdown', () => {            
            this.sound.play('select'); 
            this.scene.stop('MenuPausa'); 
            this.scene.stop('Juego'); 
            this.scene.start('MenuInicio'); 
            GlobalData.playing = false;
        });

        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        

        //this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.wake('Juego')
            this.scene.stop('MenuPausa'); 
        }

    } 

}