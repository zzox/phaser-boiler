import { Scene } from 'phaser'

export default class PreloadScene extends Scene {
  constructor () {
    super({ key: 'PreloadScene' })
  }

  preload () {
    this.resize()

    this.cameras.main.setBackgroundColor('#151515')
    this.add.image(160, 80, 'zzoxLogo')

    this.progressBox = this.add.graphics()
    this.progressBox.fillStyle(0x7b7b7b).fillRect(135, 90, 50, 1)
    this.progressBar = this.add.graphics()

    this.load.on('progress', (val) => {
      this.progressBar.clear().fillStyle(0xffffff).fillRect(135, 90, 50 * val, 1)
    })

    this.load.bitmapFont('font', 'src/assets/fonts/miniset.png', 'src/assets/fonts/miniset.fnt')

    this.animsArray = []
  }

  create () {
    const animations = this.cache.json.get('animations')
    console.log(animations)
    this.createAnimations(animations)

    window.addEventListener('resize', () => {
      this.resize()
    })

    setTimeout(() => {
      // ATTN: if deploying on itch.io, skip the ClickStart scene, already taken care of.
      this.progressBar.destroy()
      this.progressBox.destroy()
      this.scene.start('ClickStart')
    }, 3000)
  }

  createAnimations (animations) {
    this.animsArray.map(item => {
      let items
      const alias = animations[item].alias

      if (alias) {
        items = animations[alias].anims
      } else {
        items = animations[item].anims
      }

      items.map(anim => {
        this.anims.create({
          key: `${item}-${anim.key}`,
          //                                sheet vvv
          frames: this.anims.generateFrameNumbers(item, anim.frames),
          frameRate: anim.frameRate ? anim.frameRate : 1,
          repeat: anim.repeat || anim.repeat === 0 ? anim.repeat : -1,
          repeatDelay: anim.repeatDelay ? anim.repeatDelay : 0
        })
      })
    })
  }

  // method needed for pausing when moving away from screen

  resize () {
    // TODO: setScale instead of scaling canvas, for safari.
    const maxMulti = 100
    const w = 320
    const h = 180
    const availW = window.innerWidth
    const availH = window.innerHeight
    // - 20 for padding
    const maxW = Math.floor(availW / w)
    const maxH = Math.floor(availH / h)
    let multi = maxW < maxH ? maxW : maxH

    if (multi > maxMulti) multi = maxMulti

    const canvas = document.getElementsByTagName('canvas')[0]
    canvas.style.width = `${multi * w}px`
    canvas.style.height = `${multi * h}px`
  }
}
