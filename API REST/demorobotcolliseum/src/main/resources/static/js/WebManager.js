class WebManager{    
    constructor(juegoInstance) {
        this.juego = juegoInstance;
    }

    isConnected() {
        return this.connection && this.connection.readyState === WebSocket.OPEN;
    }

    openConnection() {
        if (!this.connection || this.connection.readyState === WebSocket.CLOSED) {
            const hostname = window.location.hostname;
            this.connection = new WebSocket(`ws://${hostname}:8080/echo`);
            const self = this;
            this.connection.onerror = function(e) {
            console.log("WS error: " + e);
            }
            this.connection.onmessage = function(msg) {
                //console.log("WS message: " + msg.data);
                self.handleMessage(msg.data);
            }
            this.connection.onclose = function() {
                console.log("Closing socket");
                //Hacer algo si se cierra la conexión
            }
            this.connection.onopen = () => {
                self.isMaster();                
                self.juego.startUpdate();
            };

            this.lastId = 0;
        }
    }

    closeConection() {
        if (this.connection) {
            this.connection.close();
            this.connection = null;
            console.log("Connection closed");
        } else {
            console.log("No connection to close");
        }
    }

    sendMessage(message) {
        this.connection.send(JSON.stringify(message));
    }

    handleMessage(message) {
        message = JSON.parse(message);
        //console.log("Handling message: ", message.type);
        switch (message.type) {
            case 'MessageItem':
                if(message.item.collected){
                    console.log("Handling message: ", message.type);
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
                    
                } else {
                    this.juego.updateRemotePlayer2(message.player);
                    //console.log("Soy servidor y recibí el mensaje de J2 y envío su mensaje de actualización")
                }
                break;
            case 'MessageDisparo':
                console.log(message.disparo.x, message.disparo.y, message.disparo.offsetX, message.disparo.offsetY, message.disparo.danio, message.disparo.velBala);
                this.juego.dispararBala(message.disparo.x, message.disparo.y, message.disparo.offsetX, message.disparo.offsetY, message.disparo.danio, message.disparo.velBala);
                break;
            case 'MessageEnd':
                GlobalData.ganador = message.player;
                this.juego.endGame();
                break;

            case 'MessageDamage':
                const target = message.damage.target;
                const newLife = message.damage.life;

                if (target === "J1") {
                    this.juego.vida1 = newLife;
                    if (newLife <= 0) {
                        this.juego.j1.setActive(false);
                        this.juego.j1.setVisible(false);
                    }
                } else if (target === "J2") {
                    this.juego.vida2 = newLife;
                    if (newLife <= 0) {
                        this.juego.j2.setActive(false);
                        this.juego.j2.setVisible(false);
                    }
                }
                break;

                
            case "DesconexionVictory":
                if (message.player === "J1") {
                    GlobalData.ganador = 1;
                } else if (message.player === "J2") {
                    GlobalData.ganador = 2;
                }

                this.juego.scene.stop('Juego'); 
                this.juego.scene.start('MenuVictoriaJ1');
                break;

            case 'MessageBegin':
                break;
            case 'MessageMasterResponse':
                console.log("Is master ...");
                GlobalData.isMaster = message.isMaster;
                console.log("Is master: " + GlobalData.isMaster);
                if (message.isMaster) {
                    this.jugadorId = "J1";
                } else {
                    this.jugadorId = "J2";
                }
                console.log("Jugador asignado:", this.jugadorId);
                break;

            case 'EmpiezaPartida':
                GlobalData.initPlay = true;
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
    sendDamage(targetPlayerId, damageAmount) {
        const message = {
            id: this.newId(),
            type: 'MessageDamage',
            damage: {
                target: targetPlayerId,
                amount: damageAmount
            }
        };
        this.sendMessage(message);
    }

    sendLive(playerId, vida){
        var message = {
            id: this.newId(),
            type: 'MessageDamage',
            player: playerId,
            live: vida
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

    sendDisparo(x,y,offsetX,offsetY,danio,velBala){ 
        var message={
            id:this.newId(),
            type:'MessageDisparo',
            disparo:{
                x: x,
                y: y,
                offsetX: offsetX,
                offsetY: offsetY,
                danio: danio,
                velBala: velBala
            }
        };
                   
        this.sendMessage(message);
    }

    sendEndGame(playerId) {
        var message = {
            id: this.newId(),
            type: 'MessageEnd',
            player: playerId,
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