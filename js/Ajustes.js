class Ajustes extends Phaser.Scene {
    constructor() {
        super({ key: 'Ajustes' });
    }

    preload() {
        // Cargamos los audios
        this.load.audio("select", "assets/musica/click.mp3"); 
        this.load.audio("background", "assets/musica/menuMusic.mp3"); // y les ponemos sus respectivas etiquetas
        
        // Cargamos fondo de título
        this.load.image('fondo', "assets/entorno/fondo.png");
        
        // Cargamos los botones
        this.load.image('volumen', 'assets/botones/Volumen.png');
        this.load.image('volver', 'assets/botones/Volver.png');
        this.load.image('base', 'assets/botones/Base.png');
        this.load.image('der', 'assets/botones/Der.png');
        this.load.image('izq', 'assets/botones/Izq.png');
    }

    create() {

        if(!GlobalData.playing){
            // Cargamos imagen de fondo
            const fondo = this.add.image(0, 0, 'fondo');
            fondo.setOrigin(0, 0);
            fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  // Ajustamos la imagen al tamaño del fondo
        }        
        
        // Añadimos título
        const titulo = this.add.text(250, 100, 'Ajustes', { fill: '#0f0', fontSize: 75 });

        // Configuración de la música
        this.bgMusic = this.sound.add('background');
        this.bgMusic.setVolume(GlobalData.volumen.toFixed(2)); // Volumen inicial (por ejemplo, 0)
        this.bgMusic.loop = true;
        this.bgMusic.play();

        const b_volumen = this.add.image(250, 300, "volumen");
        const base = this.add.image(550, 300, "base");
        const izq = this.add.image(440, 300, "izq");
        const der = this.add.image(660, 300, "der");

        

        // Creamos el texto del volumen, pero fuera de los eventos
        let volumenTexto = this.add.text(495, 280, GlobalData.volumen.toFixed(2), { fill: '#000', fontSize: 50 });

        // Botón de volver
        const salir = this.add.image(400, 500, 'volver');
        salir.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); // Reproduce el sonido de click
            this.scene.stop('Ajustes'); // Detiene la escena de ajustes
            if(GlobalData.playing){
                this.scene.launch('MenuPausa');
            }else{
                this.scene.start('MenuInicio'); // Inicia la escena de menú
            }            
        });

        // Botón para reducir el volumen
        izq.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); // Reproduce el sonido de click
            GlobalData.volumen -= 0.01; // Disminuye el volumen
            if (GlobalData.volumen < 0) GlobalData.volumen = 0; // Aseguramos que el volumen no sea negativo
            this.bgMusic.setVolume(GlobalData.volumen); // Actualiza el volumen de la música
            volumenTexto.setText(GlobalData.volumen.toFixed(2)); // Actualiza el texto con el nuevo volumen
        });

        // Botón para aumentar el volumen
        der.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); // Reproduce el sonido de click
            GlobalData.volumen += 0.01; // Aumenta el volumen
            if (GlobalData.volumen > 1) GlobalData.volumen = 1; // Aseguramos que el volumen no sobrepase 1
            this.bgMusic.setVolume(GlobalData.volumen); // Actualiza el volumen de la música
            volumenTexto.setText(GlobalData.volumen.toFixed(2)); // Actualiza el texto con el nuevo volumen
        });

        // Detenemos la música cuando la escena se cierre
        this.events.on('shutdown', () => { 
            this.bgMusic.stop(); 
        });
        
    }

    update() {
}
}
