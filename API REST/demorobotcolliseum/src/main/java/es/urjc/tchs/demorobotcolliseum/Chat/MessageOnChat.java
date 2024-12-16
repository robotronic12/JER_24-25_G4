package es.urjc.tchs.demorobotcolliseum.Chat;

import io.micrometer.common.util.internal.logging.WarnThenDebugLogger;

public class MessageOnChat{
    int id;
    String user;
    String text;

    MessageOnChat(int id, String username, String message){
        this.id = id;
        this.user = username;
        this.text = message;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    // public String getUserName
}
