// Include modifiers here.
import dodge from './dodge.js'
import block from './block.js'
import crit from './crit.js'
import arcane from './arcane.js'
import bleed from './bleed.js'
import burn from './burn.js'
import poison from './poison.js'
import stun from './stun.js'
import timestop from './timestop.js'
import bloodlust from './bloodlust.js'
import thorns from './thorns.js'
import maffect from './magicalaffect.js'
import multistrike from './multistrike.js'

// Add modifiers to array, ORDER MATTERS.
const modifiers = [
  // Dodge
  dodge,
  // On Dodge
  multistrike,
  // Block
  block,
  // On Block
  thorns,
  // Crit
  crit,
  // On Crit
  // On Hit
  bloodlust,
  arcane,
  bleed,
  burn,
  poison,
  stun,
  maffect,
  // Other
  timestop
]

export default modifiers
