package es.urjc.tchs.demorobotcolliseum;

public class UserDTO {
    
    private String name;
    private Long lastSeen;
    public UserDTO(User user){
        this.name = user.getUsername();
        this.lastSeen = user.getLastSeen()
    }

}
