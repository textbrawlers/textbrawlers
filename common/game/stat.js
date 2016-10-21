import stats from 'common/json/stats.json'

const round = (num, decimals) => {
  const n = Math.pow(10, decimals)

  return Math.round(num * n) / n
}

const displayFunctions = {
  plain: value => round(value, 0),
  fixed: value => round(value, 0),
  'fixed-fine': value => round(value, 2),
  percent: value => `${round(value * 100, 0)}%`,
  'plus-percent': value => {
    const sign = value > 0 ? '+' : '-'
    const num = Math.abs(round(value * 100, 0))

    return `${sign}${num}%`
  },
  'plus-mult': value => {
    value--
    const niceVal = round(value * 100, 0)
    if (value > 0) {
      return `+${niceVal}%`
    } else {
      return `${niceVal}%`
    }
  }
  string: value => value,
}

export default class Stat {
  constructor (id, value) {
    let baseStat = stats[id]
    if (!baseStat) {
      console.warn('Stat is not configured', id)
      baseStat = {
        tooltip: `Missing stat: ${id}`,
        type: 'additive',
        display: false
      }
    }
    this.value = value
    this.id = id

    this.name = baseStat.name
    this.tooltip = baseStat.tooltip
    this.type = baseStat.type
    this.display = baseStat.display
    this.detailedTooltip = baseStat['detail-tooltip']
  }

  copy () {
    return new Stat(this.id, this.value)
  }

  multiply (value) {
    const newItem = this.copy()
    newItem.value *= value
    return newItem
  }

  add (value) {
    const newItem = this.copy()
    if (newItem.type === 'multiplicative') {
      newItem.value *= value
    } else {
      newItem.value += value
    }

    return newItem
  }

  render (statWrapper) {
    const replacer = (match, fnName) => {
      let fn = displayFunctions[fnName]

      if (!fn) {
        console.warn('Undefined stat parsing function', fnName)
        fn = displayFunctions.plain
      }

      return statWrapper(fn(this.value))
    }
    return this.tooltip.replace(/\[([a-z0-9-]*)\]/g, replacer)
  }
}
