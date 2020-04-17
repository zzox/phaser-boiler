import { Scene } from 'phaser'

export default class GameScene extends Scene {
  constructor () {
    super({ key: 'GameScene' })
  }

  init () {
    // TODO: move to only work with the elements and not the whole window.
    // these need to be destroyed
    window.addEventListener('blur', () => this.pauseScene)
    window.addEventListener('focus', () => this.resumeScene)
  }

  create () {
    this.cameras.main.setBackgroundColor('#5a1991')
  }

  resumeScene () {
    this.scene.resume()
  }

  pauseScene () {
    this.scene.pause()
  }
}
