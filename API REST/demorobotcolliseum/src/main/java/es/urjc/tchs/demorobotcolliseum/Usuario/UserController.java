package es.urjc.tchs.demorobotcolliseum.Usuario;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/api/users")//Todas las peticiones a estos dos paths vienen aquí

public class UserController {

    //Esto no se debería hacer aquí devería estar en el UserService (El DAO solo tiene que hablar con el user service)
    //Un lock de escritura nadie más puede leer y uno de lectura si que permite que otros lean.
    @Autowired //Dice que lo siguiente puede ser inyectado
    private UserService userService;
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String username) throws IOException{
        Optional<User> user = (this.userService.getUser(username));

        //con el traspaso de user a userDTO hago que el usuario no pueda acceder a info que no quiero que se vea.
        return user.map((x)->ResponseEntity.ok(new UserDTO(x))).orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/activeUsers")
    public int getNumberOfActiveUsers() {
        return this.userService.getActiveUsers().size();
    }
    

    //Permite crear un usuario, lo devuelve por que queremos pero no hace falta.
    @PostMapping("/")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {

        boolean added = this.userService.registerUser(user);
        if(added){
            UserDTO userDTO = new UserDTO(user);
            return ResponseEntity.ok(userDTO);
        }
        else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/{username}/user")
    public ResponseEntity<UserDTO> actuliceUser(@PathVariable String username, @RequestBody User user) throws IOException {
        Optional<User> usu = this.userService.getUser(username);
        
        if(usu.isPresent()){
            usu.get().setUsername(user.getUsername());
            usu.get().setPassword(user.getPassword());
            UserDTO userDTO = (new UserDTO(usu.get()));
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping
    public ResponseEntity<UserDTO> deleteUser(@PathVariable String username) throws IOException{
        boolean delete = this.userService.deleteUser(username);
        if(delete){
            Optional<User> user = this.userService.getUser(username);
            if(user.isPresent()){
                this.userService.deleteUser(username);
                UserDTO userDTO = new UserDTO(user.get());
                return ResponseEntity.ok(userDTO);
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    

}
