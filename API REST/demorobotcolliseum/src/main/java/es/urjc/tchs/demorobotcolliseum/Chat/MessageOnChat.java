package es.urjc.tchs.demorobotcolliseum.Chat;


public class MessageOnChat{
    int id;
    String user;
    String text;

    MessageOnChat(){
        this.id = 0;
        this.text = " ";
        this.user = " ";
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

    // public String getUserName
}
