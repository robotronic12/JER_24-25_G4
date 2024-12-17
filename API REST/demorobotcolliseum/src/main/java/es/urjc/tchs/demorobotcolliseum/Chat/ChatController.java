package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired //Dice que lo siguiente puede ser inyectado
    private ChatService chatService;
    public ChatController(ChatService c){
        this.chatService = c;
    }

    @GetMapping()
    public ResponseEntity<String> getMessages(@RequestParam(defaultValue = "0") int since) {
        Optional<String[]> msg = chatService.getLastMessages(since);
        if (msg.isPresent()) {
            StringBuilder sb = new StringBuilder();
            for (String s : msg.get()) {
                sb.append(s).append(" ");
            }
            String combinado = sb.toString().trim();
            return ResponseEntity.ok(combinado);//chatService.getLastMessages(since)
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping("/{username}/chat")
    public void postMessage(@PathVariable String username, @RequestParam String message) {
        chatService.addMessage(username, message);
    }
}

/*
 * Funciones que va a tener que implementar el chat:
 * 
 * getRecentChats()
 * 
 * postMenssage()
 * 
 */
