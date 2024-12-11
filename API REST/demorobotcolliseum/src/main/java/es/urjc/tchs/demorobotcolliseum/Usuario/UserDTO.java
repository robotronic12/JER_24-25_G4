package es.urjc.tchs.demorobotcolliseum.Usuario;

public class UserDTO {
    
    private String name;
    private Long lastSeen;

    public UserDTO(User user){
        this.name = user.getUsername();
        this.lastSeen = user.getLastSeen();
    }

    public String getName(){
        return this.name;
    }
    public Long getLastSeen(){        
        return this.lastSeen;
    }

}
