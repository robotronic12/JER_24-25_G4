class WebManager{
    constructor() {
        this.connection = new WebSocket('ws://127.0.0.1:8080/echo');
        const self = this;
        this.connection.onerror = function(e) {
          console.log("WS error: " + e);
        }
        this.connection.onmessage = function(msg) {
            console.log("WS message: " + msg.data);
            self.handleMessage(msg.data);
        }
        this.connection.onclose = function() {
            console.log("Closing socket");
        }

        this.lastId = 0;
    }

    sendMessage(message) {
        this.connection.send(JSON.stringify(message));
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
            case 'MessageMasterMessageMasterResponse':
                GlobalData.isMaster = message.isMaster;
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

    sendItem(id, x, y, type, isCollected, playerOwner){
        var message = {
            id: this.newId(),
            type: 'MessageItem',
            item: {
                id: id,
                x: x,
                y: y,
                type: type,
                timestamp: Date.now(),
                collected: isCollected,
                owner: playerOwner
            }
        };

        this.sendMessage(message);
    }

    isMaster(){
        var message = {
            id: this.newId(),
            type: 'MessageMaster',
            timestamp: Date.now()
        };
        this.sendMessage(message);
    }

    newId(){
        this.lastId++;
        return this.lastId;
    }
}