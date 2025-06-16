package es.urjc.tchs.demorobotcolliseum.Spring;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantReadWriteLock;

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
    private Map<String, Integer> playerLives = new ConcurrentHashMap<>();
    private Map<Integer, PowerUpServer> spawnedItems = new HashMap<>();
    private String[] idPlayers = new String[2]; 

    // Inicializar vidas por defecto
    {
        playerLives.put("J1", 100);
        playerLives.put("J2", 100);
    }

    public WebsocketEchoHandler() {
        this.lock = new ReentrantReadWriteLock();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("New session: " + session.getId());
        sessions.put(session.getId(), session);
        System.out.println("Total sessions: " + sessions.size());

        if (sessions.size() == 1){            
            idPlayers[0] = session.getId();
        }
        if (sessions.size() == 2) {
            idPlayers[1] = session.getId();
            resetPlayerLives();

            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("id", -1);
            response.put("type", "EmpiezaPartida");

            String responseJson = mapper.writeValueAsString(response);
            sendMessageToAll(responseJson);
            
            startCreating = true; // Indica que se ha iniciado la creación de power-ups
        }

        if(spawnedItems.size() > 0) {
            for (int id : spawnedItems.keySet()) {
                PowerUpServer item = spawnedItems.get(id);
                sendItem(id, item.type, item.owner, item.x, item.y, false);
            }
        }
        if(sessions.size() > 2) {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("id", -1);
            response.put("type", "NoMorePlayers");

            String responseJson = mapper.writeValueAsString(response);
            sendMessageToOne(session, responseJson);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("Session closed: " + session.getId());
        sessions.remove(session.getId());

        System.out.println(sessions.size()); 
        if(session.getId() == idPlayers[1]||session.getId() == idPlayers[0]) {
            System.out.println("No more sessions, clearing items.");
            stopCreatePowerUps(); // Detener generación de power-ups
            spawnedItems.clear(); // Limpiar items si no hay jugadores
        }

        if (masterSession != null && masterSession.getId().equals(session.getId())) {
            masterSession = null;
            System.out.println("Master session cleared.");
        }

        if(sessions.size() == 0) {
            spawnedItems.clear(); // Limpiar items si no hay jugadores
        }        
        // Enviar mensaje al otro jugador avisando que ha ganado
        for (WebSocketSession other : sessions.values()) {
            if (other.isOpen()) {
                Map<String, Object> winMsg = new HashMap<>();
                winMsg.put("type", "DesconexionVictory");

                // Determinar quién es el jugador conectado
                String winner = (masterSession != null && masterSession.getId().equals(other.getId())) ? "J1" : "J2";
                winMsg.put("player", winner);

                String json = new ObjectMapper().writeValueAsString(winMsg);
                other.sendMessage(new TextMessage(json));
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //System.out.println("Message received: " + message.getPayload());

        String msg = message.getPayload();

        // Si esperas un JSON:
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(msg);

        // Ejemplo de acceso a un campo "id":
        var id = root.get("id").asInt();
        var type = root.get("type").asText();

        switch (type) {
            case "MessageMaster":
                Map<String, Object> response = new java.util.HashMap<>();

                response.put("id", -1);
                response.put("type", "MessageMasterResponse");
                response.put("isMaster", isMasterSession(session));

                String responseJson = mapper.writeValueAsString(response);

                sendMessageToOne(session, responseJson);
                break;
            //para disparo
            case "MessageDisparo":
                sendMessageToAll(root.toString());
                break;
            case "MessageItem"://Hay que mandar a todos que se ha recogido un item
                var item = root.get("item");
                var itemId = item.get("id").asInt();

                if (spawnedItems.containsKey(itemId)) {
                    spawnedItems.remove(itemId);
                    sendMessageToAll(msg);

                    sendMessageToAll(msg);
                }
                break;
            case "MessageJPlayer":
                if(startCreating) {
                    startCreatePowerUps();
                    startCreating = false; // Evita reiniciar la creación de power-ups
                }
                sendMessageToOther(session,root.toString());
            break;

            case "MessageDamage":
                JsonNode damageNode = root.get("damage");
                String target = damageNode.get("target").asText();
                int amount = damageNode.get("amount").asInt();

                int currentLife = playerLives.getOrDefault(target, 100);
                int newLife = Math.max(0, currentLife - amount);
                playerLives.put(target, newLife);

                // Reenviar a todos los jugadores el nuevo valor de vida
                Map<String, Object> vidaMessage = new HashMap<>();
                vidaMessage.put("id", id);
                vidaMessage.put("type", "MessageDamage");
                Map<String, Object> vidaData = new HashMap<>();
                vidaData.put("target", target);
                vidaData.put("life", newLife);
                vidaMessage.put("damage", vidaData);

                String vidaJson = mapper.writeValueAsString(vidaMessage);
                sendMessageToAll(vidaJson);
                break;

            case "MessageEnd":                
                sendMessageToAll(msg);   
                stopCreatePowerUps(); // Detener generación de power-ups
                spawnedItems.clear(); // Limpiar items si no hay jugadores       
                break;
            
            case "MessagePlat":
                sendMessageToAll(msg);
                System.out.println("Sincronizar plataformas");
                break;
            
            default:
                break;
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

    public void sendMessageToAll(String payload) {
        for (WebSocketSession sessionAct : sessions.values()) {
            try {
                sessionAct.sendMessage(new TextMessage(payload));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
    private void resetPlayerLives() {
        playerLives.put("J1", 100);
        playerLives.put("J2", 100);
        System.out.println("Vidas reiniciadas: J1=100, J2=100");
    }

    private ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private boolean firtsPowerUpCreated = true;
    private boolean startCreating = false;
    private ScheduledFuture<?> createItems;

    public void startCreatePowerUps() {
        if (createItems != null) {
            System.out.println("Restarting power-up creation.");
            createItems.cancel(false);
        }

        createItems = scheduler.scheduleAtFixedRate(() -> {            
            try { // Si se ha detenido la generación de power-ups, no hacer nada
                if(spawnedItems.size() >= 2) {
                    System.out.println("Max power-ups reached, not creating more.");
                    return; // Evita crear más de 10 power-ups
                }
                if(firtsPowerUpCreated) {
                    firtsPowerUpCreated = false; // Solo crea el primer power-up una vez
                    return;
                }
                createPowerUp();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }, 0, 5, TimeUnit.SECONDS); // Cada 5 segundos
    }

    public void stopCreatePowerUps() {
        if (createItems != null) {
            System.out.println("Stopping power-up creation.");
            createItems.cancel(true);
        }
    }

    private static final String[] POWER_UP_TYPES = {
    "speedUp", "speedAtkUp", "moreDamage", "speedBulletkUp", "moreJump", "moreLive", "multiplesDisparos"
    };
    private static final int NUMBER_OF_POSITIONS = 5;
    private int nextPowerUpId = 0;
    private int pos = -1; 

    public void createPowerUp() throws IOException {
        // Selecciona un tipo aleatorio
        String type = POWER_UP_TYPES[(int)(Math.random() * POWER_UP_TYPES.length)];
        // Selecciona una posición aleatoria
        
        int randomPos = (int)(Math.random() * (NUMBER_OF_POSITIONS + 1));
        while (randomPos == pos) {
            randomPos = (int)(Math.random() * (NUMBER_OF_POSITIONS + 1)); // Asegura que no se repita la posición            
        }
        pos = randomPos; // Guarda la posición para el siguiente power-up
        int x = randomPos * 100;
        int y = 0;

        spawnedItems.put(nextPowerUpId, new PowerUpServer(type, "J1", x, y));
        System.out.println("Creating power-up: " + type + " at position (" + x + ", " + y + ") with id: " + nextPowerUpId);

        // Crea el mensaje del PowerUp  
        sendItem(nextPowerUpId++, type, " ", x, y, false);
    }

    public void sendItem(int id, String type, String playerId, int x, int y, Boolean isCollected) throws IOException {
        Map<String, Object> item = new HashMap<>();

        Map<String, Object> powerUpMsg = new HashMap<>();
        powerUpMsg.put("id", -1);
        powerUpMsg.put("type", "MessageItem");

        item.put("id", id);
        item.put("type", type);
        item.put("x", x);
        item.put("y", y);
        item.put("collected", isCollected);
        item.put("timestamp", System.currentTimeMillis());

        powerUpMsg.put("item", item);

        // Serializa y envía a todos los clientes
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(powerUpMsg);
        sendMessageToAll(json);
    }
}
