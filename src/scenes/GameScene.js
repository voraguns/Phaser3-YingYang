//import { width } from "window-size";
let x;
let y;
let width;
let height;
let platforms;
let player;
let gameover = false;
let cursors;

let door;

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
        this.load.image('short_path','../../images/map/short_path.png');
        this.load.image('fire','../../images/map/fire.png');
        this.load.image('long_path','../../images/map/long_path.png');
        this.load.image('lamp_on','../../images/map/lamp_on.png');
        this.load.image('lamp_off','../../images/map/lamp_off.png');

        this.load.image('door_close','../../images/door/door_close.png');

        this.load.spritesheet('yang','../../images/yang/ya1.png',{ frameWidth: 800, frameHeight: 600 } );

        
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

        platforms.create(10, 570, 'ground');
        platforms.create(400, 570, 'ground');

        platforms.create(x, 385, 'sao');
        platforms.create(x, 225, 'long_path');
        
        platforms.create(100, y, 'long_path');
        platforms.create(685, y, 'long_path');

        platforms.create(290, 425, 'short_path');
        platforms.create(510, 425, 'short_path');

        door = this.add.image(x, 155, 'door_close');

        player = this.physics.add.image(100, 400, 'yang').setScale(0.5);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();


        
    }

    update() {
        if (cursors.left.isDown){
        player.setVelocityX(-160);

        // player.anims.play('left', true);
    } else if (cursors.right.isDown){
        player.setVelocityX(160);

        // player.anims.play('right', true);
    } else{
        player.setVelocityX(0);

        // player.anims.play('turn');
    }

        if (cursors.up.isDown && player.body.onFloor()){
        player.setVelocityY(-330);
    }


  }
}

export default GameScene;
