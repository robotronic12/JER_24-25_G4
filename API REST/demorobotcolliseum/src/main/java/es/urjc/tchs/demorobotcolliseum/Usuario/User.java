package es.urjc.tchs.demorobotcolliseum.Usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private String username;
    private String password;

    @JsonCreator
    public User( @JsonProperty("username")  String user, @JsonProperty("password")  String pass ){
        username = user;
        password = pass;
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
}
