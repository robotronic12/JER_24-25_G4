package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import es.urjc.tchs.demorobotcolliseum.ChatDAO;


public class ChatService {
    private List<MessageOnChat> messages;
    private AtomicInteger lastId = new AtomicInteger(0);
    private final ChatDAO chatDAO;//El final lo que hace es que si hay cambios da error
    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura
    
    public ChatService(ChatDAO chatDAO){
        this.chatDAO = chatDAO;
        this.lock = new ReentrantReadWriteLock();
        this.messages = this.chatDAO.getAllchats();
        int idnew = 0;
        for (MessageOnChat messageOnChat : messages) {
            if(idnew < messageOnChat.getId()){
                idnew = messageOnChat.getId(); 
            }
        }
        this.lastId = new AtomicInteger(idnew);
    }

    // public List<String>
    public void addMessage(String username, String message) {
        var writeLock = this.lock.writeLock();
        writeLock.lock();
        
        try{
            synchronized (messages) {
                //this.lastId = new AtomicInteger(messages.size());
                var msg = new MessageOnChat(lastId.incrementAndGet(), username, message);
                messages.add(msg);
                chatDAO.updatechat(msg);
                if (messages.size() > 10) {
                    int idDelete = this.lastId.get();
                    for (MessageOnChat messageOnChat : messages) {
                        if(idDelete>messageOnChat.getId()){
                            idDelete = messageOnChat.getId(); 
                        }
                    }
                    messages.remove(0); // Keep only the last 50 messages
                    chatDAO.deletechat(idDelete);
                }
            }
        }finally{
            writeLock.unlock();
        }
    }

    public Optional<List<MessageOnChat>> getLastMessages(int since) {
        //this.messages = this.chatDAO.getAllchats();
        List<String> newMessages = new ArrayList<>();
        List<MessageOnChat> nM = new ArrayList<>();
        int latestId = since;
        
        var readLock = this.lock.readLock();
        readLock.lock();
        try{
            synchronized (messages) {
                for (MessageOnChat msg : messages) {
                    if (msg.getId() > latestId) {
                        newMessages.add(msg.getText());
                        nM.add(msg);
                        latestId = msg.getId();
                    }
                }
            }
        }finally{
            readLock.unlock();
        }
        // String[] msges = (String[]) newMessages.toArray();

        // for (int i = 0; i<newMessages.size();i++) {
        //     msges[i] = newMessages.get(i);
        // }

        // Optional<String[]> response = Optional.of(msges);

        return Optional.of(nM);
    }
}
