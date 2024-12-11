package es.urjc.tchs.demorobotcolliseum;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import es.urjc.tchs.demorobotcolliseum


@Service
public class UserService {
    @Autowired
    private final UserDAO userDAO;//El final lo que hace es que si hay cambios da error

    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura
    //private ConcurrentMap<String, User> users; //Esto complica las cosas porque me crea una nueva extrutura.


    public UserService(UserDAO userdAO){
        this.userDAO = userdAO;
        this.lock = new ReentrantReadWriteLock();
    }
    
    public boolean login(String username, String password){
        var readLock = this.lock.readLock();
        readLock.lock();
        try{
            var user = this.userDAO.getUser(username);
            if (user == null){
                return false;
            }
            if(user.isPresent()){
                return user.get().getPassword().equals(password); 
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

            // for (User user : users) {
            //     if(user.getUsername()== name){
            //         return Optional.of(user);
            //     }
            // }
            Optional<User> user= userDAO.getUser(name);
            return user;
            //(users.values().stream().filter(usu -> usu.getUsername().equals(name)).findAny());
        }finally{
            readLock.unlock();
        }
    }




    public boolean registerUser(User newUser){
        var writeLock = lock.writeLock();//Al ser de escritura solo bloquea si está escribiendo.
        writeLock.lock();//Hay que desbloquearlo después. Lo bueno es que en java cuando no se usa lo descarta.

        // optional/*.map(null) */.orElseGet(null);//El map permite hacer algo
        try{
            boolean added = this.userDAO.updateUser(newUser);//Me indica si se ha añadidos
            //Si lo hacemos con una estructura de datos podemos comproar si esta con esta y luego hay que actualizarla si se crea.
            //var optional =  Optional.of(newUser);

            return added;
            
            // return optional;
            // return Optional.empty();

        }finally{
            writeLock.unlock();//Cuando termina lo desbloquea
        }
    }

    public boolean deleteUser (String username){
        var writeLock = lock.writeLock();
        writeLock.lock();
        try{            
            return this.userDAO.deleteUser(username);
        }finally{
            writeLock.unlock();
        }
    }

    // public Optional<User> updateLastSeen(){

    // }

    public List<User> getActiveUsers(long when){

        var readLock = lock.readLock();
        readLock.lock();

        List<User> usuariosAct;
        
        long timeOfWait = 10;
        //List<User> users = userDAO.getAllUsers();

        try{
            usuariosAct =  userDAO.getAllUsers().stream().filter(user -> user.getLastSeen() <= timeOfWait).collect(Collectors.toList());
            return usuariosAct;
        }finally{
            readLock.unlock();
        }

    }
}





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