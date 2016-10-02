// Include modifiers here.
import crit from './crit.js'
import block from './block.js'
import arcane from './arcane.js'
import bleed from './bleed.js'
import burn from './burn.js'
import poison from './poison.js'
import stun from './stun.js'
import timestop from './timestop.js'

// Add modifiers to array. Order matters.
const modifiers = [
  crit,
  block,
  arcane,
  bleed,
  burn,
  poison,
  stun,
  timestop
]

export default modifiers
