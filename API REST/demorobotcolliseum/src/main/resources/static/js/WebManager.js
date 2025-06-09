var messageT1 = {
    id: 0,
    type: 'MessageItem',
    item: {

    }

}


class WebManager{
    constructor() {
        var connection = 
          new WebSocket('ws://127.0.0.1:8080/echo');
        connection.onerror = function(e) {
          console.log("WS error: " + e);
        }
        connection.onmessage = function(msg) {
          console.log("WS message: " + msg.data);
          
          $('#chat').append(msg.data)
        }
        connection.onclose = function() {
            console.log("Closing socket");
        }
    }

    handleMessage(message) {
        message = JSON.parse(message);
        switch (message.type) {
            case 'MessageItem':
                break;
            case 'MessageJPlayer':
                break;
            case 'MessageInput':
                break;
            case 'MessageEnd':
                break;
            case 'MessageDamage':
                break;
            case 'MessageBegin':
                break;
            default:
                console.log("Unknown message type: ", message.type);
        }
    }

    sendLive(vida){
        var message = {
            id: this.newId(),
            type: 'MessageDamage',
            item: {
                vida: vida
            }
        };
        this.sendMessage(message);
    }

    newId(){
        return 0;
    }
}