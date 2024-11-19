class Juego extends Phaser.Scene
{
    constructor() {
        super({ key: 'Juego' });
    }

    cursors;
    aKey;
    dKey
    wKey

    movingPlatform;
    platforms;
    stars;
    j1;
    j2;

    preload ()
    {
        this.load.image('sky', 'assets/entorno/fondo.png');
        this.load.image('ground', 'assets/entorno/platform2.png');
        //this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('j1', 'assets/jugador/j1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('j2', 'assets/jugador/j2.png', { frameWidth: 48, frameHeight: 48 });
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


        this.j1 = this.physics.add.sprite(100, 450, 'j1');
        this.j2 = this.physics.add.sprite(400, 450, 'j2');

        this.j1.setCollideWorldBounds(true);
        this.j2.setCollideWorldBounds(true);
//
        //this.anims.create({
        //    key: 'left',
        //    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
//
        //this.anims.create({
        //    key: 'turn',
        //    frames: [ { key: 'dude', frame: 4 } ],
        //    frameRate: 20
        //});
//
        //this.anims.create({
        //    key: 'right',
        //    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //    frameRate: 10,
        //    repeat: -1
        //});
//
        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        //this.stars = this.physics.add.group({
        //    key: 'star',
        //    repeat: 11,
        //    setXY: { x: 12, y: 0, stepX: 70 }
        //});

        //for (const star of this.stars.getChildren())
        //{
        //    star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        //}

        //Colliders J1
        this.physics.add.collider(this.j1, this.platforms);
        this.physics.add.collider(this.j1, this.movingPlatform);

        //Coliders J2
        this.physics.add.collider(this.j2, this.platforms);
        this.physics.add.collider(this.j2, this.movingPlatform);

        //Colliders entre los jugadores
        this.physics.add.collider(this.j1, this.j2);

        this.physics.add.overlap(this.j1, this.platforms, this.collectStar, null, this);
        this.physics.add.overlap(this.j2, this.platforms, this.collectStar, null, this);
    }
    
    update ()
    {
        //Movimiento personajes
        const { left, right, up } = this.cursors;
        const { aKey, dKey, wKey } = this;
        
        //J1
        if (aKey.isDown)
        {
            this.j1.setVelocityX(-160);

            this.j1.anims.play('left', true);
        }
        else if (dKey.isDown)
        {
            this.j1.setVelocityX(160);

            this.j1.anims.play('right', true);
        }
        else
        {
            this.j1.setVelocityX(0);
    
            this.j1.anims.play('turn');
        }
        if (wKey.isDown && this.j1.body.touching.down)
        {
            this.j1.setVelocityY(-330);
        }

        //J2
        if (left.isDown)
        {
            this.j2.setVelocityX(-160);

            this.j2.anims.play('left', true);
        }
        else if (right.isDown)
        {
            this.j2.setVelocityX(160);

            this.j2.anims.play('right', true);
        }
        else
        {
            this.j2.setVelocityX(0);

            this.j2.anims.play('turn');
        }
        if (up.isDown && this.j2.body.touching.down)
        {
            this.j2.setVelocityY(-330);
        }

        //Plataformas
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

    //collectStar (j1, star)
    //{
    //    star.disableBody(true, true);
    //}
}