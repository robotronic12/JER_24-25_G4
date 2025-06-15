class MenuInicio extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuInicio' });
    }

    eliminarCuenta = false

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
        
        const vestir = this.add.image(750, 530, 'vestir').setOrigin(0.5, 0.5);
        vestir.setInteractive().on('pointerdown', () => {
            this.noConectado = this.add.text(750, 530, '', { fill: '#ffff', fontSize: 20 });
            if(!GlobalData.imConectedToServer) 
            {
                this.noConectado = this.add.text(700, 460, 'Necesitas estar \nconectado \nal servidor', { 
                    fill: '#f00', 
                    fontSize: 20,
                    stroke: '#000',         // Color del borde (por ejemplo, negro)
                    strokeThickness: 2  
                }).setOrigin(0.5, 0.5);
                
                return;
            }
            this.sound.play('select'); //que suene el sonido de play
            this.scene.stop('MenuInicio'); //carga la escena de intro
            this.scene.start('SeleccionJugador1'); //carga la escena de game
        });

        const eliminarUsuario = this.add.image(750, 530, 'eliminarUsuario').setOrigin(0.5, 0.5);    
        
        eliminarUsuario.setInteractive().on('pointerdown', () => {
            if(this.eliminarCuenta === false){
                this.eliminarCuenta = true;
                const seguro = this.add.text(560, 575, '¿Estás seguro de eliminar tu tuerca (cuenta)?', { 
                    fill: '#f00', 
                    fontSize: 20,
                    stroke: '#000',
                    strokeThickness: 2
                }).setOrigin(0.5, 0.5); 
            }else{
                fetch(`/api/users/${usuario.username}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error petición de login no disponible');
                    }
                    this.scene.stop('MenuInicio');   
                    this.scene.start('MenuLogin');
                    this.scene.stop('EstadoServidor');
                    return response.json();
                })                    
                .catch(error => {
                    console.error('Error:', error);
                    const seguro = this.add.text(560, 575, 'No se pudo eliminar la cuenta', { 
                        fill: '#f00', 
                        fontSize: 20,
                        stroke: '#000',
                        strokeThickness: 2
                    }).setOrigin(0.5, 0.5); 
                    
                    // Mostrar mensaje de error al usuario
                });
            }
        });

        this.events.on('shutdown', () => { this.bgMusic.stop(); }); 
        
    }
    update() {} //se puede poner un delta 

}
