package es.urjc.tchs.demorobotcolliseum.Chat;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatResponse {
    private final String[] messages;
    private final int timestamp;

    @JsonCreator
    public ChatResponse(@JsonProperty("messages") String[] messages, @JsonProperty("timestamp") int timestamp) {
        this.messages = messages;
        this.timestamp = timestamp;
    }

    public String[] getMessages() {
        return messages;
    }

    public int getTimestamp() {
        return timestamp;
    }
}
