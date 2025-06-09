package es.urjc.tchs.demorobotcolliseum.Chat;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;

// List<T> a = new ArrayList<T>();
// a.add(new String());//Aquí no pasa nada 
// T C = (String) a.get(0); //Aqui hay qque poner el casting
// //Import en tiempo de ejecucion no existen los tipos genéricos así que puede dar problemas

@Repository
public class ChatDAO { //Data Array Object
    // Note: This is a very very simplified version of a DAO.
    // DAOs should be interfaces implemented by concrete repository implementations
    // Also, in spring we should use Hibernate or similar which simplifies 
    // the mapping between instances and the repositories.

    @Autowired
    @Qualifier("chatPath")
    private String chatPath; //Ruta de trabajo en nuestro caso es 

    public ChatDAO(String chatPath) {
        this.chatPath = chatPath; //Asignamos la ruta a nuestra clase.
    }

    public List<MessageOnChat> getAllchats(){
        var objectMapper = new ObjectMapper();

        Path path = Paths.get(chatPath);

        // Use Stream API to map files directly to chat objects and collect them into a
       try{
         // list
         return Files.list(path) // List all files in the directory //Es un string de datos
         .filter(Files::isRegularFile) // Ensure that only files are processed
         .filter(file -> file.toString().endsWith(".json")) // Only consider .json files
         //Con :file -> file.toString().endsWith(".json") nos quedamos únicamente con los archivos que terminan en .json.
         .map(file -> {//Map aplica la función a todos los elementos de la lista. No usamos for porque así se puede hacer en paralelo.
             try {
                 // Read the content of the JSON file and convert it to a chat object
                 return objectMapper.readValue(file.toFile(), MessageOnChat.class);//Se puede poner this.class para que fuera generico
             } catch (IOException e) {
                 e.printStackTrace(); // Handle the error appropriately
                 return null; // Return null in case of an error (could be handled differently)
             }
         })
         .filter(chat -> chat != null) // Filter out any null values in case of errors
         .collect(Collectors.toList()); // Collect the results into a List
       }
       catch(IOException nopath){
        nopath.printStackTrace();
        return new ArrayList<>();
       }
    }

    // Method to update the chat in the JSON file
    public boolean updatechat(MessageOnChat updatedchat) {
        try {
            var objectMapper = new ObjectMapper();
            // Construct the file path dynamically based on the chatname
            String filePath = this.chatPath + "/" + updatedchat.getId() + ".json";
            //El nombre del json es el del usuario, pero no es lo recomendado, para nada :v
            File file = new File(filePath);

            // Write the updated chat object back to the file
            objectMapper.writeValue(file, updatedchat);
            return true; // Successfully updated the file
        } catch (IOException e) {
            e.printStackTrace();
            return false; // Error occurred while updating the file
        }
    }

    // Method to delete the chat from the JSON file
    public boolean deletechat(int chatId) {
        try {
            // Construct the file path dynamically based on the chatname
            String filePath = this.chatPath + "/" + chatId + ".json";
            File file = new File(filePath);

            if (!file.exists()) {
                return false; // File does not exist, return false
            }

            // Delete the file (or overwrite it with empty content if you prefer)
            boolean isDeleted = file.delete(); // Deleting the file
            return isDeleted;
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Error occurred while deleting the file
        }
    }

    public Optional<MessageOnChat> getchat(int chatid) {
        try {
            // Construct the file path dynamically based on the chatname
            String filePath = this.chatPath + "/" + chatid + ".json";
            File file = new File(filePath);

            if (file.exists()) {
                var objectMapper = new ObjectMapper();

                // Write the updated chat object back to the file
                var chat = objectMapper.readValue(file, MessageOnChat.class);
                return Optional.of(chat);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Optional.empty();
    }
}