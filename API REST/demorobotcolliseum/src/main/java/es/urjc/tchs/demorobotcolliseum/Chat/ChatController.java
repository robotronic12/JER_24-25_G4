package es.urjc.tchs.demorobotcolliseum.Chat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tchs.demorobotcolliseum.Usuario.UserService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired //Dice que lo siguiente puede ser inyectado
    private ChatService chatService;
    public ChatController(ChatService c){
        this.chatService = c;
    }

    @GetMapping()
    public ResponseEntity<ChatResponse> getMessages(@RequestParam(defaultValue = "0") int since) {
        Optional<ChatResponse> msg = chatService.getMessages(since);
        if (msg.isPresent()) {
            return ResponseEntity.ok(chatService.getMessages(since).get());
        }
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping
    public void postMessage(@RequestParam String message) {
        chatService.addMessage(message);
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
