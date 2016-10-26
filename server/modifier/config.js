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
import rampage from './rampage.js'

// Add modifiers to array. Order is as follows: Dodge, On Dodge Effects, Block, On Block Effects, Crit, On Crit Effects, On Hit Effects, Other
const modifiers = [
  dodge,

  rampage,

  block,
  thorns,

  crit,

  bloodlust,
  arcane,
  bleed,
  burn,
  poison,
  stun,
  maffect,

  timestop
]

export default modifiers
