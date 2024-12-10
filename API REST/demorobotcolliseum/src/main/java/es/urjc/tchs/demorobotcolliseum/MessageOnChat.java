package es.urjc.tchs.demorobotcolliseum;

public record MessageOnChat (int id, String text){
    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
