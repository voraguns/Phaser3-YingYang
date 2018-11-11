//import { width } from "window-size";
let x;
let y;
let width;
let height;
let platforms;
let player;
let gameover = false;
let cursors;
let playimage1, playimage2, playimage3, playimage4, playimage5, playimage6;

//import pic from '../../images/map';
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','../../images/map/bg.jpg');
        this.load.image('ground','../../images/map/ground.png');
        this.load.image('sao','../../images/map/sao.png');
        this.load.image('shot path','../../images/map/short_path.png');
        this.load.image('fire','../../images/map/fire.png');
        this.load.image('long_path','../../images/map/long_path.png');
        this.load.image('lamp_on','../../images/map/lamp_on.png');
        this.load.image('lamp_off','../../images/map/lamp_off.png');

        this.load.spritesheet('yang','../../images/yang/ya1.png',{ frameWidth: 800, frameHeight: 600 } );

        this.load.image('setting', '../../images/button/setting.png');
        this.load.image('setting_point', '../../images/button/setting_point.png');
        this.load.image('setting_page', '../../images/button/setting_page.png');
        this.load.image('menu', '../../images/button/menu.png');
        this.load.image('resume', '../../images/button/resume.png');
        this.load.image('sound_on', '../../images/button/sound_on.png');
        this.load.image('sound_off', '../../images/button/sound_off.png');
        

        
    }

    create() {
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, 'bg');
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, 'bg');

        platforms = this.physics.add.staticGroup();

        //platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        
        platforms.create(10, 250, 'ground');
        platforms.create(400, 250, 'ground');

        player = this.physics.add.image(50, 400, 'yang').setScale(0.5);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();

        playimage1 = this.add.image(770, 30, 'setting');
        playimage1.setInteractive();
        playimage1.input.useHandCursor = true;
        playimage1.on ('pointerup', () => { 
            playimage2 = this.add.image(x, y, 'setting_page');
            playimage2.setInteractive();

            playimage3 = this.add.image(380,210, 'sound_on');
            playimage3.setInteractive();

            playimage4 = this.add.image(380,270, 'sound_off');
            playimage4.setInteractive();

            playimage5 = this.add.image(380,350, 'resume');
            playimage5.setInteractive();
            playimage5.on ('pointerup', () => {
                this.input.on('gameobjectup',clickHandler, this);
            });

            playimage6 = this.add.image(380,410, 'menu');
        });
        
        
        
        
    }

    update() {
        if (cursors.left.isDown){
        player.setVelocityX(-160);

        // player.anims.play('left', true);
    }
        else if (cursors.right.isDown){
        player.setVelocityX(160);

        // player.anims.play('right', true);
    }
        else{
        player.setVelocityX(0);

        // player.anims.play('turn');
    }

        if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330);
    }

    
  }
}

function hitFire(player, fire) {
    player.setTint(0xff0000);
    player.anims.play('turn');

    gameover = true;
}

function clickHandler () {
    playimage2.setVisible(false);
    playimage3.setVisible(false);
    playimage4.setVisible(false);
    playimage5.setVisible(false);
    playimage6.setVisible(false);
}

export default GameScene;
