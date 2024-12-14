package es.urjc.tchs.demorobotcolliseum.Chat;

public record MessageOnChat (int id, String text, String username){
    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    // public String getUserName
}
