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
        if (message.type === '') {

        }
    }
}