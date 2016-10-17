import Stat from './stat.js'

export default class StatCollection {

  constructor (stats) {
    this.stats = []

    if (stats) {
      this.add(stats)
    }
  }

  isEmpty () {
    return this.stats.length === 0
  }

  add (stats) {
    if (stats instanceof StatCollection) {
      stats = stats.getStats()
    }
    stats = Array.isArray(stats) ? stats : [stats]

    stats.forEach(stat => this._addOne(stat))
  }

  getStat (statId) {
    return this.stats.find(s => s.id === statId)
  }

  getValue (stat) {
    const s = this.getStat(stat)
    return s ? s.value : 0
  }

  getStats () {
    return this.stats
  }

  _addOne (stat) {
    if (!stat) {
      console.error('Added undefined stat', stat)
    }
    const index = this.stats.findIndex(s => s.id === stat.id)
    if (index !== -1) {
      this.stats[index] = this.stats[index].add(stat.value)
    } else {
      this.stats.push(stat)
    }
  }

  find (fn) {
    return this.stats.find(fn)
  }

  remove (stat) {
    this.stats.splice(this.stats.indexOf(stat), 1)
  }

  filter (fn) {
    this.stats = this.stats.filter(fn)
  }

  serialize () {
    return this.stats.map(({id, value}) => ({ id, value }))
  }

  static fromJSON (json) {
    return new StatCollection(json.map(({id, value}) => new Stat(id, value)))
  }

}
