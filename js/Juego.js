class Juego extends Phaser.Scene
{
    constructor() {
        super({ key: 'Juego' });
    }

    cursors;
    aKey;
    dKey;
    wKey;

    J1ShootKey;
    J2ShootKey;

    movingPlatform;
    platforms;

    //stars;
    j1;
    j2;
    bala;

    //#region JUGADOR 1

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 1
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ1(){
        //creacion de j1 en una pos
        this.j1 = this.physics.add.sprite(100, 450, 'j1');

        this.j1.setCollideWorldBounds(true);

        //Colliders J1
        this.physics.add.collider(this.j1, this.platforms);
        this.physics.add.collider(this.j1, this.movingPlatform);

        this.physics.add.overlap(this.j1, this.platforms, this.collectStar, null, this);
    }

    checkPlayer1Movement(){
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
    }

    //#endregion
    
    //#region JUGADOR 2

    ///////////////////////////////////////////////////////////////////////////////////////
    // JUGADOR 2
    ///////////////////////////////////////////////////////////////////////////////////////
    createJ2(){
        //creacion de J2 en una pos
        this.j2 = this.physics.add.sprite(700, 450, 'j2');

        this.j2.setCollideWorldBounds(true);

        //Colliders J2
        this.physics.add.collider(this.j2, this.platforms);
        this.physics.add.collider(this.j2, this.movingPlatform);

        this.physics.add.overlap(this.j2, this.platforms, this.collectStar, null, this);
    }

    checkPlayer2Movement(){
        const { left, right, up } = this.cursors;
        
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
    }
    //#endregion
    
    //#region Otros

    ///////////////////////////////////////////////////////////////////////////////////////
    // OTROS
    ///////////////////////////////////////////////////////////////////////////////////////
    createBalas()
    {
        this.bala.setCollideWorldBounds(false);
        
        //Colliders Bala
        this.physics.add.collider(this.bala, this.j1);
        this.physics.add.collider(this.bala, this.j2);

        this.bala.setImmovable(true);
        this.bala.allowGravity(false);
    }

    shootBala(xPos, yPos, xDir, yDir)
    {
        var velocity = 5;
        this.bala = this.physics.add.sprite(xPos, yPos, 'bala');
        this.bala.body.allowGravity = false;

        //this.bala.setVelocityX(velocity*Math.abs(Math.cos(xDir)));
        //this.bala.setVelocityY(velocity*Math.abs(Math.cos(yDir)));

        if(xDir != 0)
        {
            this.bala.setVelocity(xDir * velocity, yDir * velocity);
        }
        else
        {
            this.bala.setVelocity(160 * velocity, yDir * velocity);
        }

    }


    createAnimations(){ //Por hacer
        this.anims.create({
           key: 'left',
           frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
           frameRate: 10,
           repeat: -1
        });

        this.anims.create({
           key: 'turn',
           frames: [ { key: 'dude', frame: 4 } ],
           frameRate: 20
        });

        this.anims.create({
           key: 'right',
           frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
           frameRate: 10,
           repeat: -1
        });
    }

    createColectables(){ //por implementar
        this.stars = this.physics.add.group({
           key: 'star',
           repeat: 11,
           setXY: { x: 12, y: 0, stepX: 70 }
        });

        for (const star of this.stars.getChildren())
        {
           star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
    }

    instanceKeyboardKeys(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.J1ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.J2ShootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    //collectStar (j1, star)
    //{
    //    star.disableBody(true, true);
    //}
    //#endregion

    ///////////////////////////////////////////////////////////////////////////////////////
    // PRELOAD
    ///////////////////////////////////////////////////////////////////////////////////////
    preload ()
    {
        this.load.image('sky', 'assets/entorno/fondo.png');
        this.load.image('ground', 'assets/entorno/platform2.png');
        this.load.image('player', 'assets/jugador/j1.png'); // Ruta de tu imagen del jugador
        this.load.image('player2', 'assets/jugador/j2.png'); // Ruta de tu imagen del jugador
        //this.load.image('star', 'src/games/firstgame/assets/star.png');
        this.load.spritesheet('j1', 'assets/jugador/j1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('j2', 'assets/jugador/j2.png', { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('bala', 'assets/jugador/j2.png', { frameWidth: 5, frameHeight: 5 });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // CREATE
    ///////////////////////////////////////////////////////////////////////////////////////
    create ()
    {
        //para comprobar la ulsación de space
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.image(400, 300, 'sky');

        //creamos plataformas
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        

        // platforms.create(600, 400, 'ground');
        // platforms.create(50, 250, 'ground');
        // platforms.create(750, 220, 'ground');

        this.movingPlatform = this.physics.add.image(400, 400, 'ground');

        this.movingPlatform.setImmovable(true);
        this.movingPlatform.body.allowGravity = false;
        this.movingPlatform.setVelocityX(50);

        this.createJ1();
        this.createJ2();
        //Colliders entre los jugadores
        this.physics.add.collider(this.j1, this.j2);

        this.instanceKeyboardKeys();
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////
    // UPDATE
    ///////////////////////////////////////////////////////////////////////////////////////
    
    update ()
    {
     if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) //para comprobar que la pantalla de victoria funciona
            {
                this.scene.stop('Juego'); //carga la escena de intro
                this.scene.start('MenuVictoriaJ1'); //carga la escena 
            }
        //Movimiento personajes
        this.checkPlayer1Movement();
        this.checkPlayer2Movement();

        //Disparo
        if(Phaser.Input.Keyboard.JustDown(this.J1ShootKey))
        {
            this.shootBala(this.j1.x, this.j1.y, this.j1.body.velocity.x, this.j1.body.velocity.y)
        }
        if(Phaser.Input.Keyboard.JustDown(this.J2ShootKey))
        {
            this.shootBala(this.j2.x, this.j2.y, this.j2.body.velocity.x, this.j2.body.velocity.y)
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
    }

    
}