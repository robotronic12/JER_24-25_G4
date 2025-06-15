class EsperaSincronizacion extends Phaser.Scene {
    constructor() {
        super({ key: 'EsperaSincronizacion' });
    }

    preload() { 
    }

    create() {     
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //const copyright = this.add.text(560, 575, 'Two Chain Studios ©', { fill: '#0f0', fontSize: 20 })
        const ver = this.add.text(10, 575, 'Ver 1.0', { fill: '#0f0', fontSize: 40 })
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        if(GlobalData.noPlaying){
            this.texto_conect = this.add.text(width / 2, height / 2, 'Servidor ocupado, \nesperando para jugar', {
                fill: '#0f0',
                fontSize: '40px',
                stroke: '#000',           // Color del borde (negro)
                strokeThickness: 4 
            });            
            this.texto_conect.setOrigin(0.5, 0.5);
            this.children.bringToTop(this.texto_conect);
        }
        else{            
            this.texto_conect = this.add.text(width / 2, height / 2, 'Esperando al rival...', {
                fill: '#f00',
                fontSize: '40px',
                stroke: '#000',           // Color del borde (negro)
                strokeThickness: 4 
            });
            this.texto_conect.setOrigin(0.5, 0.5);
            this.children.bringToTop(this.texto_conect);
        }
    }

    checkPause(){
        if(GlobalData.isInChat) return;

        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.pause('EsperaSincronizacion');
            this.scene.pause('Juego');
            this.scene.launch('MenuPausa'); 
            this.scene.bringToTop('MenuPausa');
        }
    }

    finEsperaSincronizacion() {
        this.scene.stop('EsperaSincronizacion');
    }

    update() {    
        if(GlobalData.initPlay) {
            this.finEsperaSincronizacion();
        }
        console.log("Esperando a que se conecten los jugadores...");
        this.checkPause();
    } //se puede poner un delta 

}
