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
    this.createItems(items)
  }

  movePlayer (dir) {
    // move char, increment if possible
      // move other items in way, if possible
    const result = this.move(this.player, dir)

    if (result) {
      this.moves++
    }

    // gravity effects
    // check shock
      // win/shock condition
    // lose if moves are up

    if (this.moves === this.tries) {
      alert('lost!')
    }
  }

  move (item, dir) {
    const { x, y } = item

    let newX, newY
    switch (dir) {
      case 'up':
        newX = x
        newY = y - 1
        break
      case 'down':
        newX = x
        newY = y + 1
        break
      case 'left':
        newX = x - 1
        newY = y
        break
      case 'right':
        newX = x + 1
        newY = y
        break
      default:
        throw new Error('No dir in State.move()')
    }

    console.log(newX, newY)
    const tile = this.getItemAt(newX, newY)
    if (!tile) {
      // TODO: Remove
      console.log('oob')
      return false
    }

    if (tile.item) {
      if (!tile.item.movable) {
        return false
      }

      const results = this.move(tile.item, dir)

      if (!results) {
        return false
      }
    }

    item.x = newX
    item.y = newY
    tile.item = item

    const oldTile = this.getItemAt(x, y, this.grid)
    oldTile.item = null

    item.sprite.moveTo(tile.xPos, tile.yPos)
    return true
  }

  getItemAt (x, y) {
    if (x < 0 || x >= GAME_WIDTH || y < 0 || y >= GAME_HEIGHT) {
      return null
    }

    return this.gridItems[x][y]
  }

  createItems (items) {
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
            movable: true,
            canDie: true,
            gravity: false
          }
          this.player = item
          break
        case 'pipe':
          if (name.split('-')[1] === 'node') {
            item = {
              x,
              y,
              sprite,
              movable: false,
              canDie: false,
              gravity: false
            }
          } else {
            item = {
              x,
              y,
              sprite,
              movable: true,
              canDie: false,
              gravity: false,
              dirs: [name.split('-')[1], name.split('-')[2]]
            }
          }
          break
        case 'supports':
          item = {
            x,
            y,
            sprite,
            movable: false,
            canDie: true,
            gravity: false
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