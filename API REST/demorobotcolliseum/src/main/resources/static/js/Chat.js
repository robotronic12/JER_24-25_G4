class Chat extends Phaser.Scene {
    constructor() {
        super({ key: 'Chat' });
    }

    mensajes;
    timeSpan;
    lastID;
    messagesContainer;
    cargarMas;
    tiempoCarga = 1000; // Tiempo en milisegundos entre cargas de mensajes
    tiempo = 0;

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

        fetch(`/api/chat/${username}/chat?message=${message}`)
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
        // this.lastID++;

    }

    cargarMensajes(container){
        let newId = this.lastID;

        try{
            $.get(`/api/chat?since=${this.lastID}`,
                (data)=>{
                    data.forEach(message =>{
                        //console.log(message.id);
                        if(this.lastID < message.id){
                            this.addMessageToChat(container, message.user, message.text, 'user')
                            console.log('Pintado en 65');
                            newId = message.id;          
                        }
    
                    });
                    this.lastID = newId;
                    this.cargarMas = true;
                });
        }catch (error) {
            console.error("Error en la carga de mensajes: ", error);
            this.cargarMas = true;
        }
    }

    preload() {
        //Cargo el html
        this.load.html('chat', 'text/chat.html');
    }

    create() {     
        const scene = this;
        this.lastID = 0;
        this.cargarMas = true;
        
        const text = this.add.text(10, 10, 'Chat', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(800, 600).createFromCache('chat');
        element.addListener('click');
        // Guardamos el contexto de `this` (la escena Phaser) para usarlo dentro del manejador del DOM
        console.log("esquizofrenia")
        this.messagesContainer = document.getElementById('messages');

        this.mensajes = [];
        
        element.on('click', (event) => {
            var chatSend = true;
            if (event.target.name === 'send-button') {
                const inputField = document.getElementById('chat-input');  // Accede al input por ID
                console.log("has clickado")
                if (inputField && inputField.value.trim() !== '') {
                    const userInput = inputField.value.trim();
                    // Limpiar el campo de entrada después de enviar el mensaje
                    inputField.value = '';  
                    // Agrega el mensaje del usuario al chat
                    this.sendToServer(usuario.username, userInput);

                    // if(chatSend){
                    //     // this.addMessageToChat(this.messagesContainer, usuario.username, userInput, 'user');
                    //     // console.log('Pintado en 108');
                    //     // this.cargarMensajes(this.messagesContainer);
                    //     chatSend = !chatSend;
                    // }
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
        
        if(this.cargarMas && this.tiempoCarga <= this.tiempo){
            this.cargarMas = false;
            this.cargarMensajes(this.messagesContainer); 
        }
        this.tiempo += this.game.loop.delta; // Incrementa el tiempo transcurrido
    } 

}