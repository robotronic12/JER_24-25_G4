class MenuLogin extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuLogin' });
    }

    preload() {
        //Cargo el html
        this.load.html('registro', 'text/login.html');
        this.load.image('fondo', "assets/entorno/fondo.png");

    }

    create() {
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM  
        const scene = this;
        
        const fondo = this.add.image(400, 400, 'fondo'); // Creamos el fondo
        //creamos el estado del menú para cambiar entre menu_login y menu_registro
        var registro_pantalla = false; //de normal a false ya que empezamos en el menu de login
        //pausamos el menu inicio hasta que no ha terminado de logearse
        this.scene.pause('MenuInicio');
        //texto dentro del formulario
        const textFormulario = this.add.text(10, 15, 'Logueate para jugar', { color: 'white', fontFamily: 'Poppins', fontSize: '32px ',stroke: 'black',strokeThickness: 3  });
        //Añado el html
        const elementDOM = this.add.dom(400, 350).createFromCache('registro');
        //element.addListener('click');
        var submitButton = elementDOM.getChildByID('submit');
        var ChangeButton = elementDOM.getChildByID('changeScreen');
        const actualizarFormulario = function () {
            if (registro_pantalla) {
                textFormulario.setText('Registrate poniendo usuario y contraseña');
                elementDOM.getChildByID('submit').innerText = 'REGISTRATE';
                elementDOM.getChildByID('changeScreen').innerText = '¿Ya tiene usuario? Logueate';
            }
            else {
                textFormulario.setText('Logueate para jugar');
                elementDOM.getChildByID('submit').innerText = 'INICIAR SESION';
                elementDOM.getChildByID('changeScreen').innerText = '¿No tienes usuario? Registrate';
            }
        }
        ChangeButton.addEventListener('click', () => {
            registro_pantalla = !registro_pantalla;
            actualizarFormulario();
        });
        submitButton.addEventListener('click', () => {
            //para los datos del usuario

            const inputUsername = elementDOM.getChildByID('username').value;
            const inputPassword = elementDOM.getChildByID('password').value;
            const colorC1 = 1;
            const colorC2 = 2;
            if (inputUsername.value === '' || inputPassword.value === '') {
                //parpadea el texto
                elementDOM.scene.tweens.add({ targets: textFormulario, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                return;
            }
            if (registro_pantalla) {  //protocolo de registro de usuario
                


                //no matamos la página 
                const user = {
                    username: inputUsername, // Asigna el valor deseado.
                    password: inputPassword, // Asigna el valor deseado.
                    color1: colorC1,
                    color2: colorC2,
                };

                fetch('/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la autenticación, error al registrar usuario');
                        }
                        registro_pantalla = false;    //vamos a la pantalla de login
                        actualizarFormulario();
                        return response.json(); // Cambia a `response.text()` si tu servidor devuelve texto
                    })
                    .then(data => {
                        console.log('Respuesta del servidor:', data);
                        console.log('Usuario registrado con éxito');
                        // Aquí puedes manejar la respuesta (e.g., pasar a la siguiente escena del juego)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Mostrar mensaje de error al usuario
                    });
                    
            }

            else {  //login de usuario
                const user = {
                    username: inputUsername, // Asigna el valor deseado.
                    password: inputPassword, // Asigna el valor deseado.
                    color1: colorC1,
                    color2: colorC2,
                };

                fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error petición de login no disponible');
                        }
                        elementDOM.removeListener('click');
                        elementDOM.setVisible(false);
                        this.scene.stop('MenuLogin');   
                        this.scene.start('Juego');
                    })
                    
                    .catch(error => {
                        console.error('Error:', error);
                        textFormulario.setText('Usuario o Contraseña incorrectos o no existen');
                        // Mostrar mensaje de error al usuario
                    });
                //comparamos si existe el usuario
                //if (usuarioLoginGood) {//si se loguea correctamente matamos la página ya que iniciamos sesión
                   
                //}
                /*else {
                    //usuario no logueado correctamente
                    console.log();
                }*/


            }
        });

        /* element.on('click', function (event) {
             if (event.target.name === 'registerButton' && registro_pantalla === false) {
                 registro_pantalla = true;
                 text.setText('Registrate poniendo usuario y contraseña');
                 document.getElementById('username').innerText = 'Registrarse';
                 document.getElementById('password').innerText = '¿Ya tiene usuario? Logueate';
             }
             else if (registro_pantalla === true) {
 
                 if (event.target.name === 'registerButton' && registro_pantalla === true) {
                     //cambiamos al menu loggin
                     registro_pantalla = false;    //reseteamos estado menus
                     text.setText('Logueate para jugar');
                     document.getElementById('username').innerText = 'Login';
                     document.getElementById('password').innerText = '¿No tienes usuario? Registrate';
 
                 }
                 else if (event.target.name === 'loginButton' && registro_pantalla === true) {
                     //petición de registro de nuevo usuario
                     console.log('registro de nuevo usuario');
                 }
             }
             if (event.target.name === 'loginButton' && registro_pantalla == false) {
 
 
 
 
                 //Aqui irian las peticiones ajax 
                 //INTENTO DE PETICIONES
 
 
 
 
                 text.setText(`Bienvenido ${inputUsername.value}`);
 
 
                 //this.time.delayedCall(3000, () => {
                 scene.scene.stop('MenuLogin');
                 scene.scene.start('MenuInicio');
                 //}); 
             }
             else {
                 //  parpadeo para cuando no hay texto en el login
                 
             }
         }
 
 });*/

    }
    update() {

    }

}