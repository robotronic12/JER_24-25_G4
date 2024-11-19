class MenuInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuInicio' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("background", "assets/musica/menuMusic.mp3"); //y les pongo sus respestivas etiquetas
        //cargamos fondo de título 
        this.load.image('fondo',"assets/entorno/fondo.png");
        //Cargo los botones
        this.load.image("start_button", "/assets/botones/Jugar.png");
        //this.load.image("help_button", "assets/help-button.svg");
        //this.load.image("config_button", "assets/config-button.svg");

        
    }

    create() {
        //cargamos imagen de fondo
        const fondo = this.add.image(0, 0, 'fondo'); // Creamos el fondo
        fondo.setOrigin(0, 0);
        fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  //ajustamos la imagen al tamaño del fondo que es (800x600)
        //añadimos título
        const hello_text = this.add.text(150, 50, 'Robot Coliseum', { fill: '#0f0', fontSize: 42 })
        

        //Configuracion de la musica
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

        const start_button = this.add.image(400, 300, "start_button") //A�ado la imagen de start 
            .setInteractive(true) /*Hago que sea interactivo*/
            .on/*Hace algo mira el que*/('pointerdown', /*Creo una funcion anonima*/(/*no recibe ningun parametros*/) => {
                this.sound.play("select"); //que suene el sonido de play
                //this.scene.stop("IntroScene"); //carga la escena de intro
                //this.scene.start("GameScene"); //carga la escena de game
        });
        //const config_button = this.add.image(400, 375, "config_button");
        //const help_button = this.add.image(400, 450, "help_button");
        

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }

    update() {} //se puede poner un delta 

}
