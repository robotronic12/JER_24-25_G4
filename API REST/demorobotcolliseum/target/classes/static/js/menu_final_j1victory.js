class menu_final_j1victory extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuVictoriaJ1' });
    }

    preload() {
        //Cargo los audios con this.load.audio("path")
		this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("victory", "assets/musica/victory.mp3"); //y les pongo sus respestivas etiquetas
        //cargamos fondo de título 
        //this.load.image('fondo',"assets/entorno/fondo.png");
        //Cargo los botones
        //this.load.image('start_button', 'assets/botones/Jugar.png');
        //this.load.image('opciones', 'assets/botones/Opciones.png');
        this.load.image('salir', 'assets/botones/Salir.png');


        
    }

    create() {
        //cargamos imagen de fondo
        //const fondo = this.add.image(0, 0, 'fondo'); // Creamos el fondo
        //fondo.setOrigin(0, 0);
        //fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  //ajustamos la imagen al tamaño del fondo que es (800x600)
        //añadimos título
        if(GlobalData.ganador===1){
            const textoGanador1 = this.add.text(175, 100, 'Ganador: Jugador 1', { 
                fontFamily: 'Poppins', 
                fontSize: '42px',
                color: '#ffffff', 
                fontStyle: 'bold'
            })
        }else if(GlobalData.ganador===2){
            const textoGanador2 = this.add.text(175, 100, 'Ganador: Jugador 2', { 
                fontFamily: 'Poppins', 
                fontSize: '42px',
                color: '#ffffff', 
                fontStyle: 'bold' 
            })
        }
        
        const start_button = this.add.image(400, 300, "start_button")
        .setInteractive()
        .on('pointerdown',() => {
            this.noConectado = this.setText(400, 300, '', { fill: '#ffff', fontSize: 20 });
            if(!GlobalData.imConectedToServer) 
            {
                this.noConectado = this.setText(400, 370, 'Necesitas estar \nconectado \nal servidor', { 
                    fill: '#f00', 
                    fontSize: 20,
                    stroke: '#000',
                    strokeThickness: 2  
                }).setOrigin(0.5, 0.5);
                
                return;
            }
                this.sound.play('select'); //que suene el sonido de play
                this.scene.stop('MenuInicio'); //carga la escena de intro
                this.scene.start('Juego'); //carga la escena de game
        });

        //Configuracion de la musica
        this.bgMusic = this.sound.add('victory'); //pongo la musica del menu
        this.bgMusic.setVolume(0.1); // Cambiar volumen (por ejemplo, 50% del volumen máximo)
        this.bgMusic.loop = false; //que sea no sea loop
        this.bgMusic.play(); //que suene
        
        const salir = this.add.image(400, 450, 'salir');
        
        salir.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); //que suene el sonido de play
            this.bgMusic.stop(); //que deje de sonar
            this.scene.stop('MenuVictoriaJ1'); //carga la escena de game
            this.scene.start('MenuInicio'); //carga la escena de game
            console.log('Botón de Salir clickeado');
           
        });

        /*const start_button = this.add.image(400, 300, "start_button")
        .setInteractive()
        .on('pointerdown',() => {
                
                
               
        });*/
        
        
    }

    update() {} //se puede poner un delta 

}
