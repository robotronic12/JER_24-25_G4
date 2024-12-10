package es.urjc.tchs.demorobotcolliseum;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


// @RestController
// @RequestMapping("api/chat")

// public class ChatController {
//     private final List<ChatMessage> messages = new ArrayList<>();
//     private final AtomicInteger lastId = new AtomicInteger(0);

//     public ChatReponse 
    

// }


// public static class ChatReponse{
//     private final List<String> chats
// }
//Cuando hay una cosa atómica se ejecuta como si solo hubiera una función. Esto hace que cuando se ejecutan a la vez
//Estos atomic si acceden a el mismo espacio en memoria son regulados y no pueden acceder a la vez, pero sí puede cambiar el orden.
//No van a haber problema de que dos personas accedan a lo mismo y de error.