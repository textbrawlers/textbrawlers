(function () {
  const inventory = document.querySelector('.inventory')
  const margin = 5
  const size = 50

  function createSlot (x, y) {
    const slot = document.createElement('div')
    slot.classList.add('inv-slot')
    slot.style.left = margin + x * (margin + size)
    slot.style.top = margin + y * (margin + size)
    slot.id = `inv-${x}-${y}`

    inventory.appendChild(slot)
  }

  function setItem (x, y, item) {
    const slot = document.querySelector(`#inv-${x}-${y}`)
    slot.innerHTML = `<img src="/png/${item}.png" draggable="true"></img>`
  }

  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < 10; x++) {
      createSlot(x, y)
    }
  }


  setItem(2, 2, 'itemsword')
})()
