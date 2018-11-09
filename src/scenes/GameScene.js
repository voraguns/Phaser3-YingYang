//import { width } from "window-size";
let x;
let y;
let width;
let height;
let platforms;
let player;
let gameover = false;
let cursors;

let player1;
let player2;

let door;
let diamond1;
let diamond2;

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

        this.load.image('diamond1','../../images/items/diamond.png');
        this.load.image('diamond2','../../images/items/diamond.png');

        this.load.spritesheet('yang','../../images/yang/ya1.png',{ frameWidth: 800, frameHeight: 600 } );
        this.load.spritesheet('ying','../../images/ying/yi1.png',{ frameWidth: 800, frameHeight: 600 } );

        
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

        

        player1 = this.physics.add.image(50, 400, 'yang').setScale(0.5);
        player2 = this.physics.add.image(750, 400, 'ying').setScale(0.5);

        player1.setBounce(0.2);
        player1.setCollideWorldBounds(true);
        
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);



        this.physics.add.collider(player1, platforms);
        this.physics.add.collider(player2, platforms);

        cursors = this.input.keyboard.createCursorKeys();

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.physics.add.collider(diamond1, platforms);

        this.physics.add.overlap(player1, diamond1, collectDiamond);

        diamond1 = this.physics.add.group();
        this.physics.add.collider(diamond1, platforms);
        this.physics.add.collider(player1, diamond1);
        
        diamond1 = this.physics.add.group({
            key: 'diamond1',
        });
    }

    update() {
        if (cursors.left.isDown){
        player1.setVelocityX(-160);

        // player.anims.play('left', true);
    } else if (cursors.right.isDown){
        player1.setVelocityX(160);

        // player.anims.play('right', true);
    } else{
        player1.setVelocityX(0);

        // player.anims.play('turn');
    }

        if (cursors.up.isDown && player1.body.onFloor()){
        player1.setVelocityY(-330);
    }


    //control ying
    if (this.keyA.isDown) {
        player2.setVelocityX(-160);
    } else if (this.keyD.isDown){
        player2.setVelocityX(160);
    } else{
        player2.setVelocityX(0);

        // player.anims.play('turn');
    }
        if (this.keyW.isDown && player2.body.onFloor()){
        player2.setVelocityY(-330);
    }
  }
}

    function collectDiamond(player1, diamond) {
    diamond.disableBody(true, true);
  } 


export default GameScene;
