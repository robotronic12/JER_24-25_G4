class MenuInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuInicio' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio('select', 'assets/musica/click.mp3'); 
        this.load.audio('background', 'assets/musica/menuMusic.mp3'); //y les pongo sus respestivas etiquetas
        
        //Cargo los botones
        this.load.image('start_button', 'assets/botones/Jugar.png');
        this.load.image('opciones', 'assets/botones/Opciones.png');
        this.load.image('salir', 'assets/botones/Salir.png');


        
    }

    create() {
        const hello_text = this.add.text(150, 50, 'Robot Coliseum', { fill: '#0f0', fontSize: 42 })

        //Configuracion de la musica
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.setVolume(0); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

        const start_button = this.add.image(400, 300, "start_button")
        .setInteractive()
        .on('pointerdown',() => {
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
        

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }

    update() {} //se puede poner un delta 

}
