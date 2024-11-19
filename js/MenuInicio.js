class MenuInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuInicio' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("background", "assets/musica/menuMusic.mp3"); //y les pongo sus respestivas etiquetas
        
        //Cargo los botones
        this.load.image("start_button", "/assets/botones/Jugar.png");
        //this.load.image("help_button", "assets/help-button.svg");
        //this.load.image("config_button", "assets/config-button.svg");

        
    }

    create() {
        const hello_text = this.add.text(150, 50, 'Robot Coliseum', { fill: '#0f0', fontSize: 42 })

        //Configuracion de la musica
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

        const start_button = this.add.image(400, 300, "start_button") //A�ado la imagen de start 
            .setInteractive(true) /*Hago que sea interactivo*/
            .on/*Hace algo mira el que*/('pointerdown', () => {
                this.sound.play("select"); 
        });
        

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }

    update() {} //se puede poner un delta 

}
