class Chat extends Phaser.Scene {
    constructor() {
        super({ key: 'Chat' });
    }

    mensajes;
    timeSpan;
    lastID;
    messagesContainer;

    addMessageToChat(container, username, message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const usernameSpan = document.createElement('span');
        usernameSpan.textContent = username + ':';
        usernameSpan.className = 'username';

        const textSpan = document.createElement('span');
        textSpan.textContent = message;

        messageDiv.appendChild(usernameSpan);
        messageDiv.appendChild(textSpan);
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;  // Hacer scroll al final
        
    }

    sendToServer(username, message){
        console.log("Hola");

        fetch(`/api/chat/${username}/chat?message=${message}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(usuario),
        })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('Error en la petición al servidor');
        //     }
        //     return response.json(); // Si el servidor devuelve JSON
        // })
        // .then(data => {
        //     console.log('Respuesta del servidor:', data);
        //     // Aquí puedes manejar la respuesta del servidor
        // })
        .catch(error => {
            console.error('Error:', error);
            // Aquí puedes manejar errores
        });

    }

    cargarMensajes(container){
        let newId = this.lastID;

        $.get(`/api/chat`,
            (data)=>{
                data.forEach(message =>{
                    //console.log(message.id);
                    if(this.lastID < message.id){
                        this.addMessageToChat(container, message.user, message.text, 'user')
                        if(message.id>newId){
                            newId = message.id;
                        }                        
                    }

                });
                this.lastID = newId;
                //console.log(this.lastID);
            });
    }

    preload() {
        //Cargo el html
        this.load.html('chat', 'text/chat.html');
    }

    create() {     
        const scene = this;
        this.lastID = 0;
        
        const text = this.add.text(10, 10, 'Chat', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(800, 600).createFromCache('chat');
        element.addListener('click');
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM
        console.log("esquizofrenia")
        this.messagesContainer = document.getElementById('messages');

        this.mensajes = [];
        
        element.on('click', (event) => {
            if (event.target.name === 'send-button') {
                const inputField = document.getElementById('chat-input');  // Accede al input por ID
                console.log("has clickado")
                if (inputField && inputField.value.trim() !== '') {
                    const userInput = inputField.value.trim();
                    // Limpiar el campo de entrada después de enviar el mensaje
                    inputField.value = '';  
                    // Agrega el mensaje del usuario al chat
                    this.sendToServer(usuario.username, userInput);
                    this.addMessageToChat(this.messagesContainer, usuario.username, userInput, 'user');
                    this.lastID++;
                }  
                
            }
        });
        
        this.chatKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.chatKey)) {
            
            this.scene.stop('Chat'); //carga la escena de intro
            GlobalData.isInChat = false;
        }
        this.cargarMensajes(this.messagesContainer);      
    } 

}