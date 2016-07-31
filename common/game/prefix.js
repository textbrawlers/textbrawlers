import Stat from 'common/game/stat.js'

export default class {
  constructor(path, prefix) {
    this.path = path

    this.name = prefix.name
    this.stats = Object.entries(prefix.stats).map(([id, value]) => new Stat(id, value))
  }
}
