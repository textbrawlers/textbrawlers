/* global dragula, fetch */

;(function () {
  const inventory = document.querySelector('.inventory')
  const margin = 5
  const size = 50
  let prefixes

  let inventoryObj = {}
  let items
  let statNames

  const INV_WIDTH = 12
  const INV_HEIGHT = 10

  const tooltip = document.querySelector('#tooltip')

  const percent = num => Math.round(num * 100) + '%'
  const plusPercent = num => '+' + Math.round(num * 100) + '%'

  const transformStat = {
    'crit-chance': percent,
    'bleed-chance': percent,
    'hit-chance': percent,
    'stun-chance': percent,
    'crit-damage': percent,
    'block-chance': percent,
    'block-multiplier': percent,
    'damage-multiplier': percent,
    'max-health-multiplier': percent,
    'comfort': plusPercent,
    'fashionable': plusPercent
  }

  function calculateStats () {
    const stats = document.querySelector('#characterstats')

    stats.innerHTML = ''

    const characterStats = {
      'max-health': 100
    }

    for (let i = 0; i < 6; i++) {
      const item = getItem(`e${i}`)

      if (item) {
        const itemStats = getItemStats(item)
        const baseItem = getBaseItem(item)

        if (!baseItem.attack) {
          Object.keys(itemStats).forEach(stat => {
            characterStats[stat] = combineStat(stat, characterStats[stat], itemStats[stat])
          })
        }
      }
    }

    const maxHpMultiplier = characterStats['max-health-multiplier']
    if (maxHpMultiplier) {
      characterStats['max-health'] *= maxHpMultiplier
      delete characterStats['max-health-multiplier']
    }

    for (let i = 0; i < 6; i++) {
      const item = getItem(`e${i}`)

      if (item) {
        const hand = i === 4 ? 'Left Hand' : 'Right Hand'
        const itemStats = getItemStats(item)
        const baseItem = getBaseItem(item)

        if (!baseItem.attack) {
          continue
        }

        const weaponStats = Object.assign({}, characterStats)

        Object.keys(itemStats).forEach(stat => {
          weaponStats[stat] = combineStat(stat, characterStats[stat], itemStats[stat])
        })

        if (weaponStats['damage-multiplier']) {
          weaponStats['damage'] *= weaponStats['damage-multiplier']
          delete weaponStats['damage-multiplier']
        }

        stats.innerHTML += `<h2 class="rarity-${item.rarity}">${hand}</h2>`

        ;[
          'damage',
          'hit-chance',
          'space',
          'crit-chance',
          'crit-damage',
          'space',
          'bleed-chance',
          'bleed-duration',
          'space',
          'stun-chance'
        ].forEach(stat => {
          if (stat === 'space') {
            stats.innerHTML += '<div class="separator"></div>'
          } else {
            stats.innerHTML += listStat(stat, weaponStats[stat])
          }
        })
      }
    }

    stats.innerHTML += '<h2 class="character-header">Character</h2>'

    ;[
      'max-health',
      'space',
      'block-chance',
      'block-multiplier',
      'space',
      'damage-multiplier',
      'hit-chance'
    ].forEach(stat => {
      if (stat === 'space') {
        stats.innerHTML += '<div class="separator"></div>'
      } else {
        stats.innerHTML += listStat(stat, characterStats[stat])
      }
    })
  }

  function getBaseItem (item) {
    return items[item.type]
  }

  function getItemName (item) {
    const itemPrefixes = item.prefixes.map(prefix => prefixes[prefix.type][prefix.category][prefix.prefix].name).join(' ')
    item.sourceItem = item.sourceItem || {}
    tooltipHtml = `<h2 class="rarity-${item.rarity}">${itemPrefixes} ${getBaseItem(item).name}</h2>`
  }

  function listStat (stat, num) {
    const statName = statNames[stat] || 'untranslated_' + stat

    if (!num) {
      if (isStatMultiplicative(stat)) {
        num = 1
      } else {
        num = 0
      }
    }

    if (transformStat[stat]) {
      num = transformStat[stat](num)
    } else {
      num = Math.round(num)
    }

    return `<p><b>${num}</b> ${statName}</p>`
  }

  function getStatList (stats) {
    let html = ''
    Object.keys(stats).forEach(stat => {
      html += listStat(stat, stats[stat])
    })

    return html
  }

  function showTooltip (x, y, slot) {
    tooltip.style.display = 'block'
    tooltip.style.left = x + 50 + 5
    tooltip.style.top = y

    const item = inventoryObj[slot]

    if (item && Object.keys(item).length && item.sourceItem !== 0) {
      const itemPrefixes = item.prefixes.map(prefix => prefixes[prefix.type][prefix.category][prefix.prefix].name).join(' ')
      item.sourceItem = item.sourceItem || {}
      tooltipHtml = `<h2 class="rarity-${item.rarity}">${itemPrefixes} ${getBaseItem(item).name}</h2>`

      const stats = getItemStats(item)

      tooltipHtml += getStatList(stats)

      tooltip.innerHTML = tooltipHtml
    } else {
      tooltip.style.display = 'none'
    }
  }

  function getItemPrefixes (item) {
    return item.prefixes.map(prefix => prefixes[prefix.type][prefix.category][prefix.prefix])
  }

  function isStatMultiplicative (stat) {
    return /multiplier$/.test(stat)
  }

  function combineStat (stat, previous, num) {
    if (typeof previous === 'undefined') {
      if (isStatMultiplicative(stat)) {
        previous = 1
      } else {
        previous = 0
      }
    }

    if (isStatMultiplicative(stat)) {
      return previous * num
    } else {
      return previous + num
    }
  }

  function getItemStats (item) {
    const baseItem = getBaseItem(item)

    const stats = Object.assign({}, baseItem.stats)

    getItemPrefixes(item).forEach(prefix => {
      Object.keys(prefix.stats).forEach(stat => {
        let num = prefix.stats[stat]

        stats[stat] = combineStat(stat, stats[stat], num)
      })
    })

    return stats
  }

  function hideTooltip () {
    tooltip.style.display = 'none'
  }

  function createSlot (x, y, index) {
    const slot = document.createElement('div')
    slot.classList.add('inv-slot')
    slot.style.left = margin + x * (margin + size)
    slot.style.top = margin + y * (margin + size)
    slot.id = `inv-${x}-${y}`
    slot.dataset.slot = 'i' + index

    slot.addEventListener('mouseover', () => {
      const boundingRect = slot.getBoundingClientRect()
      showTooltip(boundingRect.left, boundingRect.top, 'i' + index)
    })

    slot.addEventListener('mouseout', hideTooltip)

    slot.addEventListener('click', e => itemClick(e, slot))

    inventory.appendChild(slot)

    return slot
  }

  function getItem (slot) {
    return inventoryObj[slot]
  }

  function setItem (slot, item) {
    inventoryObj[slot] = item

    const htmlSlot = document.querySelector(`[data-slot="${slot}"]`)
    if (item && Object.keys(item).length !== 0) {
      const baseItem = getBaseItem(item)

      const icon = baseItem ? baseItem.icon : 'none'
      const rarity = item.rarity

      htmlSlot.innerHTML = `<img src="/png/${icon}.png" class="item item-${rarity}"></img>`
    } else {
      htmlSlot.innerHTML = ''
    }
  }

  document.querySelector('.craft-button').addEventListener('click', reassemble)

  function reassemble () {
    fetch('/api/game/inventory/reassemble', {
      method: 'POST',
      headers: {
        key: window.localStorage.getItem('key'),
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    }).then(resp => resp.json()).then(json => {
      if (!json.success) {
        window.alert('Could not generate item:\n' + json.error)
      } else {
        updateInventory()
      }
    })
  }

  function itemClick (e, slot) {
    const item = getItem(slot.dataset.slot)

    if (item && e.ctrlKey) {
      for (let i = 0; i < 4; i++) {
        const item = getItem(`c${i}`)
        if (!item) {
          switchSlots(slot.dataset.slot, `c${i}`)
          updateSlot(slot.dataset.slot)
          updateSlot(`c${i}`)
          break
        }
      }
    }
  }

  function updateSlot (slot) {
    setItem(slot, getItem(slot))
  }

  function switchSlots (a, b) {
    ;[inventoryObj[a], inventoryObj[b]] = [inventoryObj[b], inventoryObj[a]]

    calculateStats()

    fetch('/api/game/inventory/switch', {
      method: 'POST',
      headers: {
        key: window.localStorage.getItem('key'),
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ a, b})
    }).then(resp => resp.json()).then(json => {
    })
  }

  const slots = []

  let index = 0

  for (var y = 0; y < INV_HEIGHT; y++) {
    for (var x = 0; x < INV_WIDTH; x++) {
      slots.push(createSlot(x, y, index))
      index++
    }
  }

  index = 0
  ;['.inv-head', '.inv-body', '.inv-legs', '.inv-boots', '.inv-lefthand', '.inv-righthand', '.inv-craft-1', '.inv-craft-2', '.inv-craft-3', '.inv-craft-4'].forEach(slot => {
    const i = index
    slot = document.querySelector(slot)
    slots.push(slot)

    slot.addEventListener('mouseover', () => {
      const boundingRect = slot.getBoundingClientRect()
      showTooltip(boundingRect.left, boundingRect.top, slot.dataset.slot)
    })

    slot.addEventListener('mouseout', hideTooltip)

    slot.addEventListener('click', e => itemClick(e, slot))
    index++
  })

  const drake = dragula(slots)

  drake.on('drop', (elem, target, source) => {
    if (target.childNodes.length > 1) {
      const dropPos = target.children[0] === elem ? 1 : 0
      const otherElem = target.childNodes[dropPos]

      target.removeChild(otherElem)
      source.appendChild(otherElem)
    }

    switchSlots(source.dataset.slot, target.dataset.slot)
  })

  document.querySelector('#spawnItem').addEventListener('click', () => {
    fetch('/api/admin/spawnitem', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'key': window.localStorage.getItem('key')
      }
    }).then(resp => resp.json()).then(json => {
      if (!json.success) {
        window.alert('Could not generate item:\n' + json.error)
      } else {
        updateInventory()
      }
    })
  })

  function updateInventory () {
    fetch('/api/game/inventory', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'key': window.localStorage.getItem('key')
      }
    }).then(resp => resp.json()).then(json => {
      const slots = []
      for (let i = 0; i < 120; i++) {
        slots.push(`i${i}`)
      }

      for (let i = 0; i < 6; i++) {
        slots.push(`e${i}`)
      }

      for (let i = 0; i < 4; i++) {
        slots.push(`c${i}`)
      }

      slots.forEach(slot => {
        const item = json.inventory[slot]
        setItem(slot, item)
      })
      calculateStats()
    })
  }

  function fetchPrefixes () {
    return fetch('/api/data/prefixes', {
      method: 'GET'
    }).then(resp => resp.json())
  }

  function fetchItems () {
    return fetch('/api/data/items', {
      method: 'GET'
    }).then(resp => resp.json())
  }

  function fetchStatNames () {
    return fetch('/api/data/stat-names', {
      method: 'GET'
    }).then(resp => resp.json())
  }

  fetchPrefixes().then(_prefixes => {
    prefixes = _prefixes
  }).then(fetchStatNames).then(_statNames => {
    statNames = _statNames
  }).then(fetchItems).then(_items => {
    items = _items

    updateInventory()
  })
})()
