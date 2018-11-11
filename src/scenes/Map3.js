let x, y, width, height;
let cursors;
let playimage1, playimage2, playimage3;
 
class Map3 extends Phaser.Scene { 
    constructor(test) { 
        super({ key: 'Map3' }); 
        } 
    preload() { 
        this.load.image('bg', '../../images/level/lv3.png');
        this.load.image('lv1', '../../images/button/lv1_button.png'); 
        this.load.image('lv2', '../../images/button/lv2_button.png'); 
        this.load.image('lv3', '../../images/button/lv3_button.png'); 
        } 
    create() { 
        width = this.scene.scene.physics.world.bounds.width; 
        height = this.scene.scene.physics.world.bounds.height; 
        x = width * 0.5; 
        y = height * 0.5;
        this.add.image (x, y, 'bg');
        cursors = this.input.keyboard.createCursorKeys();
        playimage1 = this.add.image (325, 70, 'lv1').setScale(1.5);
        playimage1.setInteractive(); 
        playimage1.on ('pointerup', () => { 
            this.scene.start ('GameScene'); 
        });
        playimage2 = this.add.image (395, 70, 'lv2').setScale(1.5);
        playimage2.setInteractive(); 
        playimage2.on ('pointerup', () => { 
            this.scene.start ('Game_lv2'); 
        });
        playimage3 = this.add.image (465, 70, 'lv3').setScale(1.5);
        playimage3.setInteractive(); 
        playimage3.on ('pointerup', () => { 
            this.scene.start ('Game_lv3'); 
        });
        } 
    update() { 
        
        
    } 
} 

export default Map3;