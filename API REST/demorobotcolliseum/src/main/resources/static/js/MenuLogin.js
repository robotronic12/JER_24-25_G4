class MenuLogin extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuLogin' });
    }

    preload() {
        //Cargo el html
        this.load.html('registro', 'assets/text/login.html');
    }

    create() {     
        //aoushdiaujksdjiouasohujdi
        const text = this.add.text(10, 10, 'Registrate para jugar', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        //Añado el html
        const element = this.add.dom(200, 300).createFromCache('registro');
        element.addListener('click');
        element.on('click', function (event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');
    
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    this.removeListener('click');
                    element.setVisible(false);
                    
                    //Aqui irian las peticiones ajax y to eso CREO
                    
                    
                    text.setText(`Bienvenido ${inputUsername.value}`);
                    
                    //Tiempo para transicionar a la siguiente escena de 3 segundos
                    this.scene.time.delayedCall(3000, () => {
                        this.scene.stop('MenuLogin'); 
                        this.scene.start('MenuInicio'); 
                    }, [], this);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
            
        });

    }
    update() {

    } 

}