import { Scene } from 'phaser'

class ClickStart extends Scene {
  constructor () {
    super({ key: 'ClickStart' })
  }

  create () {
    this.add.bitmapText(80, 80, 'font', 'Click screen to enable sound and input', 8)

    this.start = false

    this.cameras.main.setBackgroundColor('#151515')
  }

  update () {
    if (this.start) {
      return
    }

    if (this.input.activePointer.isDown) {
      this.start = true
      this.scene.start('GameScene')
    }
  }
}

export default ClickStart
