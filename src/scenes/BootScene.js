import { Scene } from 'phaser'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('zzoxLogo', 'src/assets/images/zzoxLogo.png')
  }

  create () {
    this.scene.start('PreloadScene')
  }
}
