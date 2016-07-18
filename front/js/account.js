/* global dragula, fetch */

;(function () {
  const inventory = document.querySelector('.inventory')
  const margin = 5
  const size = 50
  let weaponPrefixes

  let inventoryObj = {}

  const INV_WIDTH = 12
  const INV_HEIGHT = 10

  console.log('v4')

  const tooltip = document.querySelector('.tooltip')

  function showTooltip (x, y, slot) {
    tooltip.style.display = 'block'
    tooltip.style.left = x + 50 + 5
    tooltip.style.top = y

    const item = inventoryObj[slot]

    if (item) {
      const prefixes = item.prefixes.map(prefix => weaponPrefixes[prefix.category][prefix.prefix].name).join(' ')
      tooltip.innerHTML = `<h2 class="rarity-${item.rarity}">${prefixes} ${item.sourceItem.name}</h2><pre>` + JSON.stringify(item, undefined, 4)
    } else {
      tooltip.style.display = 'none'
    }
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
    htmlSlot.innerHTML = `<img src="/png/${item.sourceItem.icon}.png"></img>`
  }

  function switchSlots (a, b) { [inventoryObj.a, inventoryObj.b] = [inventoryObj.b, inventoryObj.a]
  }

  const slots = []

  let index = 0

  for (var y = 0; y < INV_HEIGHT; y++) {
    for (var x = 0; x < INV_WIDTH; x++) {
      slots.push(createSlot(x, y, index))
      index++
    }
  }

  ['.inv-head', '.inv-body', '.inv-legs', '.inv-boots', '.inv-lefthand', '.inv-righthand'].forEach(slot => {
    slot = document.querySelector(slot)
    slots.push(slot)

    slot.addEventListener('mouseover', () => {
      const boundingRect = slot.getBoundingClientRect()
      showTooltip(boundingRect.left, boundingRect.top, 'i' + index)
    })

    slot.addEventListener('mouseout', hideTooltip)
  })

  const drake = dragula(slots)

  drake.on('drop', (elem, target, source) => {
    if (target.childNodes.length > 1) {
      const prev = target.childNodes[0]
      target.removeChild(prev)
      source.appendChild(prev)
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
        window.alert('Could not load account:\n' + json.error)
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
      Object.keys(json.inventory).forEach(slot => {
        const item = json.inventory[slot]
        setItem(slot, item)
      })
    })
  }

  function fetchWeaponPrefixes () {
    return fetch('/api/data/weapon-prefixes', {
      method: 'GET'
    }).then(resp => resp.json())
  }

  fetchWeaponPrefixes().then(prefixes => {
    weaponPrefixes = prefixes

    updateInventory()
  })
})()
