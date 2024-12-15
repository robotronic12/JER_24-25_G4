class MenuLogin extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuLogin' });
    }

    preload() {
        //Cargo el html
        this.load.html('registro', 'text/login.html');
    }

    create() {     
        const scene = this;
        //pausamos el menu inicio hasta que no ha terminado de logearse
        this.scene.pause('MenuInicio');
        const text = this.add.text(10, 10, 'Registrate para jugar', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(400, 350).createFromCache('registro');
        element.addListener('click');
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM
        
        element.on('click', function (event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');
    
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    this.removeListener('click');
                    element.setVisible(false);
                    const user = {
                        username: "testuser", // Asigna el valor deseado.
                        password: "mypassword", // Asigna el valor deseado.
                        lastseen: "00:00:00" // Opcional: genera el tiempo actual en formato HH:mm:ss.
                    };
                    
                    //Aqui irian las peticiones ajax 
                    //INTENTO DE PETICIONES
                    
                    fetch('http://localhost:8080/api/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la autenticación, usuario no creado');
                        }
                        return response.json(); // Cambia a `response.text()` si tu servidor devuelve texto
                    })
                    .then(data => {
                        console.log('Respuesta del servidor:', data);
                        console.log('Usuario logeado con éxito');
                        // Aquí puedes manejar la respuesta (e.g., pasar a la siguiente escena del juego)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Mostrar mensaje de error al usuario
                    });
                    
                    
                    text.setText(`Bienvenido ${inputUsername.value}`);
                    
                    
                    //this.time.delayedCall(3000, () => {
                        scene.scene.stop('MenuLogin'); 
                        scene.scene.start('MenuInicio'); 
                    //}); 
                }
                else
                {
                    //  parpadeo para cuando no hay texto en el login
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
            
        });

    }
    update() {
        
    } 

}