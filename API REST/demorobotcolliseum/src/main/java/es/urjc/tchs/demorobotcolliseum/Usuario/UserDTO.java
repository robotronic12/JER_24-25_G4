package es.urjc.tchs.demorobotcolliseum.Usuario;

public class UserDTO {
    
    private String name;
    private int color1;
    private int color2;

    public UserDTO(User user){
        this.name = user.getUsername();
        this.color1 = user.getColor1();
        this.color2 = user.getColor2();
    }

    public String getName(){
        return this.name;
    }

    public int getColor1() {
        return this.color1;
    }

    public int getColor2() {
        return this.color2;
    }
}
