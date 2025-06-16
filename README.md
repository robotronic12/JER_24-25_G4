# Este es el proyecto del juego de JER del año 24-25 del grupo 4.





# GDD “Robot Coliseum”
Two Chain Studios

### Realizado por:

Alba Poza Vela

Alberto Palomino Montañez

Julio Hornos Rodriguez

Francisco Peña caldito

## Video Fase 4
[>>Video Fase 4<<](https://youtu.be/ZkGQQjHR9JQ)

## Enlaces del juego
Gamejolt: https://gamejolt.com/games/RobotColliseum/1000104

Itch.io: https://alba1212.itch.io/robot-colliseum

## Índice
#### Índice
#### Introducción
#### Concepto de juego
#### Género del juego
#### Propósito y público objetivo
#### Modelo de negocio y plataformas
#### Estilo visual
#### Licencia
#### Mecánicas
#### Movimiento y salto
#### Disparo
#### Power-Ups
#### Narrativa
#### Música
#### Niveles
#### Diseño de interfaces
#### Arte y concept art
#### Inspiraciones del juego



## Introducción
### Concepto de juego
“Robot Coliseum” es el juego multijugador 2D donde dos jugadores controlan robotitos.
Los jugadores se enfrentarán en un coliseo saltando entre plataformas disparando armas y recolectando powerup. El objetivo es derrotar al contrincante.
Idealmente, se harán varios niveles diferentes.
### Género del juego
“Robot Coliseum” es un shooter lateral de plataformas multijugador principalmente con mecánicas y dinámicas arcade.
### Propósito y público objetivo
El juego estará destinado para todo tipo de públicos, no habiendo contenidos ni violencia explícita. Además, el objetivo del juego será proporcionar entretenimiento para los jugadores, compitiendo entre ellos y así pasándolo bien. 
### Modelo de negocio y plataformas
El juego será un free2play para ordenadores.
### Estilo visual
El estilo del juego va a ser centrado en una estética 2D, con dibujos y animaciones con colores vivos y diseños caricaturescos.
### Licencia
El proyecto será realizado enteramente por nosotros, a excepción de, probablemente, una serie de sprites o imágenes que se obtendrán de internet, para acreditarlos en caso de ser así.

## Mecánicas
### Movimiento y salto
El personaje puede desplazarse libremente hacia la derecha o izquierda a través del escenario similar a los videojuegos de plataformas tradicionales. Esto incluye:
Movimiento lateral: Utilizando las teclas “A” o “D”  el personaje podrá desplazarse hacia la izquierda y derecha. Además de esas teclas el jugador tendrá la opción de moverse con las flechas.
Velocidad base: el personaje dispone de una velocidad de movimiento base que se modificara mediante los power ups
Además el jugador dispondrá de saltar para avanzar a través de las plataformas haciendo uso de la tecla “Espacio”.
### Disparo
El disparo es una de las mecánicas principales del juego. El jugador puede disparar según la posición del ratón. El jugador dispondrá de munición infinita y en caso de quedarse sin balas se recargará el arma automáticamente para darle una sensación más frenética al juego.
### Power-Ups
A través de los niveles el jugador encontrará items recolectables que ofrecen mejoras temporales. Los power-ups serían los siguientes:
Aumento de velocidad: Incrementa la velocidad de movimiento del personaje por un tiempo limitado. 
Aumento de daño: incrementa el daño que realizan los disparos del personaje por un tiempo limitado
Aumento velocidad de disparo: el jugador dispara más rápido
Aumento de salto: incrementa la capacidad de salto del jugador.
Disparos múltiples: Permite al jugador disparar múltiples proyectiles a la vez. 

## Narrativa
El juego se desarrollará en un futuro superdesarrollado donde la gente muere por el aburrimiento extremo al no haber nada por descubrir. Un día un visionario a la vez que alocado ingeniero propone a las gentes del futuro un torneo donde cada uno pueda crear y poner a luchar a un robot para así poder calmar el aburrimiento. ¡Elige un robot y pelea con tus amigos para así matar al aburrimiento!

## Música
Para este videojuego, se ha decidido implementar una banda sonora con un estilo arcade de tensión, haciendo así más interesantes y emocionantes las batallas entre jugadores.
## Niveles
Los niveles en el juego serán escenarios fijos construidos por distintas plataformas por las que los jugadores se moverán y que usarán para intentar ganar una ventaja sobre el contrincante, ya sea por encontrar aperturas en las paredes, salas con  mejoras, posiciones elevadas, etc.
Se desarrollarán una serie de niveles para que el juego sea más variado y divertido para el jugador.

## Inspiraciones del juego
Hemos tomado varias inspiraciones a la hora de desarrollar el juego, sus mecánicas y sus diseños. Las principales son:

Duck Game,
Move or die,
Rounds,
Stick fight

# Desarrollo de Multijugador Local
## Juego: Robot Coliseum

Esta es la memoria sobre como se ha avanzado y desarrollado nuestro juego Robot Coliseum a lo largo de la parte 2 práctica. Se explicarán entre otras cosas el progreso 
artístico, de programación y mecánico del juego.

### Primeros pasos
Antes de implementar nada, se volvió a ver las decisiones tomadas en el GDD para así establecer objetivos a nivel de arte y programación, además de considerar que mecánicas 
y partes del juego eran asumibles para terminar un prototipo funcional y estético. Una vez reflexionadas estas cuestiones se separó las tareas a nivel de arte y a nivel de 
programación que serían realizadas de manera variada por todos los integrantes del grupo.

### Arte
En la parte artística se ha diseñado y desarrollado toda parte estética relacionada con el juego para poder obtener un resultado estético y acorde con la narrativa y contexto
del juego, se ha separado entre diseños a nivel de UI y Elementos In-Game.

Los elementos a desarrollar en cuanto a UI han sido: diseño de botones, fuentes del juego y fondos.

Los elementos a desarrollar en cuanto al In-Game han sido: personajes (diseño y animaciones), plataformas, suelo, fondo y balas (parte artística + estela a nivel de programación).

Todos los elementos han sido realizados usando las siguientes herramientas: Krita y Photopea.

### Música
En el juego se ha usado efectos de sonido y música en su mayoría sacada de internet con el objetivo de hacer más único e inmersivo el juego y controlada su gestión mediante
programación en los distintos scripts del proyecto.

### Programación y Código 
La parte más amplia del proyecto ha sido la parte implementable, se ha desarrollado mediante el uso de la librería Phaser 3 en conjunto con un html donde se aloja
nuestro juego y a su vez se declaran las características básicas del juego (tecnología de renderizado usada, tamaño de pantalla, color de fondo, tipo de físicas y 
lista de escenas del juego).

#### Jugadores
Ya que por ahora solo se ha desarroyado un multijugador local, no podemos implementar el imput de los jugadores como se desea, así que se han tocado un poco las teclas que estos van a usar.
Para el movimiento, se usará para el Jugador1, A y D para el movimiento lateral hacia la izquierda y derecha respectivamente, W para saltar y S para disparar.
De forma paralela, le Jugador2 Se mieve con las flechas izquierda y derecha para el movimiento lateral, la flecha de arriba para saltar y la de abajo para disparar.
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/jugador/j1.png"></div>
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/jugador/j2.png"></div>

#### Balas
Las balas que disparan los jugadores son la forma en la que uno derrota al otro. Estas están compuestas por un sprite de bala y una estela que sigue su trayectoria, haciendo más facil su visivilidad.

#### Power Ups
Los Power Ups son mejoras que los jugadores pueden recoger para hacerse más poderosos. Hacen cosas como Aumentar la velocidad del jugador, de la bala, darle más daño, curar, aumentar el salto y disparar multiples balas a la vez
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/powerups/Danio.png"></div>

#### MenuInicio 
Esta es la pantalla de inicio del juego a partir de la cual se pueden accederr al resto de pantallas, sobre todo se gestionan los recursos referentes al menú de inicio
(botones, sonidos y transiciones al resto de escenas), también a partir de esta escena se puede salir del juego opción que cerrará la ventana del juego. En cuanto 
al resto de opciones a realizar se podrá ir al menú de opciones que permite configurar las opciones del juego y jugar al juego lo que llevará al jugador a la pantalla 
In-Game.
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/image.png"></div>

#### Ajustes
Dentro de esta pantalla habrá solo 2 opciones: salir al menú de inicio y configurar el volumen del juego mediante los botones con flechas, el volumen se mantendrá para 
el resto de escenas mediante el uso de una variable global implementada en Globals.js.
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/image-1.png"></div>

#### Juego
Dentro de la pantalla de juego porán jugar 2 personas al juego mediante los siguientes controles:
J1 movimiento: wad, disparo:s
J2 movimiento: flechas (izq, arriba y derecha) disparo: flecha abajo
El objetivo será derrotar al otro jugador mediante disparos para así quitarle toda la vida y ganar, los disparos del jugador dependeran de a donde esté mirando y de la
velocidad de este en el momento de disparar permitiendo así al jugador disparar de distintas y variadas maneras. Los jugadores podrán recoger powerups que caerán del 
cielo y les darán ventajas como: velocidad de movimiento o ataque, rapidez de bala, disparo múltiple etc. Una vez un jugador mate al otro se transicionará a la pantalla
de victoria mostrando cuál es el jugador ganador.
También se podrá pausar el juego mediante la tecla escape lo que transicionará a la escena de pausa. 
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/image-4.png"></div>

#### Pantalla Pausa
En esta pantalla se podrán hacer 3 cosas: gestionar las opciones del juego (ir a pantalla de ajustes con referencia a pausa para poder retornar), reanudar la partida 
(volvemos a la pantalla de juego) y salir al menú de inicio (retornamos a la pantalla de inicio).
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/image-2.png"></div>

#### Pantalla Victoria
Una vez uno de los jugadores derrote al otro se transicionará a esta pantalla, dependiendo de que jugador mate a quién se guardará un resultado en la variable global 
jugadorGanador lo que determinará el texto de felicitaciones (Victoria J1/J2), una vez mostrado el texto la única opción a realizar es el retorno al menú de inicio 
mediante pulsar el único boton en pantalla.
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/image-3.png"></div>

#### Globals
En este script se han creado una serie de variables comunes/necesarias en varias escenas para así poder mantener/variar valores, variables como volumenJuego o jugadorGanador
se han imlementado aquí.

# Desarrollo de Multijugador Local
En este apartado se ha desarrollado los apartados correspondientes a la comunicación entre cliente y servidor.

### Menús de registro e inicio de sesión
Se ha implementado una escena que habilita el inicio de sesión si tienes una cuenta creada o registrarte desde 0 si no la tienes
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/registro.png"></div>

### Chat
Se ha creado un chat en el que se puede hablar, mandando mensajes al servidor y reciviendo de igual manera.
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/chat.png"></div>

### Interfaz usuarios activos
También, se ha implementado una interfaz donde te muestra los usuarios activos en todo momento en el juego.

### Selección de color de robots
Por último, se ha implementado un sistema de elección de color del personaje
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/seleccionColor.png"></div>

### Diagrama UML de las clases
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/Imagen de WhatsApp 2024-12-17 a las 21.06.38_af36e915.jpg"></div>

# Desarrollo multijugador online
En esta parte se ha desarrollado la comunicación mediante Web Sockets durante el juego.

## Descripción del protocolo
Los mensajes enviados durante el juego, a través de los web sockets son los siguientes:

### "MessageItem"
Este mensaje tiene la siguiente extructura:

{

    "id": "1",  
    
    "type": "MessageItem",    
    
    "item":{  
    
        "itemId": "12345",  
        
        "itemType": "speedUp",  
        
        "itemPosition": {  
        
            "x": 10.0,  
            
            "y": 20.0  
            
        },  
        
        "timestamp": "2023-10-01T12:00:00Z",  
        
        "collected": true,   
        
        "owner": "J1"  
        
    }  
    
}  

Si "collected" es true nos indicará que se ha recogido un item y el campo "owner" indicará el jugador que lo ha recogido, en caso contrario nos indica que se ha creado el item y la posición en la que se ha creado.

### "MessageJPlayer"
Este mensaje lo manda cada cliente al servidor para que lo refleje en el otro jugador. Su estructura es la siguiente:

{

    "id": "1",
    
    "type": "MessageJPlayer",
    
    "player": {
    
        "id": "Player1",
        
        "x": 123,
        
        "y": 456,
        
        "vx": 10,
        
        "vy": 0,
        
        "timestamp": 1723991172754
        
    }
    
}

"id" indica que jugador se ha movido junto con su posicion y la velocidad para que pueda ser simulado en el otro jugador.

### "MessageDisparo"
Este mensaje es enviado por el cliente que realiza un disparo. Contiene las caracteristicas necesarias del disparo para que el servidor lo reeenvie al otro cliente.
Su estructura es la siguiente:

{

    "id": "6",
    
    "type": "MessageDisparo",
    
    "disparo": {
    
        "x": 100,
        
        "y": 200,
        
        "offsetX": 1,
        
        "offsetY": 0,
        
        "danio": 10,
        
        "velBala": 300
        
    }
    
}


### "MessageEnd"
Este mensaje lo manda el servidor cuando considera que la partida ha terminado. Sigue la siguiente extructura:  

{

    "id": "1",  
    
    "type": "MessageItem",  
    
    "player": 1  
    
}

"player" es el id del jugador que ha ganado la partida.  

### "MessageDamage"
Lo manda el master cada vez que detecta que hay un daño en alguno de los dos jugadores para que actualice la vida de los jugadores y las refleje en los clientes.
Su estructura es la siguiente:

{

    "id": "2",
    
    "type": "MessageDamage",
    
    "damage": {
    
        "target": "J1",
        
        "amount": 20
        
    }
    
}

"target" nos indica el jugador afectado y "amount" es la cantidad de daño que le hace.

### "DesconectionVictory"
Mensaje enviado cuando se desconecta uno de los clientes que estan jugando. Su estructura es:

{

    "id": "3",
    
    "type": "DesconexionVictory",
    
    "player": "J1"
    
}

"player" indica el jugador que aun sigue conectado y que es declarado como ganador por desconexion.

### "MessageManagerResponse"
Este mensaje se manda al principio y sirve para definir qué jugador es el J1 y cual es el J2.  

{  

    "id": "1",  
    
    "type": "MessageItem",  
    
    "master": false  
    
}

Cuando el cliente hace la petición para saber si es el jugador 1 o el 2  el mensaje no tendrá necesariamente el campo "master" dado que este campo solo se utiliza cuando el servidor le indica si es el jugador 1 o no.  

### "EmpiezaPartida"
Este mensaje es enviado por el servidor cuando ya hay dos jugadores conectados. Su estructura es:

{
    
    "id": "1",
    
    "type": "MessageBegin",
    
    "ready": true  
    
}

Su recepcion activa la variable global "initPlay" en el cliente para iniciar la partida.

### "NoMorePlayers"
Indica que ya hay suficientes jugadores conectados y que no se aceptan mas. Su estructura es:

{

    "id": "4",
    
    "type": "NoMorePlayers"
    
}

Activa la variable global de "noPlaying" para indicar que ese jugador esta en espera

### "MessagePlat"
Sirve para sincronizar las plataformas, indica que se deben reiniciar las plataformas del juego. Su estructura es:

{

    "id": "5",
    
    "type": "MessagePlat",
    
    "reinicio": true
    
}


## Diagrama UML actualizado 
<div align="center"><img src="API REST\demorobotcolliseum\src\main\resources\static\assets/ReadMe/diagramaParte4.png"></div>

# Intrucciones de uso
## Como crear el .jar
1. Abrir el proyecto de visual en la carpeta API REST y localizar la carpeta demorobotcollisem en la terminal: cd demorobotcolliseum
2. Creamos el jar en la carpeta especificada (target): .\mvnw.cmd package
3. Desde aquí podemos ejecutar el .jar mediante la siguiente instrucción: java -jar .\target\demo-0.0.1-SNAPSHOT.jar
4. En caso de no estar en la ruta de la carpeta demorobotcolliseum, crear nueva terminal y seguir los siguientes pasos mostrados a continuación.

## Como iniciar servidor mediante .jar:
1. Abrir la carpeta API REST desde el visual studio code
2. Ubicarse en la carpeta demorobotcolliseum (raíz donde está el pom.xml) mediante el comando: cd demorobotcolliseum
3. Ejecutar en la terminal la siguiente línea para levantar el servidor: java -jar .\target\demorobotcolliseum-0.0.1-SNAPSHOT.jar
4. Para cerrar servidor desde la terminal de visual pulsar ctrl+c

La url que debe ejecutar el ordenador a partir del cual no está ejecutando el servidor es la siguiente:
1. ip del servidor que aloja el servidor:8080
2. la url que debe ejecutar el ordenador que ejecuta el servidor es la siguiente: localhost:8080
   
## Como Rebuildear el .jar para nuevos cambios implementados
1. Localizarnos en demorobotcolliseum desde la carpeta API REST mediante: cd demorobotcolliseum
2. Rebuildear el .jar mediante el siguiente comando: ./mvnw clean package
3. Ejecutar el .jar mediante: java -jar .\target\demorobotcolliseum-0.0.1-SNAPSHOT.jar


