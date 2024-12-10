package es.urjc.tchs.demorobotcolliseum;

import java.util.Optional;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import es.urjc.tchs.demorobotcolliseum

import com.fasterxml.jackson.datatype.jdk8.OptionalSerializer;

@Service
public class UserService {
    @Autowired
    private final UserDAO userDAO;//El final lo que hace es que si hay cambios da error

    public final ReentrantReadWriteLock lock; //Cuando usamos esto si yo estoy escribiendo no dejo ni lectura ni escritura


    public UserService(UserDAO userdAO){
        this.userDAO = userdAO;
        this.lock = new ReentrantReadWriteLock();
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
    
    public  Optional<User> getUser(String name){
        var readLock = lock.readLock();
        readLock.lock();

        try{
            userDAO.getAllUsers()
        }

    }


    public boolean registerUser(User newUser){
        var writeLock = lock.writeLock();//Al ser de escritura solo bloquea si está escribiendo.
        writeLock.lock();//Hay que desbloquearlo después. Lo bueno es que en java cuando no se usa lo descarta.

        // optional/*.map(null) */.orElseGet(null);//El map permite hacer algo
        try{
            boolean added = this.userDAO.updateUser(newUser);//Me indica si se ha añadidos
            var optional =  Optional.of(newUser);

            return added;
            
            // return optional;
            // return Optional.empty();

        }finally{
            writeLock.unlock();//Cuando termina lo desbloquea
        }
    }

    public boolean deleteUser (String username){
        var writeLock = lock.writeLock()
        writeLock.lock();
        try{            
            return this.userDAO.deleteUser(username);
        }finally{
            writeLock.unlock();
        }
    }

    // public User registUser(User newUser){
    //     this.userDAO.updateUser(newUser);
    //     return Optional.of(newUser);
    // }
}
