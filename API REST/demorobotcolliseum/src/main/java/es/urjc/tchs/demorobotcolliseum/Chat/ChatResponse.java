package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.List;

public class ChatResponse {
    private final List<String> messages;
    private final int timestamp;

    public ChatResponse(List<String> messages, int timestamp) {
        this.messages = messages;
        this.timestamp = timestamp;
    }

    public List<String> getMessages() {
        return messages;
    }

    public int getTimestamp() {
        return timestamp;
    }
}
