package es.urjc.tchs.demorobotcolliseum;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class User {
    private String username;
    private String password;
    private long lastseen;

    @JsonCreator
    public User( @JsonProperty("username")  String user, @JsonProperty("password")  String pass, long lastSeen ){
        username = user;
        password = pass;
        lastseen = lastSeen;
    }

    public String getUsername(){
        return this.username;
    }

    public long getLastSeen(){
        return this.lastseen;
    }

    public String getPassword(){
        return this.password;
    }
}
