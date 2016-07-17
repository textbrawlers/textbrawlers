(function () {
  const inventory = document.querySelector('.inventory')
  const margin = 5
  const size = 50

  let inventoryObj = {}

  const INV_WIDTH = 12
  const INV_HEIGHT = 10

  const tooltip = document.querySelector('.tooltip')
  
  function showTooltip(x, y, slot) {
    tooltip.style.left = x + 50 + 5
    tooltip.style.top = y

    const item = inventoryObj[slot]

    if (item) {
      tooltip.innerHTML = JSON.stringify(item)
    } else {
      tooltip.innerHTML = ''
    }


    //tooltip.innerHTML = 'test'
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

    inventory.appendChild(slot)

    return slot
  }

  function setItem (slot, item) {
    inventoryObj[slot] = item
    const htmlSlot = document.querySelector(`[data-slot="${slot}"]`)
    htmlSlot.innerHTML = `<img src="/png/${item.sourceItem.icon}.png"></img>`
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
  })


  const drake = dragula(slots)

  drake.on('drop', (elem, target, source) => {
    window.target = target
    window.source = source

    if (target.childNodes.length > 1) {
      const prev = target.childNodes[0]
      target.removeChild(prev)
      source.appendChild(prev)
    }
  })

  /*
  setItem(2, 2, 'itemsword')
  setItem(2, 1, 'itemshoes')
  setItem(2, 3, 'itemchestpiece')
  setItem(3, 3, 'itempants')
  setItem(4, 3, 'itemshield')
  setItem(5, 3, 'itemhelmet')
  setItem(6, 3, 'itemaxe')
  */

  document.querySelector('#spawnItem').addEventListener('click', () => {
    fetch('/api/admin/spawnitem', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'key': localStorage.getItem('key')
      },
    }).then(resp => resp.json()).then(json => {
      if (!json.success) {
        alert('Could not load account:\n' + json.error)
      } else {
        updateInventory()
      }
    })
  })

  function updateInventory() {
    fetch('/api/game/inventory', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'key': localStorage.getItem('key')
      },
    }).then(resp => resp.json()).then(json => {

      Object.keys(json.inventory).forEach(slot => {
        const item = json.inventory[slot]
        setItem(slot, item)
      })
    })
  }

  updateInventory()

})()
