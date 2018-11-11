import 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
import Game_lv2 from './scenes/Game_lv2';
import Game_lv3 from './scenes/Game_lv3';
import Game_speacial from './scenes/Game_speacial';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
      //MainMenu,
      //GameScene,
      //Game_lv2,
      //Game_lv3,
      Game_speacial
    ]
};

const game = new Phaser.Game(config);