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

}
