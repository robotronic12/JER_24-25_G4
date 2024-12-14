package es.urjc.tchs.demorobotcolliseum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import es.urjc.tchs.demorobotcolliseum.Usuario.UserService;

@SpringBootApplication
public class DemorobotcolliseumApplication {

	@Bean (name = "usersPath") //ESto no tiene dependencias-> lo puede resolver automáticamente 
	public String getUsersPath(){
		return "data/users";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemorobotcolliseumApplication.class, args);
	}

	// @Bean
	// //Esto no lo vamos a llamar nosostros pero lo hace Spring
	// public UserDAO getUserDAO(String usersPath){
	// 	return new UserDAO(usersPath);
	// }

	@Bean
	public UserService getUserService(UserDAO userDAO){ //Tiene dependencias entonces no lo puede hacer hasta que crea el userDAO
		return new UserService(userDAO);
	}
	//En este caso estamos trabajado 
}
