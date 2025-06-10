package es.urjc.tchs.demorobotcolliseum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import es.urjc.tchs.demorobotcolliseum.Chat.ChatDAO;
import es.urjc.tchs.demorobotcolliseum.Chat.ChatService;
import es.urjc.tchs.demorobotcolliseum.Spring.WebsocketEchoHandler;
import es.urjc.tchs.demorobotcolliseum.Usuario.UserDAO;
import es.urjc.tchs.demorobotcolliseum.Usuario.UserService;

@SpringBootApplication
@EnableWebSocket
public class DemorobotcolliseumApplication implements WebSocketConfigurer{

	//Para acceder al servidor necesitamos la ip del dispositivo en el que está.

	@Bean (name = "usersPath") //ESto no tiene dependencias-> lo puede resolver automáticamente 
	public String getUsersPath(){
		return "data/users";
	}
	@Bean (name = "chatPath") //ESto no tiene dependencias-> lo puede resolver automáticamente 
	public String getChatPath(){
		return "data/chat";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemorobotcolliseumApplication.class, args);
	}

	@Bean
	public UserService getUserService(UserDAO userDAO){ //Tiene dependencias entonces no lo puede hacer hasta que crea el userDAO
		return new UserService(userDAO);
	}
	@Bean
	public ChatService getChatService(ChatDAO chatDAO){ //Tiene dependencias entonces no lo puede hacer hasta que crea el userDAO
		return new ChatService(chatDAO);
	}
	
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(echoHandler(), "/echo").setAllowedOrigins("*");
    }    

    @Bean
    public WebsocketEchoHandler echoHandler() {
        return new WebsocketEchoHandler();
    }
	//En este caso estamos trabajado 

	// @Bean
	// //Esto no lo vamos a llamar nosostros pero lo hace Spring
	// public UserDAO getUserDAO(String usersPath){
	// 	return new UserDAO(usersPath);
	// }
}
