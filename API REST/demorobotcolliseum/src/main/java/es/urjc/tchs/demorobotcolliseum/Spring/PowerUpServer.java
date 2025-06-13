package es.urjc.tchs.demorobotcolliseum.Spring;

public class PowerUpServer {
    public String type;
    public String owner;
    public int x;
    public int y;

    public PowerUpServer(String type, String playerId, int x, int y) {
        this.type = type;
        this.owner = playerId;
        this.x = x;
        this.y = y;
    }
}
