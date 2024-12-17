package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import es.urjc.tchs.demorobotcolliseum.ChatDAO;

public class ChatService {
    private final List<MessageOnChat> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);
    private final ChatDAO chatDAO;//El final lo que hace es que si hay cambios da error
    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura

    public ChatService(ChatDAO chatDAO){
        this.chatDAO = chatDAO;
        this.lock = new ReentrantReadWriteLock();
    }

    // public List<String>
    public void addMessage(String username, String message) {
        synchronized (messages) {
            var msg = new MessageOnChat(lastId.incrementAndGet(), username, message);
            messages.add(msg);
            chatDAO.updatechat(msg);
            if (messages.size() > 50) {
                int idDelete= messages.get(0).getId();
                messages.remove(0); // Keep only the last 50 messages
                chatDAO.deletechat(idDelete);
            }
        }
    }

    public Optional<ChatResponse> getMessages(int since) {
        List<String> newMessages = new ArrayList<>();
        int latestId = since;

        synchronized (messages) {
            for (MessageOnChat msg : messages) {
                if (msg.getId() > since) {
                    newMessages.add(msg.getText());
                    latestId = msg.getId();
                }
            }
        }
        Optional<ChatResponse> response = Optional.of(new ChatResponse(newMessages, latestId));

        return response;
    }
}
