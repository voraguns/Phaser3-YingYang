let x, y, width, height;
let cursors;
let playimage1, playimage2;
 
class Map2 extends Phaser.Scene { 
    constructor(test) { 
        super({ key: 'Map2' }); 
        } 
    preload() { 
        this.load.image('bg', '../../images/level/lv2.png');
        this.load.image('lv1', '../../images/button/lv1_button.png'); 
        this.load.image('lv2', '../../images/button/lv2_button.png'); 
        } 
    create() { 
        width = this.scene.scene.physics.world.bounds.width; 
        height = this.scene.scene.physics.world.bounds.height; 
        x = width * 0.5; 
        y = height * 0.5;
        this.add.image (x, y, 'bg');
        cursors = this.input.keyboard.createCursorKeys();
        playimage1 = this.add.image (340, 70, 'lv1').setScale(2);
        playimage1.setInteractive(); 
        playimage1.on ('pointerup', () => { 
            this.scene.start ('GameScene'); 
        });
        playimage2 = this.add.image (450, 70, 'lv2').setScale(2);
        playimage2.setInteractive(); 
        playimage2.on ('pointerup', () => { 
            this.scene.start ('Game_lv2'); 
        });
        } 
    update() { 
        
        
    } 
} 

export default Map2;