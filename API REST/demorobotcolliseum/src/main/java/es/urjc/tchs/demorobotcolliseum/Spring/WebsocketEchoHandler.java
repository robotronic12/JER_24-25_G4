package es.urjc.tchs.demorobotcolliseum.Spring;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.springframework.boot.autoconfigure.jms.JmsProperties.Listener.Session;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class WebsocketEchoHandler extends TextWebSocketHandler{

    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();    
    private WebSocketSession masterSession;
    private final ReentrantReadWriteLock lock;

    public WebsocketEchoHandler() {
        this.lock = new ReentrantReadWriteLock();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New session: " + session.getId());
        sessions.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Session closed: " + session.getId());
        sessions.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("Message received: " + message.getPayload());

        String msg = message.getPayload();

        // Si esperas un JSON:
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(msg);

        // Ejemplo de acceso a un campo "id":
        var id = root.get("id").asInt();
        var type = root.get("type").asText();

        if (type.equals("MessageMaster")) {
            Map<String, Object> response = new java.util.HashMap<>();

            response.put("id", -1);
            response.put("type", "MessageMasterResponse");
            response.put("isMaster", isMasterSession(session));

            String responseJson = mapper.writeValueAsString(response);

            sendMessageToOne(session, responseJson);
        } else if (type.equals("MessageItem")){
            handleItemMessage(session, root);
        }else if (type.equals("MessageJPlayer")) { ///
            // Reenviar a otros jugadores
            sendMessageToOther(session, root.toString());
        }
    }

    private boolean isMasterSession(WebSocketSession session) {
        
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        try {
            if (masterSession == null) {
                masterSession = session;
                return true;
            }
            else{
                return false;
            }
        } finally {
            writeLock.unlock();
        }
    }

    ////No pyuedo probar si funciona peroooo toi en ello
    private void handleItemMessage(WebSocketSession session, JsonNode root) {
        // Este mensaje se reenvía a todos los demás jugadores
        // (ya lo recibiste tú al emitirlo)
        String payload = root.toString(); 
        sendMessageToOther(session, payload);
    }

    public void sendMessageToOne(WebSocketSession session, String payload) {
        try {
            session.sendMessage(new TextMessage(payload));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendMessageToOther(WebSocketSession session, String payload) {
        for (WebSocketSession sessionAct : sessions.values()) {
            try {
                if (!sessionAct.getId().equals(session.getId())){
                    sessionAct.sendMessage(new TextMessage(payload));
                }
                
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
