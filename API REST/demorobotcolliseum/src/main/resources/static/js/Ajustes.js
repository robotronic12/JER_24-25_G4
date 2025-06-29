class Ajustes extends Phaser.Scene {
    constructor() {
        super({ key: 'Ajustes' });
    }

    preload() {
        
    }

    create() {

        if(!GlobalData.playing){
            // Cargamos imagen de fondo
            const fondo = this.add.image(0, 0, 'fondo');
            fondo.setOrigin(0, 0);
            fondo.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  // Ajustamos la imagen al tamaño del fondo
        }        
        
        // Configuración de la música
        this.bgMusic = this.sound.add('background');
        this.bgMusic.setVolume(GlobalData.volumen.toFixed(2)); // Volumen inicial (por ejemplo, 0)
        this.bgMusic.loop = true;
        this.bgMusic.play();
        
        // Añadimos título
        const titulo = this.add.text(250, 100, 'Ajustes', { 
            fontFamily: 'Poppins', 
            fontSize: '75px',
            color: '#ffffff', 
            fontStyle: 'bold' 
        });


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
            if(GlobalData.playing == true){
                console.log('Hola');
                this.scene.launch('MenuPausa');
            }
            else{
                console.log('Hola');
                this.scene.start('MenuInicio'); // Inicia la escena de menú
            }          
            console.log('Hola wapo');  
            this.scene.stop('Ajustes'); // Detiene la escena de ajustes
        });

        // Botón para reducir el volumen
        izq.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); // Reproduce el sonido de click
            GlobalData.volumen -= 0.01; // Disminuye el volumen
            if (GlobalData.volumen < 0) GlobalData.volumen = 0; // Aseguramos que el volumen no sea negativo
            this.bgMusic.setVolume(GlobalData.volumen); // Actualiza el volumen de la música
            volumenTexto.setText(GlobalData.volumen.toFixed(2)); // Actualiza el texto con el nuevo volumen
            GlobalData.volumenCambiado = true;
        });

        // Botón para aumentar el volumen
        der.setInteractive().on('pointerdown', () => {
            this.sound.play('select'); // Reproduce el sonido de click
            GlobalData.volumen += 0.01; // Aumenta el volumen
            if (GlobalData.volumen > 1) GlobalData.volumen = 1; // Aseguramos que el volumen no sobrepase 1
            this.bgMusic.setVolume(GlobalData.volumen); // Actualiza el volumen de la música
            volumenTexto.setText(GlobalData.volumen.toFixed(2)); // Actualiza el texto con el nuevo volumen
            GlobalData.volumenCambiado = true;
        });

        // Detenemos la música cuando la escena se cierre
        this.events.on('shutdown', () => { 
            this.bgMusic.stop(); 
        });
        
    }

    update() {
}
}
