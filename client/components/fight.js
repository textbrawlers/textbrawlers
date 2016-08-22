import React, { Component } from 'react'
import 'client/css/game-fight.scss'
import 'client/css/game-inventory.scss'
import InventorySlot from './inventorySlot.js'
import InvItem from './invItem.js'

export default class Fight extends Component {

  constructor () {
    super()

    this.getItem = this.getItem.bind(this)
    this.createSpecialSlot = this.createSpecialSlot.bind(this)

    this.state = {
      attacks: []
    }
  }

  getItem (inventory, index) {
    if (!this.state.player) {
      return
    }
    const item = this.state.player[inventory] && this.state.player[inventory].get(index)
    if (!item) {
      return
    }
    return <InvItem item={item} switchItems={this.switchItems.bind(this)} inventory={inventory} slot={index} />
  }

  createSpecialSlot (inventory, slot, special = '', accepts = 'any') {
    return (
      <InventorySlot accepts={accepts} special={special} inventory={inventory} slot={slot}>
        {this.getItem(inventory, slot)}
      </InventorySlot>
    )
  }

  componentWillMount () {
    this.props.realtime.on('message-fight.attack', attack => {
      this.setState({
        attacks: this.state.attacks.concat(attack)
      })
    })
  }

  render () {
    const attacks = this.state.attacks.map(attack => {
      const attackText = attack.type === 'regular' ? this.printRegularAttack(attack) : this.printBuffAttack(attack)
      return (
        <div className='fight-text'>
          {attackText}
        </div>
      )
    })
    return (
      <div className='page-game-fight page-game-inventory'>
        <div className='content-background'>
          <div className='window equip-window'>
            <h2>Equipped Items</h2>
            <div className='equip windowcontent'>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 0, 'head', 'head')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 4, 'lefthand', 'hand')}
                {this.createSpecialSlot('equipped', 1, 'body', 'torso')}
                {this.createSpecialSlot('equipped', 5, 'righthand', 'hand')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 2, 'legs', 'legs')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 3, 'boots', 'feet')}
              </div>
            </div>
          </div>
          <div className='window fight-window'>
            <h2>Fight</h2>
            <div className='windowcontent'>
              <div className='container-fight-text'>
                {attacks}
              </div>
            </div>
          </div>
          <div className='window equip-window'>
            <h2>Equipped Items</h2>
            <div className='equip windowcontent'>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 0, 'head', 'head')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 4, 'lefthand', 'hand')}
                {this.createSpecialSlot('equipped', 1, 'body', 'torso')}
                {this.createSpecialSlot('equipped', 5, 'righthand', 'hand')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 2, 'legs', 'legs')}
              </div>
              <div className='equip-itemslot'>
                {this.createSpecialSlot('equipped', 3, 'boots', 'feet')}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  printRegularAttack (attack) {
    if (!attack.hasWeapon){
      return 'Player ' + attack.attacker + ' has no weapon.'
    }
    if (attack.miss){
      return 'Player ' + attack.attacker + ' missed.'
    }
    else if (attack.crit > 0){
      (attack.arcaneDamage > 0){
        return 'Player ' + attack.attacker + ' made a critical hit to for ' + attack.damage + ' damage and ' + attack.arcaneDamage + ' arcane damage.'
      }
      return 'Player ' + attack.attacker + ' made a critical hit to for ' + attack.damage + ' damage.'
    }
    else if (attack.arcaneDamage > 0){
      return 'Player ' + attack.attacker + ' dealt ' + attack.damage + ' damage and ' + attack.arcaneDamage + ' arcane damage.'
    }
    else {
      return 'Player ' + attack.attacker + ' dealt ' + attack.damage + ' damage.'
    }
  }

  printBuffAttack (attack) {
    let string = 'Player ' + attack.playerDamaged + ' took '
    let damageBefore = false
    if (attack.bleedDamage > 0){
      string += attack.bleedDamage + ' Bleed Damage'
      damageBefore = true
    }
    if (attack.poisonDamage > 0){
      if (damageBefore){
        string += ', '
      }
      string += attack.poisonDamage + ' Poison Damage'
      damageBefore = true
    }
    if (attack.burnDamage > 0){
      if (damageBefore){
        string += ', '
      }
      string += attack.burnDamage + ' Burn Damage'
      damageBefore = true
    }
    if (attack.arcaneDamage > 0){
      if (damageBefore){
        string += ', '
      }
      string += attack.arcaneDamage + ' Arcane Damage'
      damageBefore = true
    }
    if (!damageBefore){
      string = 'Player ' + attack.playerDamaged + ' has no dots applied.'
    } else {
      string += '.'
    }
    return string
  }
}
