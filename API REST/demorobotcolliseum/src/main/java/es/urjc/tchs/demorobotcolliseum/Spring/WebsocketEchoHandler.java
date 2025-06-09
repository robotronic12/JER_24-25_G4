package es.urjc.tchs.demorobotcolliseum.Spring;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketEchoHandler extends TextWebSocketHandler{

    private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();    

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
