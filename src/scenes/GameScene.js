import { Scene } from 'phaser'
import State from '../GameState'

export default class GameScene extends Scene {
  constructor () {
    super({ key: 'GameScene' })
  }

  init ({ level }) {
    // TODO: move to only work with the elements and not the whole window.
    // these need to be destroyed
    window.addEventListener('blur', () => this.pauseScene)
    window.addEventListener('focus', () => this.resumeScene)

    const levelData = { ...window.gameLevels[level] }

    console.log('levelData', levelData)

    // make battlestate
    this.state = new State(levelData)
  }

  create () {
    this.cameras.main.setBackgroundColor('#0095e9')

    // add title up top
    // pools for environment objects
    // 
  }

  resumeScene () {
    this.scene.resume()
  }

  pauseScene () {
    this.scene.pause()
  }
}
