import { Scene } from 'phaser'
import State from '../GameState'
import ItemSprite from '../objects/ItemSprite'

export default class GameScene extends Scene {
  constructor () {
    super({ key: 'GameScene' })
  }

  init ({ level }) {
    // TODO: move to only work with the elements and not the whole window.
    // these need to be destroyed
    window.addEventListener('blur', () => this.pauseScene)
    window.addEventListener('focus', () => this.resumeScene)

    this.levelData = { ...window.gameLevels[level] }
    this.items = []

    console.log('levelData', this.levelData)
  }

  create () {

    // make battlestate
    this.state = new State(this.levelData, this)

    this.cameras.main.setBackgroundColor('#0095e9')
    // add keys

    // add title up top
    // pools for environment objects
    // 
  }

  createSprite (rest) {
    this.items.push(new ItemSprite({ scene: this, ...rest }))
  }

  resumeScene () {
    this.scene.resume()
  }

  pauseScene () {
    this.scene.pause()
  }
}
