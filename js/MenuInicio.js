class MenuInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuInicio' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", 'assets/musica/click.mp3'); 
        this.load.audio("background", 'assets/musica/menuMusic.mp3'); //y les pongo sus respestivas etiquetas

        //Cargo los botones
        this.load.image("jugar", "assets/botones/Jugar.png");
        this.load.image("opciones", "assets/botones/Opciones.png");
        this.load.image("salir", "assets/botones/Salir.png");


        
    }

    create() {
        const hello_text = this.add.text(150, 50, 'Robot Coliseum', { fill: '#0f0', fontSize: 42 })

        //Configuracion de la musica
        this.bgMusic = this.sound.add('background'); //pongo la musica del menu
        this.bgMusic.loop = true; //que sea loop
        this.bgMusic.play(); //que suene

        const jugar = this.add.image(400, 300, "jugar") //A�ado la imagen de start 
            .setInteractive(true) /*Hago que sea interactivo*/
            .on/*Hace algo mira el que*/('pointerdown', /*Creo una funcion anonima*/(/*no recibe ningun parametros*/) => {
                this.sound.play("select"); //que suene el sonido de play
                this.scene.stop("IntroScene"); //carga la escena de intro
               this.scene.start("Juego"); //carga la escena de game
        });
        const opciones = this.add.image(400, 375, "opciones");
        const salir = this.add.image(400, 450, "salir");
        

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }

    update() {} //se puede poner un delta 

}
