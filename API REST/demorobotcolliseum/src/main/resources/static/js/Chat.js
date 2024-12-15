class Chat extends Phaser.Scene {
    constructor() {
        super({ key: 'Chat' });
    }

    preload() {
        //Cargo el html
        this.load.html('chat', 'text/chat.html');
    }

    create() {     
        const scene = this;
        
        const text = this.add.text(10, 10, 'Chat', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(800, 600).createFromCache('chat');
        element.addListener('click');
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM
        console.log("esquizofrenia")
        
        element.on('click', (event) => {
            if (event.target.name === 'send-button') {
                const inputField = document.getElementById('chat-input');  // Accede al input por ID
                const messagesContainer = document.getElementById('messages');
                console.log("has clickado")
                if (inputField && inputField.value.trim() !== '') {
                    const userInput = inputField.value.trim();
                    // Agrega el mensaje del usuario al chat
                    addMessageToChat(messagesContainer, 'You', userInput, 'user');
        
                    // Limpiar el campo de entrada después de enviar el mensaje
                    inputField.value = '';  
                }
        
                function addMessageToChat(container, username, message, type) {
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
            }
        });
        
        this.chatKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.chatKey)) {
            
            this.scene.stop('Chat'); //carga la escena de intro
            GlobalData.isInChat = false;
        }
    } 


}