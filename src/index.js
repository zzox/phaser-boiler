import { Game, WEBGL } from 'phaser'
import BootScene from './scenes/BootScene'
import PreloadScene from './scenes/PreloadScene'
import ClickStart from './scenes/ClickStart'
import GameScene from './scenes/GameScene'

const config = {
  type: WEBGL,
  parent: 'content',
  width: 240,
  height: 135,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 }
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    ClickStart,
    GameScene
  ]
}

const game = new Game(config)
