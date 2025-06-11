class WebManager{    
    constructor(juegoInstance) {
        this.juego = juegoInstance;
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
        console.log("Handling message: ", message.type);
        switch (message.type) {
            case 'MessageItem':
                if(message.item.collected){
                    console.log("Item collected: " + message.item.id + " by player: " + message.item.owner);
                    this.juego.takeItem(message.item.id, message.item.owner);
                }
                else {
                    this.juego.addItem(message.item);
                }
                break;
            case 'MessageJPlayer':
                
                if (message.player.id === "J1") {
                    this.juego.updateRemotePlayer1(message.player);
                } else if (message.player.id === "J2") {
                    this.juego.updateRemotePlayer2(message.player);
                }
                break;
            case 'MessageInput':
                break;
            case 'MessageEnd':
                break;
            case 'MessageDamage':
                break;
            case 'MessageBegin':
                break;
            case 'MessageMasterResponse':
                console.log("Is master ...");
                GlobalData.isMaster = message.isMaster;
                console.log("Is master: " + GlobalData.isMaster);
                if(GlobalData.isMaster){
                    this.juego.createPowerUps();
                }
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
    
    sendPlayerPosition(playerId, x, y, vx, vy) {
        var message = {
            id: this.newId(),
            type: 'MessageJPlayer',
            player: {
                id: playerId,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                timestamp: Date.now()
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