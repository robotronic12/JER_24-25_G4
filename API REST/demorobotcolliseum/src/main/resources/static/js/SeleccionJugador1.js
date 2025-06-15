class SeleccionJugador1 extends Phaser.Scene {
    constructor() {
        super({ key: 'SeleccionJugador1' });

    }
    color1;

    sendColor(){
        // var username = usuario.username;

        // const user = {
        //     username : usuario.username,
        //     password : usuario.password,
        //     color1 : usuario.color1,
        //     color2 : usuario.color2
        // }
        // console.log(username);

        fetch('/api/users/actualize', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la peticion al servidor');
            }
            return response.json(); // Si el servidor devuelve JSON
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            console.log('Color1 = ', usuario.color1);
            console.log('Color2 = ', usuario.color2);
            // Aquí puedes manejar la respuesta del servidor
        })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar errores
        });
    }

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
                this.color1 = 1; 
                usuario.color1 = 1; // Asigna el color seleccionado al objeto usuario
                titulo.setColor('#0000ff'); // Cambia a rojo
                crearSeleccionadoText(50, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.sendColor();
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
                
            });

        const verde = this.add.image(310, 300, "verde")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=2; 
                usuario.color1 = 2; // Asigna el color seleccionado al objeto usuario
                titulo.setColor('#00ff00');
                crearSeleccionadoText(245, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.sendColor();
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
            });

        const naranja = this.add.image(505, 300, "naranja")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=3; 
                usuario.color1 = 3; // Asigna el color seleccionado al objeto usuario
                titulo.setColor('#ffa500');
                crearSeleccionadoText(440, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.sendColor();
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('SeleccionJugador2'); //carga la escena de game
                });
            });

        const rojo = this.add.image(700, 300, "rojo")
            .setInteractive()
            .on('pointerdown', () => {
                this.color1=4; 
                usuario.color1 = 4; // Asigna el color seleccionado al objeto usuario
                titulo.setColor('#ff0000'); // Cambia a rojo
                crearSeleccionadoText(635, 400);
                seleccionar.setInteractive().on('pointerdown', () => {
                    this.sendColor();
                    this.scene.stop('SeleccionJugador1'); //carga la escena de intro
                    this.scene.start('MenuInicio'); //carga la escena de game
                });
            });



    }

    update() { 
        if(!GlobalData.imConectedToServer){
            this.scene.stop('SeleccionJugador1'); //carga la escena de intro
            this.scene.start('MenuInicio'); //carga la escena de game
        }
    } //se puede poner un delta 

}
