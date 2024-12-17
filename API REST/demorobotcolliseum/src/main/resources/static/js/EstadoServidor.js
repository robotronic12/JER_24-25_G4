class EstadoServidor extends Phaser.Scene {
    constructor() {
        super({ key: 'EstadoServidor' });
    }

    preload() {
        //Cargo icono de usuario conectado/no conectado

        this.load.image('user_conect','assets/botones/conect.png');
        this.load.image('user_disconect','assets/botones/disconect.png');
        

        
    }

    create() {
        
       
        const copyright = this.add.text(560, 575, 'Two Chain Studios ©', { fill: '#0f0', fontSize: 20 })
        const ver = this.add.text(10, 575, 'Ver 1.0', { fill: '#0f0', fontSize: 20 })

        
         //estado de conexión del jugador
        //if(estado_conex_jugador){
            //const icono_conect = this.add.image(500, 60, 'user_conect');
            //const texto_conect= this.add.text(500,100,' Estas conectado, te jodes',{fill:'#32a834',fontsize:40});
        
        //}
        //else{
            //const icono_conect = this.add.image(500, 60, 'user_conect');
            //const texto_conexión= this.add.text(500,100,'Estas desconectado, vuelve a conectarte',{fill:'#32a834',fontsize:40});
        //}

    }

    update() {
        var estado_conex_jugador=true;
        if(estado_conex_jugador){
            const icono_conect = this.add.image(510, 55, 'user_conect');
            const texto_conect= this.add.text(550,40,'Estas conectado!! \nUsuarios conectados:',{fill:'#a3e6bd',font: '17px'});
            
        }
        else{
            const icono_conect = this.add.image(510, 55, 'user_disconect');
            const texto_conect= this.add.text(550,40,'Usuario desconectado \nvuelve a reconectarte',{fill:'#f5a4a2',font:'18px'});
        }
    } //se puede poner un delta 

}
