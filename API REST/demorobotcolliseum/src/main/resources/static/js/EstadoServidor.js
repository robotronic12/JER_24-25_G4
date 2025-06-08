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

        this.iconoConexion = this.add.image(500, 60, 'user_conect');
        this.texto_conect = this.add.text(550, 40, 'Cargando...', { fill: '#a3e6bd', font: '17px' });

    }

    update() {
            var usern = usuario.username;
            fetch(`/api/users/activeUsers/${usern}`) //GET de los usuarios activos
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa, mostramos un mensaje de error y no continuamos
                    //const icono_conect = this.add.image(510, 55, 'user_disconect');
                    //const texto_conect = this.add.text(550, 40, 'Usuario desconectado \nvuelve a reconectarte', { fill: '#f5a4a2', font: '18px' });
                    throw new Error(`Error en la peticion: ${response.status}`); // Lanzamos el error para que lo capture el catch
                }
                
                return response.json(); // Convertimos la respuesta a JSON solo si la respuesta es válida
            })
            .then(users => {
                // Si la respuesta es exitosa, actualizamos la interfaz con los usuarios activos
                //const numberOfUsers = data; // `data` es ahora directamente el número de usuarios activos

                //const icono_conect = this.add.image(510, 55, 'user_conect');
                this.texto_conect.setText(`Estas conectado!! \nUsuarios conectados: ${users}`, );
                this.texto_conect.setStyle({ fill: '#a3e6bd', font: '17px' });
                this.estadoConexion = true;

                let nuevaTextura = this.estadoConexion ? 'user_conect' : 'user_disconect';
                this.iconoConexion.setTexture(nuevaTextura);
            })
            .catch(error => {
                // En el caso de un error (ya sea de la petición o en el procesamiento de datos)
                //const icono_conect = this.add.image(510, 55, 'user_disconect');
                this.texto_conect.setText('Usuario desconectado \nvuelve a reconectarte');
                this.texto_conect.setStyle({ fill: '#f5a4a2', font: '18px' });
                this.estadoConexion = false;

                let nuevaTextura = this.estadoConexion ? 'user_conect' : 'user_disconect';
                this.iconoConexion.setTexture(nuevaTextura);
                // Ya se maneja la desconexión en el bloque if(response.ok) en caso de error
            });
    
            
    } //se puede poner un delta 

}
