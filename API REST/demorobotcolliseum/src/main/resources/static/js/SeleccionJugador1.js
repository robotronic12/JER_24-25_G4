class SeleccionJugador1 extends Phaser.Scene {
    constructor() {
        super({ key: 'SeleccionJugador1' });

    }
    color1;
    preload() {
        //Cargo los audios con this.load.audio("path")
        this.load.audio("select", "assets/musica/click.mp3");
        this.load.audio("background", "assets/musica/menuMusic.mp3"); //y les pongo sus respestivas etiquetas

        //cargamos fondo de título 
        //this.load.image('fondo',"assets/entorno/fondo.png");

        //Cargo los botones
        this.load.image('seleccionar', 'assets/botones/Seleccionar.png');

        this.load.image('verde', 'assets/botones/jVerde.png');
        this.load.image('rojo', 'assets/botones/jRojo.png');
        this.load.image('azul', 'assets/botones/jAzul.png');
        this.load.image('naranja', 'assets/botones/jNaranja.png');

        this.load.image('fondo', "assets/entorno/fondo.png");
       
        //Cargo Fuentes



    }

    create() {
        const fondo = this.add.image(400, 400, 'fondo'); // Creamos el fondo
        this.color1=0;
        //añadimos título
        const titulo = this.add.text(75+30+155, 50, 'Jugador 1', {
            fontFamily: 'Poppins',
            fontSize: '55px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
            
        })
        const jugador1 = this.add.text(270, 120, 'Selecciona a tu robot', {
            fontFamily: 'Poppins',
            fontSize: '25px',
            color: '#ffffff',
            fontStyle: 'bold'
        })
        const seleccionar = this.add.image(400, 500, "seleccionar")
        
        let seleccionadoText;

        const crearSeleccionadoText = (x, y) => {
            if (seleccionadoText) {
                this.tweens.add({
                    targets: seleccionadoText,
                    alpha: 0,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        seleccionadoText.destroy();
                        seleccionadoText = this.add.text(x, y, 'Seleccionado', {
                            fontFamily: 'Poppins',
                            fontSize: '20px',
                            color: '#ffffff'
                        });

                        seleccionadoText.setAlpha(0);
                        this.tweens.add({
                            targets: seleccionadoText,
                            alpha: 1,
                            duration: 500,
                            ease: 'Power2'
                        });
                    }
                });
            } else {
                seleccionadoText = this.add.text(x, y, 'Seleccionado', {
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    color: '#ffffff'
                });

                seleccionadoText.setAlpha(0);
                this.tweens.add({
                    targets: seleccionadoText,
                    alpha: 1,
                    duration: 500,
                    ease: 'Power2'
                });
            }
        };

        const azul = this.add.image(115, 300, "azul")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=1; 
                titulo.setColor('#0000ff'); // Cambia a rojo
                crearSeleccionadoText(50, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
                
            });

        const verde = this.add.image(310, 300, "verde")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=2; 
                titulo.setColor('#00ff00');
                crearSeleccionadoText(245, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
            });

        const naranja = this.add.image(505, 300, "naranja")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=3; 
                titulo.setColor('#ffa500');
                crearSeleccionadoText(440, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
            });

        const rojo = this.add.image(700, 300, "rojo")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=4; 
                titulo.setColor('#ff0000'); // Cambia a rojo
                crearSeleccionadoText(635, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
            });



    }

    update() { 
    } //se puede poner un delta 

}
