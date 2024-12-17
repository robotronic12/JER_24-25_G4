package es.urjc.tchs.demorobotcolliseum.Usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private String username;
    private String password;
    private int color1;
    private int color2;

    @JsonCreator
    public User(@JsonProperty("username") String user,
        @JsonProperty("password") String pass,
        @JsonProperty("color1") int color1,
        @JsonProperty("color2") int color2){
        username = user;
        password = pass;
        color1 = 1; //blue
        color2 = 2; //red
    }

    public void copiaProfunda(User user){
        this.username = user.username;
        this.password = user.password;
        this.color1 = user.color1;
        this.color2 = user.color2;
    }

    public String getUsername(){
        return this.username;
    }

    // public long getLastSeen(){
    //     LocalTime horaActual = LocalTime.now();
    //     return Duration.between(horaActual, lastseen).getSeconds();
    // }

    public String getPassword(){
        return this.password;
    }

    public void setUsername(String name){
        this.username = name;
    }

    // public void setLastSeen(){        
    //     LocalTime horaActual = LocalTime.now();
    //     this.lastseen = horaActual;
    // }

    public void setPassword(String password){
        this.password = password;
    }
    public int getColor1() {
        return color1;
    }

    public void setColor1(int color1) {
        this.color1 = color1;
    }

    public int getColor2() {
        return color2;
    }

    public void setColor2(int color2) {
        this.color2 = color2;
    }
}
