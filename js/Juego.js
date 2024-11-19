class Juego extends Phaser.Scene
{
    constructor() {
        super({ key: 'Juego' });
    }

    movingPlatform;
    //cursors;
    platforms;
    //stars;
    //player;

    preload ()
    {
        this.load.image('sky', 'assets/entorno/fondo.png');
        this.load.image('ground', 'assets/entorno/platform2.png');
        //this.load.image('star', 'src/games/firstgame/assets/star.png');
        //this.load.spritesheet('dude', 'src/games/firstgame/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create ()
    {
        this.add.image(400, 300, 'sky');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');

        this.movingPlatform = this.physics.add.image(400, 400, 'ground');

        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        //this.cursors = this.input.keyboard.createCursorKeys();
    }

    /**/
    update ()
    {
        if (this.movingPlatform.x >= 500)
        {
            this.movingPlatform.setVelocityX(-50);
        }
        else if (this.movingPlatform.x <= 300)
        {
            this.movingPlatform.setVelocityX(50);
        }

        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.pause('Juego')
            this.scene.launch('MenuPausa'); 
            this.scene.bringToTop('MenuPausa')
        }

    }

    //collectStar (player, star)
    //{
    //    star.disableBody(true, true);
    //}/**/
}