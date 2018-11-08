let playtext, cursors; 
let x, y, width, height; 
 
class MainMenu extends Phaser.Scene { 
    constructor(test) { 
        super({ key: 'MainMenu' }); 
        } 
    preload() { 
        this.load.image('bg', '../../images/map/bg.jpg'); 
        this.load.image('start botton', '../../images/botton/start botton.png'); 
 
        } 
    create() { 
        width = this.scene.scene.physics.world.bounds.width; 
        height = this.scene.scene.physics.world.bounds.height; 
        x = width * 0.5; 
        y = height * 0.5; 
        cursors = this.input.keyboard.createCursorKeys(); 
        this.add.image (x,y,'start botton'); 
        playimage.setInteractive(); 
        playimage.on ('pointerup', () => { 
            this.scene.start ('GameScene'); 
        }); 
        } 
    update() { 
        if (cursors.space.isDown) { 
            this.scene.start('GameScene'); 
        } 
    } 
} 
export default MainMenu;