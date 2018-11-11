let x, y, width, height;
let cursors;
let playimage1;
 
class Map1 extends Phaser.Scene { 
    constructor(test) { 
        super({ key: 'Map1' }); 
        } 
    preload() { 
        this.load.image('bg', '../../images/level/lv1.png');
        this.load.image('lv1', '../../images/button/lv1_button.png'); 
        } 
    create() { 
        width = this.scene.scene.physics.world.bounds.width; 
        height = this.scene.scene.physics.world.bounds.height; 
        x = width * 0.5; 
        y = height * 0.5;
        this.add.image (x, y, 'bg');
        cursors = this.input.keyboard.createCursorKeys();
        playimage1 = this.add.image (x, 70, 'lv1').setScale(2);
        playimage1.setInteractive(); 
        playimage1.on ('pointerup', () => { 
            this.scene.start ('GameScene'); 
        });
        } 
    update() { 
        
        
    } 
} 

export default Map1;