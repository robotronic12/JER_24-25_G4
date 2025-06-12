class EsperaSincronizacion extends Phaser.Scene {
    constructor() {
        super({ key: 'EsperaSincronizacion' });
    }

    preload() { 
    }

    create() {      
        //const copyright = this.add.text(560, 575, 'Two Chain Studios ©', { fill: '#0f0', fontSize: 20 })
        const ver = this.add.text(10, 575, 'Ver 1.0', { fill: '#0f0', fontSize: 20 })

        this.texto_conect = this.add.text(400, 250, 'Esperando a que se conecten los jugadores...', { fill: '#0f0', fontSize: 20 });

    }

    finEsperaSincronizacion() {
        this.scene.stop('EsperaSincronizacion');
    }

    update() {    
        if(GlobalData.initPlay) {
            this.finEsperaSincronizacion();
            GlobalData.initPlay = false;
        }
        console.log("Esperando a que se conecten los jugadores...");
    } //se puede poner un delta 

}
