const GAME_HEIGHT = 8
const GAME_WIDTH = 15
const TOP_OFFSET = 7
const GRID_ITEM_SIZE = 16
const GRID_ITEM_OFFSET = 8

export default class GameState {
  constructor ({ items, tries }, scene) {
    this.scene = scene

    // make grid
    this.gridItems = []
    this.characters = []
    this.pipes = []
    this.env = []
    this.player = null
    this.tries = tries
    this.moves = 0
    this.createGrid()
    console.log(this.gridItems)
    this.createChars(items)
  }

  move () {
    // move char, increment if possible
      // move other items in way, if possible
    // gravity effects
    // check shock
      // win/shock condition
    this.moves++
    // lose if moves are up
  }

  createChars (items) {
    items.map(({ name, x, y }) => {
      const { xPos, yPos } = this.gridItems[x][y]

      const sprite = this.scene.createSprite({
        spriteType: 'name',
        x: xPos,
        y: yPos,
        facing: 'right',
        ...spriteData(name)
      })

      let item
      switch (name.split('-')[0]) {
        case 'player':
          item = {
            x,
            y,
            sprite,
            type: 'movable',
            canDie: true
          }
          this.player = item
          break
        case 'pipe':
          item = {
            x,
            y,
            sprite,
            type: 'movable',
            canDie: false,
            dirs: [name.split('-')[1], name.split('-')[2]]
          }
          break
        case 'supports':
          item = {
            x,
            y,
            sprite,
            type: 'movable',
            canDie: true
          }
          break
      }

      this.gridItems[x][y].item = item
    })
  }

  createGrid () {
    for (let x = 0; x < GAME_WIDTH; x++) {
      const yArr = []

      for (let y = 0; y < GAME_HEIGHT; y++) {
        const xPos = x * GRID_ITEM_SIZE + GRID_ITEM_OFFSET
        const yPos = y * GRID_ITEM_SIZE + GRID_ITEM_OFFSET + TOP_OFFSET

        yArr.push({ xPos, yPos, item: null })
      }

      this.gridItems.push(yArr)
    }
  }
}

const spriteData = (name) => {
  switch (name.split('-')[0]) {
    case 'pipe':
      return {
        canShock: true,
        anim: name
      }
    case 'supports':
      return {
        canShock: false,
        anim: `${name}-still`
      }
    default: 
      return {
        canShock: true,
        anim: `${name}-idle`
      }
  }
}