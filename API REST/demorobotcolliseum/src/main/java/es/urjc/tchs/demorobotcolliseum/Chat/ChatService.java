package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.RequestParam;

public class ChatService {
    private final List<MessageOnChat> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);

    // public List<String>
    public void addMessage(String message) {
        synchronized (messages) {
            messages.add(new MessageOnChat(lastId.incrementAndGet(), message));
            if (messages.size() > 50) {
                messages.remove(0); // Keep only the last 50 messages
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

        return new ChatResponse(newMessages, latestId);
    }
}
