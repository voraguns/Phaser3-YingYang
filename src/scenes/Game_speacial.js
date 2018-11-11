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
let dark_diamond1;
let dark_diamond2;
let doorCheck = false;

let switchbutton;
let obstacleplatform;
let platformisup = false;
let fire;

let playimage1, playimage2, playimage3, playimage4, playimage5, playimage6;

let bgaudio;
let jump;
let collect;
let die;
let open;

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

        this.load.image('diamond', '../../images/items/dark_diamond.png');
        this.load.image('dark_diamond1', '../../images/items/dark_diamond.png');
        this.load.image('dark_diamond2', '../../images/items/dark_diamond.png');      

        this.load.image('fire', '../../images/map/fire.png');
        this.load.image('shadow', '../../images/map2_only/shadow.png');
        this.load.image('fog', '../../images/map2_only/fog.png');
        this.load.image('switch', '../../images/map2_only/switch.png');
        this.load.image('updown', '../../images/map2_only/updown.png');

        this.load.image('fog31', '../../images/map3_only/fog31.png');
        this.load.image('fog32', '../../images/map3_only/fog32.png');
        this.load.image('obstacle', '../../images/map3_only/obstacle.png');
        this.load.image('short_obstacle', '../../images/map3_only/short_obstacle.png');
        this.load.image('short_obstacle2', '../../images/map3_only/short_obstacle2.png');
        this.load.image('top', '../../images/map3_only/top.png');
        this.load.image('switch_uo_down', '../../images/map3_only/switch_uo_down.png');
        this.load.image('shadow31', '../../images/map3_only/shadow31.png');
        this.load.image('shadow32', '../../images/map3_only/shadow32.png');

        this.load.spritesheet('yang', '../../images/yang/walk1.png', { frameWidth: 78, frameHeight: 84 }); //white
        this.load.spritesheet('ying', '../../images/ying/walk.png', { frameWidth: 80, frameHeight: 84 }); //black

        this.load.image('setting', '../../images/button/setting.png');
        this.load.image('setting_point', '../../images/button/setting_point.png');
        this.load.image('setting_page', '../../images/button/setting_page.png');
        this.load.image('menu', '../../images/button/menu.png');
        this.load.image('resume', '../../images/button/resume.png');
        this.load.image('sound_on', '../../images/button/sound_on.png');
        this.load.image('sound_off', '../../images/button/sound_off.png');
        
        this.load.audio('bgaudio','../../sound/bg_music.mp3');
        this.load.audio('jump','../../sound/jump.mp3');
        this.load.audio('collect','../../sound/collect.mp3');
        this.load.audio('die','../../sound/die.mp3');
        this.load.audio('open','../../sound/open.mp3');
    }

    create() {
        //ใส่เสียง
        bgaudio = this.sound.add( 'bgaudio',  true);
        bgaudio.play({ loop: true });
        bgaudio.volume = -0.5;

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

        door = this.add.sprite(x, 340, 'door');
        platforms.create(x, 400, 'long_path');
        platforms.create(300, 310, 'short_obstacle'); 
        platforms.create(500, 310, 'short_obstacle');
        platforms.create(300, 200, 'short_obstacle');
        platforms.create(500, 200, 'short_obstacle');
        platforms.create(x, 50, 'short_path');
1
        platforms.create(300, 280, 'short_path');
        platforms.create(500, 280, 'short_path');

        platforms.create(50, 400, 'short_path');
        platforms.create(50, 300, 'short_path');
        platforms.create(50, 200, 'short_path');

        platforms.create(750, 400, 'short_path');
        platforms.create(750, 300, 'short_path');
        platforms.create(750, 200, 'short_path');

        //ตำแหน่งตัวละคร
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

        //ปุ่มควบคุมตัวละคร
        cursors = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //ปุ่ม option ในด่าน
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
        
        //diamond1
        diamond1 = this.physics.add.group();
        this.physics.add.collider(diamond1, platforms);
        this.physics.add.collider(player1, diamond1);

        diamond1 = this.physics.add.group({
            key: 'diamond1',
            repeat: 1,
            setXY: { x: 780, y: 100, stepX: -620, stepY: 400 }

        });

        diamond1.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        });

        this.physics.add.collider(diamond1, platforms);
        this.physics.add.overlap(player1, diamond1, this.collectDiamond1);

        //diamond2
        diamond2 = this.physics.add.group();
        this.physics.add.collider(diamond2, platforms);
        this.physics.add.collider(player2, diamond1);

        diamond2 = this.physics.add.group({
            key: 'diamond2',
            repeat: 1,
            setXY: { x: 100, y: 500, stepX: 100 }

        });

        diamond2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
            child.disableBody(true, true)
        });

        this.physics.add.collider(diamond2, platforms);
        this.physics.add.overlap(player1, diamond2, this.collectDiamond1);

        //dark diamond
        dark_diamond1 = this.physics.add.group();
        this.physics.add.collider(dark_diamond1, platforms);
        this.physics.add.collider(player1, dark_diamond1);

        //dark diamond1
        dark_diamond1 = this.physics.add.group({
            key: 'dark_diamond1',
            repeat: 1,
            setXY: { x: 12, y: 100, stepX: 600, stepY: 400 }

        });

        dark_diamond1.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
        });

        this.physics.add.collider(dark_diamond1, platforms);
        this.physics.add.overlap(player2, dark_diamond1, this.collectDiamond2);
        this.physics.add.overlap(player1, player2, this.winner);

        //dark diamond2
        dark_diamond2 = this.physics.add.group();
        this.physics.add.collider(dark_diamond2, platforms);
        this.physics.add.collider(player2, dark_diamond1);

        dark_diamond2 = this.physics.add.group({
            key: 'dark_diamond2',
            repeat: 1,
            setXY: { x: 700, y: 500, stepX: 0 }

        });

        dark_diamond2.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
            child.disableBody(true, true)
        });

        this.physics.add.collider(dark_diamond2, platforms);
        this.physics.add.overlap(player2, dark_diamond1, this.collectDiamond2);
        //this.physics.add.overlap(player1, player2, this.winner);
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

    }
}
function clickHandler () {
    playimage2.setVisible(false);
    playimage3.setVisible(false);
    playimage4.setVisible(false);
    playimage5.setVisible(false);
    playimage6.setVisible(false);
}
function collectDiamond(player1, diamondtmep) {
    diamondtmep.disableBody(true, true);

    if (diamond1.countActive(true) === 0) {
        door.anims.play('doors', true);
    }
}
function collectDiamond2(player2, diamondtmep2) {
    diamondtmep2.disableBody(true, true);

    if (dark_diamond1.countActive(true) === 0) {
        door.anims.play('doors', true);
    }
}
function winner(player1, player2, door) {
    if (diamond1.countActive(true) === 0) {
        doorCheck = true;
    }
    if (dark_diamond1.countActive(true) === 0) {
        doorCheck = true;
    }
}

export default GameScene;