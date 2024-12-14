class Chat extends Phaser.Scene {
    constructor() {
        super({ key: 'Chat' });
    }

    preload() {
        //Cargo el html
        this.load.html('registro', 'text/chat.html');
    }

    create() {     
        const scene = this;
        
        const text = this.add.text(10, 10, 'Chat', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(800, 600).createFromCache('registro');
        element.addListener('click');
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM

        element.on('click', function (event)
        {
            if (event.target.name === 'send-button')
            {
                const inputField = this.getChildByName('chat-input');
                const messagesContainer = document.getElementById('messages');

                if (inputField.value.trim() !== '') {
                    const userInput = inputField.value.trim();
                    // Agrega el mensaje del usuario al chat
                    addMessageToChat(messagesContainer, 'You', userInput, 'user');
                }

                // Función para añadir mensajes al contenedor del chat
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
                    container.scrollTop = container.scrollHeight;
                }
            }
            
        });

    }
    update() {

    } 

}