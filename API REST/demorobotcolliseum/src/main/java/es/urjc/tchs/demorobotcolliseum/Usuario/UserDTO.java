package es.urjc.tchs.demorobotcolliseum.Usuario;

public class UserDTO {
    
    private String name;

    public UserDTO(User user){
        this.name = user.getUsername();
    }

    public String getName(){
        return this.name;
    }
}
