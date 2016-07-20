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

  const tooltip = document.querySelector('.tooltip')

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

  function getBaseItem (item) {
    return items[item.type]
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
      Object.keys(stats).forEach(stat => {
        const statName = statNames[stat] || 'untranslated_' + stat
        let num = stats[stat]

        if (transformStat[stat]) {
          num = transformStat[stat](num)
        } else {
          num = Math.round(num * 1000) / 1000
        }

        tooltipHtml += `<p><b>${num}</b> ${statName}</p>`
      })

      tooltip.innerHTML = tooltipHtml
    } else {
      tooltip.style.display = 'none'
    }
  }

  function getItemPrefixes (item) {
    return item.prefixes.map(prefix => prefixes[prefix.type][prefix.category][prefix.prefix])
  }

  function getItemStats (item) {
    const baseItem = getBaseItem(item)

    const stats = Object.assign({}, baseItem.stats)

    getItemPrefixes(item).forEach(prefix => {
      Object.keys(prefix.stats).forEach(stat => {
        let num = prefix.stats[stat]

        if (typeof stats[stat] === 'undefined') {
          if (/multiplier$/.test(stat)) {
            stats[stat] = 1
          } else {
            stats[stat] = 0
          }
        }

        if (/multiplier$/.test(stat)) {
          stats[stat] *= num
        } else {
          stats[stat] += num
        }
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

    inventory.appendChild(slot)

    return slot
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

  function switchSlots (a, b) {
    ;[inventoryObj[a], inventoryObj[b]] = [inventoryObj[b], inventoryObj[a]]

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
