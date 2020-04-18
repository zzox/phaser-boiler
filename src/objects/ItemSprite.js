import { GameObjects } from 'phaser'

export default class ItemSprite extends GameObjects.Sprite {
  constructor ({ scene, x, y, type, anim, canShock }) {
    super(scene, x, y)
    scene.add.existing(this)

    if (canShock) {
      this.shocker = this.scene.add.sprite(x, y)
    }
    console.log(anim)
    console.log(this.x, this.y)
    this.anims.play(anim)
  }

  moveTo (x, y) {
    // TODO: tween
    if (this.x !== x) {
      this.scene.tweens.add({
        targets: this,
        x: { from: this.x, to: x },
        ease: 'Power1',
        duration: 166,
        repeat: 0
      })
    }

    if (this.y !== y) {
      this.scene.tweens.add({
        targets: this,
        y: { from: this.y, to: y },
        ease: 'Power1',
        duration: 166,
        repeat: 0
      })
    }
  }
}