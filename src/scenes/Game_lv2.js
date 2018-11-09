class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'Game_lv2'
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

        this.load.image('diamond','../../images/items/diamond.png');

        this.load.spritesheet('yang','../../images/yang/ya1.png',{ frameWidth: 800, frameHeight: 600 } );

    
    }

    create() {
        
    }

    update() {

    }
}

export default GameScene;