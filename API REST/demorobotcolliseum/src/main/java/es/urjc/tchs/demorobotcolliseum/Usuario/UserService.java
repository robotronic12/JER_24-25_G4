package es.urjc.tchs.demorobotcolliseum.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import es.urjc.tchs.demorobotcolliseum

import es.urjc.tchs.demorobotcolliseum.UserDAO;


@Service
public class UserService {
    @Autowired
    private final UserDAO userDAO;//El final lo que hace es que si hay cambios da error

    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura
    private ConcurrentHashMap<String, Long> usersAct; //Esto complica las cosas porque me crea una nueva extrutura.
    //private ArrayList<String> usersLog;


    public UserService(UserDAO userdAO){
        this.userDAO = userdAO;
        this.lock = new ReentrantReadWriteLock();
        this.usersAct = new ConcurrentHashMap<>();
        //this.usersLog = new ArrayList<>();
    }
    
    public boolean login(String username, String password){
        var readLock = this.lock.readLock();
        readLock.lock();
        try{
            var user = this.userDAO.getUser(username); //Bien
            if(user.isPresent() && user.get().getPassword().equals(password)){
                //this.usersLog.add(username);
                this.updateLastSeen(username); //Está mal
                return true; 
            }
            return false;
            //si esto lo hacemos con baeldung y lo codificamos nos dan más notas. Así que habría que mirarlo.
        }finally{
            readLock.unlock();
        }
    }
    
    public Optional<User> getUser(String name){
        var readLock = lock.readLock();
        readLock.lock();

        try{
            //List<User> users = userDAO.getAllUsers();
            //Si tenemos extructuras de datos solo hay que pillar el que sea de la misma.
            Optional<User> user= userDAO.getUser(name);
            return user;
        }finally{
            readLock.unlock();
        }
    }

    public Optional<User> modifyUser(String username, User user){
        Optional<User> usu = this.getUser(username);
        this.updateLastSeen(username);
        
        if(usu.isPresent()){
            usu.get().copiaProfunda(user);
            return Optional.of(usu.get());
        }
        return Optional.empty();
    }


    public boolean registerUser(User newUser){
        var writeLock = lock.writeLock();//Al ser de escritura solo bloquea si está escribiendo.
        writeLock.lock();//Hay que desbloquearlo después. Lo bueno es que en java cuando no se usa lo descarta.
        Optional<User> us = getUser(newUser.getUsername());
        // optional/*.map(null) */.orElseGet(null);//El map permite hacer algo
        try{
            if(!us.isPresent()){
                boolean added = this.userDAO.updateUser(newUser);//Me indica si se ha añadidos
                if(added) {
                    this.usersAct.put(newUser.getUsername(), System.currentTimeMillis());
                    //this.usersLog.add(newUser.getUsername());
                }
                return added;
            }
            //Si lo hacemos con una estructura de datos podemos comproar si esta con esta y luego hay que actualizarla si se crea.
            return false;
        }finally{
            writeLock.unlock();//Cuando termina lo desbloquea
        }
    }

    public boolean deleteUser (String username){
        var writeLock = lock.writeLock();
        writeLock.lock();
        try{     
            //if(this.usersLog.contains(username)&&this.usersLog.contains(username))
            {
                boolean delete =this.userDAO.deleteUser(username);
                if(delete){
                    this.usersAct.remove(username);
                    //this.usersLog.remove(username);
                }
                return delete;
            }       
            //return false;
        }finally{
            writeLock.unlock();
        }
    }

    public void updateLastSeen (String username){
        if(this.usersAct.containsKey(username)){
            this.usersAct.put(username, System.currentTimeMillis());                
        }
    }

   
    public List<String> getActiveUsers(long threshold) {

        List<String> connected = new ArrayList<>();

        long currentTimeMillis = System.currentTimeMillis();

        for (var entry: this.usersAct.entrySet()) {
            
            if (entry.getValue() > (currentTimeMillis - threshold)) {
                connected.add(entry.getKey());
            }
            
            // if (entry.getValue() < (currentTimeMillis - threshold)) {
            //     this.usersAct.remove(entry.getKey());
            // }
        }
        
        return connected;        
    }
}



 // public List<User> getActiveUsers(){

    //     var readLock = lock.readLock();
    //     readLock.lock();

    //     List<User> usuariosAct;
        
    //     long timeOfWait = 10;
    //     //List<User> users = userDAO.getAllUsers();

    //     try{
    //         usuariosAct =  userDAO.getAllUsers().stream().filter(user -> user.getLastSeen() <= timeOfWait).collect(Collectors.toList());
    //         return usuariosAct;

    //     }finally{
    //         readLock.unlock();
    //     }

    // }

    // public boolean/*Optional<User> */registerUser(User newUser){
    //     var readLock = lock.readLock(); //Bloquea si está leyendo o escribiendo
    //     readLock.lock();//Hay que desbloquearlo después. Lo bueno es que en java cuando no se usa lo descarta.

    //     // optional/*.map(null) */.orElseGet(null);//El map permite hacer algo
    //     try{
    //         boolean added = this.userDAO.updateUser(newUser);//Me indica si se ha añadidos
    //         var optional =  Optional.of(newUser);
    //         return added;
    //         // return optional;
    //         // return Optional.empty();

    //     }finally{
    //         readLock.unlock();//Cuando termina lo desbloquea
    //     }
    // }