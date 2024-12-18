package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import es.urjc.tchs.demorobotcolliseum.ChatDAO;


public class ChatService {
    private final List<MessageOnChat> messages;
    private final AtomicInteger lastId = new AtomicInteger(0);
    private final ChatDAO chatDAO;//El final lo que hace es que si hay cambios da error
    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura

    public ChatService(ChatDAO chatDAO){
        this.chatDAO = chatDAO;
        this.lock = new ReentrantReadWriteLock();
        this.messages = this.chatDAO.getAllchats();
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

    public Optional<List<MessageOnChat>> getLastMessages(int since) {
        List<String> newMessages = new ArrayList<>();
        List<MessageOnChat> nM = new ArrayList<>();
        int latestId = since;

        synchronized (messages) {
            for (MessageOnChat msg : messages) {
                if (msg.getId() > since) {
                    newMessages.add(msg.getText());
                    nM.add(msg);
                    latestId = msg.getId();
                }
            }
        }

        // String[] msges = (String[]) newMessages.toArray();

        // for (int i = 0; i<newMessages.size();i++) {
        //     msges[i] = newMessages.get(i);
        // }

        // Optional<String[]> response = Optional.of(msges);

        return Optional.of(nM);
    }
}
