package es.urjc.tchs.demorobotcolliseum;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final List<MessageOnChat> messages = new ArrayList<>();
    private final AtomicInteger lastId = new AtomicInteger(0);


    @GetMapping()
    public ChatResponse getMessages(@RequestParam(defaultValue = "0") int since) {
        List<String> newMessages = new ArrayList<>();
        int latestId = since;

        synchronized (messages) {
            for (MessageOnChat msg : messages) {
                if (msg.getId() > since) {
                    newMessages.add(msg.getText());
                    latestId = msg.getId();
                }
            }
        }

        return new ChatResponse(newMessages, latestId);
    }

    @PostMapping
    public void postMessage(@RequestParam String message) {
        synchronized (messages) {
            messages.add(new MessageOnChat(lastId.incrementAndGet(), message));
            if (messages.size() > 50) {
                messages.remove(0); // Keep only the last 50 messages
            }
        }
    }
}
