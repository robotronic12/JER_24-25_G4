class SeleccionJugador2 extends Phaser.Scene {
    constructor() {
        super({ key: 'SeleccionJugador2' });

    }
    color2;
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
        this.color2=0;
        //añadimos título
        const titulo = this.add.text(75+30+155, 50, 'Jugador 2', {
            fontFamily: 'Verdana',
            fontSize: '55px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        })
        const jugador1 = this.add.text(270, 120, 'Selecciona a tu robot', {
            fontFamily: 'Verdana',
            fontSize: '25px',
            color: '#ffffff',
            fontStyle: 'bold',
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
                this.color2=1; 
                titulo.setColor('#0000ff'); // Cambia a azul
                crearSeleccionadoText(50, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador2'); //carga la escena de intro
                    this.scene.start('MenuInicio'); //carga la escena de game
                });
                //Aqui va el fetch
                
            });

        const verde = this.add.image(310, 300, "verde")
            .setInteractive()
            .on('pointerdown', () => {
                this.color2=2; 
                titulo.setColor('#00ff00'); // Cambia a azul

                crearSeleccionadoText(245, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador2'); //carga la escena de intro
                    this.scene.start('MenuInicio'); //carga la escena de game
                });
                //Aqui va el fetch
            });

        const naranja = this.add.image(505, 300, "naranja")
            .setInteractive()
            .on('pointerdown', () => {
                this.color2=3; 
                titulo.setColor('#ffa500'); // Cambia a naranja
                crearSeleccionadoText(440, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador2'); //carga la escena de intro
                    this.scene.start('MenuInicio'); //carga la escena de game
                });
                //Aqui va el fetch
            });

        const rojo = this.add.image(700, 300, "rojo")
            .setInteractive()
            .on('pointerdown', () => {
                this.color2=4; 
                titulo.setColor('#ff0000'); // Cambia a naranja
                crearSeleccionadoText(635, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.scene.stop('SeleccionJugador2'); //carga la escena de intro
                    this.scene.start('MenuInicio'); //carga la escena de game
                });
                //Aqui va el fetch
            });



    }

    update() { 
    } //se puede poner un delta 

}
