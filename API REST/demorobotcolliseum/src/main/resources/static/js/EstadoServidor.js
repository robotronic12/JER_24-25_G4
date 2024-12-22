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
        //var estado_conex_jugador=true;
        /*fetch('/api/users/activeUsers') //GET de los usuarios activos
            .then(response => {
                if (!response.ok) {
                    const icono_conect = this.add.image(510, 55, 'user_disconect');
                    const texto_conect= this.add.text(550,40,'Usuario desconectado \nvuelve a reconectarte',{fill:'#f5a4a2',font:'18px'});
                    throw new Error(`Error en la petición: ${response.status}`);
                   
                }
                
                return response.json(); // Convertimos la respuesta a JSON
            })
            .then(data => {
                //console.log('Usuarios activos recibidos:', data);

                // Suponiendo que `data` tiene la estructura { value: 5 } por tu IntClass
                const numberOfUsers = data;

                const icono_conect = this.add.image(510, 55, 'user_conect');
                const texto_conect= this.add.text(550,40,`Estas conectado!! \nUsuarios conectados: ${numberOfUsers}`,{fill:'#a3e6bd',font: '17px'});
            
                // Actualizamos el texto en la pantalla de Phaser
                //userText.setText(`Usuarios activos: ${numberOfUsers}`);
            })
            .catch(error => {
                console.error('Error al obtener usuarios activos:', error);
                //userText.setText('Error al cargar usuarios activos.');
                
            });*/
            var usern = usuario.username;
            fetch(`/api/users/activeUsers/${usern}`) //GET de los usuarios activos
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, mostramos un mensaje de error y no continuamos
                    const icono_conect = this.add.image(510, 55, 'user_disconect');
                    const texto_conect = this.add.text(550, 40, 'Usuario desconectado \nvuelve a reconectarte', { fill: '#f5a4a2', font: '18px' });
                    throw new Error(`Error en la peticion: ${response.status}`); // Lanzamos el error para que lo capture el catch
                }
                
                return response.json(); // Convertimos la respuesta a JSON solo si la respuesta es válida
            })
            .then(data => {
                // Si la respuesta es exitosa, actualizamos la interfaz con los usuarios activos
                const numberOfUsers = data; // `data` es ahora directamente el número de usuarios activos

                const icono_conect = this.add.image(510, 55, 'user_conect');
                const texto_conect = this.add.text(550, 40, `Estas conectado!! \nUsuarios conectados: ${numberOfUsers}`, { fill: '#a3e6bd', font: '17px' });
            })
            .catch(error => {
                // En el caso de un error (ya sea de la petición o en el procesamiento de datos)
                const icono_conect = this.add.image(510, 55, 'user_disconect');
                const texto_conect = this.add.text(550, 40, 'Usuario desconectado \nvuelve a reconectarte', { fill: '#f5a4a2', font: '18px' });
                console.error('Error al obtener usuarios activos:', error);
                // Ya se maneja la desconexión en el bloque if(response.ok) en caso de error
            });
    
            
    } //se puede poner un delta 

}
