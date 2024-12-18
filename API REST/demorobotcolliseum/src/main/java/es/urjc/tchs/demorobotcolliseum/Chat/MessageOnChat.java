package es.urjc.tchs.demorobotcolliseum.Chat;

import com.fasterxml.jackson.annotation.JsonProperty;

@JsonCreator
public class MessageOnChat{
    int id;
    String user;
    String text;

    MessageOnChat(@JsonProperty("id") Integer id,
        @JsonProperty("text") String text, 
        @JsonProperty("user") String user){
        this.id = id;
        this.text = text;
        this.user = user;
    }
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

    public String getUser() {
        return user;
    }

    public void setId(Integer i){
        this.id = i;
    }

    public void setText(String i){
        this.text = i;
    }

    public void setUser(String i){
        this.user = i;
    }
    // public String getUserName
}
