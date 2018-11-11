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
let doorCheck = false;

let switchbutton;
let obstacleplatform;
let platformisup = false;
let fire;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg', '../../images/map/bg.jpg');
        this.load.image('ground', '../../images/map/ground.png');
        this.load.image('sao', '../../images/map/sao.png');
        this.load.image('short_path', '../../images/map/short_path.png');
        this.load.image('fire', '../../images/map/fire.png');
        this.load.image('long_path', '../../images/map/long_path.png');
        this.load.image('lamp_on', '../../images/map/lamp_on.png');
        this.load.image('lamp_off', '../../images/map/lamp_off.png');

        this.load.spritesheet('door', '../../images/door/door_complete.png', { frameWidth: 99, frameHeight: 124 });

        this.load.image('diamond', '../../images/items/diamond.png');
        this.load.image('diamond1', '../../images/items/diamond.png');
        this.load.image('diamond2', '../../images/items/diamond.png');
        

        this.load.image('fire', '../../images/map/fire.png');
        this.load.image('shadow', '../../images/map2_only/shadow.png');
        this.load.image('fog', '../../images/map2_only/fog.png');
        this.load.image('switch', '../../images/map2_only/switch.png');
        this.load.image('updown', '../../images/map2_only/updown.png');

        this.load.image('fog31', '../../images/map3_only/fog31.png');
        this.load.image('fog32', '../../images/map3_only/fog32.png');
        this.load.image('obstacle', '../../images/map3_only/obstacle.png');
        this.load.image('top', '../../images/map3_only/top.png');
        this.load.image('switch_uo_down', '../../images/map3_only/switch_uo_down.png');
        this.load.image('shadow31', '../../images/map3_only/shadow31.png');
        this.load.image('shadow32', '../../images/map3_only/shadow32.png');

        this.load.spritesheet('yang', '../../images/yang/walk1.png', { frameWidth: 78, frameHeight: 84 }); //white
        this.load.spritesheet('ying', '../../images/ying/walk.png', { frameWidth: 80, frameHeight: 107 }); //black
        
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

        platforms.create(200, 300, 'short_path');
        platforms.create(250, 360, 'sao');
        platforms.create(30, 390, 'short_path');
        platforms.create(30, 170, 'short_path');
        
        platforms.create(250, 20, 'obstacle');
        platforms.create(250, 10, 'top');  
        
        platforms.create(500, 420, 'long_path');
        platforms.create(590, 420, 'long_path');
        platforms.create(700, 420, 'long_path');

        platforms.create(600, 320, 'long_path');
        platforms.create(500, 120, 'long_path');
        platforms.create(700, 220, 'long_path');

        //platforms.create(700, 250, 'long_path');

        door = this.add.sprite(750, 150, 'door');

        player1 = this.physics.add.image(50, 500, 'yang').setScale(0.5); //white
        player2 = this.physics.add.image(750, 400, 'ying').setScale(0.5); //black

        player1.setBounce(0.2);
        player1.setCollideWorldBounds(true);

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);


        player1.setBounce(0.2);
        player1.setCollideWorldBounds(true);

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);

        this.physics.add.collider(player1, platforms);
        this.physics.add.collider(player2, platforms);

        //สวิตช์กับแพลตฟอร์ม
        switchbutton = this.physics.add.staticImage(600, 540, 'switch');
        obstacleplatform = this.physics.add.staticGroup({
            key: 'obstacle',
            repeat: 0,
            setXY: { x: 250, y: 20 }

        });

        this.physics.add.collider(player1, obstacleplatform);
        this.physics.add.collider(player2, obstacleplatform);

        cursors = this.input.keyboard.createCursorKeys();

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        diamond1 = this.physics.add.group();
        this.physics.add.collider(diamond1, platforms);
        this.physics.add.collider(player1, diamond1);

        //diamond1
        diamond1 = this.physics.add.group({
            key: 'diamond1',
            repeat: 1,
            setXY: { x: 12, y: 250, stepX: 500, stepY: 250 }

        });

        diamond1.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        });

        this.physics.add.collider(diamond1, platforms);
        this.physics.add.overlap(player1, diamond1, this.collectDiamond);
        this.physics.add.overlap(player1, player2, this.nextLevel);

        //diamond2
        diamond2 = this.physics.add.group();
        this.physics.add.collider(diamond2, platforms);
        this.physics.add.collider(player2, diamond1);

        diamond2 = this.physics.add.group({
            key: 'diamond2',
            repeat: 1,
            setXY: { x: 700, y: 500, stepX: 0 }

        });

        diamond2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
            child.disableBody(true, true)
        });


        this.physics.add.collider(diamond2, platforms);
        this.physics.add.overlap(player1, diamond2, this.collectDiamond);


        //door anime
        this.anims.create({
            key: 'doors',
            frames: this.anims.generateFrameNumbers('door', { start: 0, end: 4 }),
            frameRate: 10
        });

        //anime yang
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('yang', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        /* this.anims.create({
            key: 'turn',
            frames: [{ key: 'beaver', frame: 4 }],
            frameRate: 20
        }); */ 

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('yang', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        //anime ying
        this.anims.create({
            key: 'keyA',
            frames: this.anims.generateFrameNumbers('ying', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        /* this.anims.create({
            key: 'turn',
            frames: [{ key: 'beaver', frame: 4 }],
            frameRate: 20
        }); */

        this.anims.create({
             key: 'keyD',
             frames: this.anims.generateFrameNumbers('ying', { start: 0, end: 2 }),
             frameRate: 10,
             repeat: -1
         });

    }

    update() {
        if (cursors.left.isDown) {
            player1.setVelocityX(-160);
            //player1.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player1.setVelocityX(160);
            //player1.anims.play('right', true);

        } else {
            player1.setVelocityX(0);

        }
        if (cursors.up.isDown && player1.body.onFloor()) {
            player1.setVelocityY(-330);
        }


        //control ying
        if (this.keyA.isDown) {
            player2.setVelocityX(-160);
            //player2.anims.play('keyA', true);

        } else if (this.keyD.isDown) {
            player2.setVelocityX(160);
            //player2.anims.play('keyD', true);

        } else {
            player2.setVelocityX(0);
        }
        if (this.keyW.isDown && player2.body.onFloor()) {
            player2.setVelocityY(-330);
        }
        if (doorCheck === true) {
            this.scene.start('Game_lv3');
        }

        if (gameover == true) {
            this.physics.pause();
        }

        //100, 400
        if(platformisup == true){
            if(obstacleplatform.y <= 200){
                obstaclelatform.y = 200;
            } else {
                obstacleplatform.y--;
            }
        } else {
            if(obstacleplatform.y >= 400){
                obstacleplatform.y = 400;
            } else {
                obstacleplatform.y++;
            }
        }
        

        //ยังหาค่า y ของ updownplatform ไม่เจอ น่าจะต้องแก้ตัว updownplatform เป็น Object ชนิดอื่น
        //เอาคอมเม้นต์ออกจะเห็นว่าเป็น NaN คือไม่มีค่านั่นแหละ
        //console.log("updownplatform.y = " + updownplatform.y);
    }
    collectDiamond(player1, diamondtmep) {
        diamondtmep.disableBody(true, true);
        //diamond2.disableBody(true, true);

        if (diamond1.countActive(true) === 0) {
            door.anims.play('doors', true);
            this.nextLevel;
        }
    }
    nextLevel(player1, player2, door) {
        if (diamond1.countActive(true) === 0) {
            doorCheck = true;
        }
    }
    hitFire(player, fire) {
        //เช็กกะดาวโย่ว
        console.log("Oh yeahhhhhh");
        gameover = true;
    }
    upPlatform(player, switchbutton){
        //เช็กได้ละว่าปุ่มถูกเหยียบ
        console.log("platformisup = " + platformisup);
        platformisup = true;
        console.log("platformisup = " + platformisup);
    }
}


export default GameScene;