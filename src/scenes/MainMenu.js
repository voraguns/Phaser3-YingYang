let playimage1, playimage2, playimage3, cursors; 
let x, y, width, height; 
 
class MainMenu extends Phaser.Scene { 
    constructor(test) { 
        super({ key: 'MainMenu' }); 
        } 
    preload() { 
        this.load.image('Bg', '../../images/map/Bg.png'); 
        this.load.image('start_button', '../../images/button/start_button.png');
        this.load.image('howto_button', '../../images/button/howto_button.png');
        this.load.image('howto', '../../images/map/howto.png');
 
        } 
    create() { 
        width = this.scene.scene.physics.world.bounds.width; 
        height = this.scene.scene.physics.world.bounds.height; 
        x = width * 0.5; 
        y = height * 0.5;
        this.add.image (x, y, 'Bg');
        cursors = this.input.keyboard.createCursorKeys(); 
        playimage1 = this.add.image (590, 170,'start_button'); 
        playimage1.setInteractive(); 
        playimage1.on ('pointerup', () => { 
            this.scene.start ('GameScene'); 
        });
        playimage2 = this.add.image (400, 90,'howto_button').setScale(0.5);
        playimage2.setInteractive(); 
        playimage2.on ('pointerup', () => {
            playimage3 = this.add.image (x, y, 'howto');
            playimage3.setInteractive();
            playimage3.on ('pointerup', () => {
                this.input.on('gameobjectup',clickHandler, this); 
            });
        });
        } 
    update() { 
        if (cursors.space.isDown) { 
            this.scene.start('GameScene'); 
        } 
    } 
} 

function clickHandler () {
    playimage3.input.enabled = false;
    playimage3.setVisible(false);
}

export default MainMenu;