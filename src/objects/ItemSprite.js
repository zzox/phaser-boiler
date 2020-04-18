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
    this.x = x
    this.y = y
  }
}