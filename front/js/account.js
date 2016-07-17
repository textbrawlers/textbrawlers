(function () {
  const inventory = document.querySelector('.inventory')
  const margin = 5
  const size = 50

  const tooltip = document.querySelector('.tooltip')
  
  function showTooltip(x, y) {
    tooltip.style.left = x + 50 + 5
    tooltip.style.top = y

    //tooltip.innerHTML = 'test'
  }

  function createSlot (x, y) {
    const slot = document.createElement('div')
    slot.classList.add('inv-slot')
    slot.style.left = margin + x * (margin + size)
    slot.style.top = margin + y * (margin + size)
    slot.id = `inv-${x}-${y}`


    slot.addEventListener('mouseover', () => {
      const boundingRect = slot.getBoundingClientRect()
      showTooltip(boundingRect.left, boundingRect.top)
    })

    inventory.appendChild(slot)

    return slot
  }

  function setItem (x, y, item) {
    const slot = document.querySelector(`#inv-${x}-${y}`)
    slot.innerHTML = `<img src="/png/${item}.png"></img>`
  }

  const slots = []

  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 12; x++) {
      slots.push(createSlot(x, y))
    }
  }

  ['.inv-head', '.inv-body', '.inv-legs', '.inv-boots', '.inv-lefthand', '.inv-righthand'].forEach(slot => {
    slot = document.querySelector(slot)
    slots.push(slot)

    slot.addEventListener('mouseover', () => {
      const boundingRect = slot.getBoundingClientRect()
      showTooltip(boundingRect.left, boundingRect.top)
    })
  })


  const drake = dragula(slots)

  drake.on('drop', (elem, target, source) => {
    window.target = target
    window.source = source
    console.log(target, source)

    if (target.childNodes.length > 1) {
      const prev = target.childNodes[0]
      target.removeChild(prev)
      source.appendChild(prev)
    }
  })

  setItem(2, 2, 'itemsword')
  setItem(2, 1, 'itemshoes')
  setItem(2, 3, 'itemchestpiece')
  setItem(3, 3, 'itempants')
  setItem(4, 3, 'itemshield')
  setItem(5, 3, 'itemhelmet')
})()
