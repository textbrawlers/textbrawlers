import React, { Component } from 'react'
import 'client/css/game-fight.scss'
import 'client/css/game-inventory.scss'
import request from 'common/api/request.js'
import Player from 'common/game/player.js'
import InventorySlot from './inventorySlot.js'
import InvItem from './invItem.js'
import BuffBar from './buffBar.js'
import HealthBar from './healthBar.js'

export default class Fight extends Component {

  constructor () {
    super()

    this.getItem = this.getItem.bind(this)
    this.createSpecialSlot = this.createSpecialSlot.bind(this)

    this.state = {
      attacks: [],
      players: [],
      accounts: [],
      me: -1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.fightId !== this.props.params.fightId) {
      this.load(nextProps.params.fightId)
    }
  }

  componentDidMount () {
    this.load(this.props.params.fightId)

    this.props.realtime.on('message-fight.attack', attack => {
      if (attack.fightId === this.props.params.fightId) {
        this.setState({
          attacks: this.state.attacks.concat(attack)
        })
      }
    })
  }

  load (fightId) {
    this.setState({
      attacks: [],
      players: [],
      accounts: [],
      me: -1,
      failedLoad: false
    })

    request.post(`/api/game/fight-subscribe/` + fightId).then(() => {
      return this.update()
    })
    .then(() => console.log('Fight subscribed'))
    .catch(err => console.error(err.stack || err))
  }

  componentWillUnmount () {
    request.post(`/api/game/fight-unsubscribe/` + this.props.params.fightId)
      .catch(err => console.error(err.stack || err))
  }

  async update () {
    const resp = (await request.get('/api/game/fight/' + this.props.params.fightId)).json

    if (resp.success === false) {
      this.setState({
        failedLoad: true
      })
      return
    }

    const players = await Promise.all(resp.players.map(player => Player.fromJSON(player)))

    this.setState({
      players: players,
      accounts: resp.accounts,
      me: resp.me === -1 ? 0 : resp.me,
      attacks: resp.history
    })
  }

  getItem (player, inventory, index) {
    const item = player[inventory] && player[inventory].get(index)
    if (!item) {
      return
    }
    return <InvItem item={item} inventory={inventory} slot={index} />
  }

  createSpecialSlot (player, inventory, slot, special = '', accepts = 'any') {
    return (
      <InventorySlot accepts={accepts} special={special} inventory={inventory} slot={slot}>
        {this.getItem(player, inventory, slot)}
      </InventorySlot>
    )
  }

  render () {
    if (this.state.players.length === 0) {
      return <div />
    }
    const attacks = this.state.attacks.map((attack, i) => {
      const attackText = attack.type === 'regular' ? this.printRegularAttack(attack) : this.printBuffAttack(attack)

      const isMe = attack.attacker === this.state.me
      const className = ['fight-text']
      if (!isMe) {
        className.push('fight-text-opponent')
      }
      return (
        <div key={i} className={className.join(' ')}>
          {attackText}
        </div>
      )
    })

    const playerMe = this.state.players[this.state.me]
    const playerOpponent = this.state.players[this.state.me === 0 ? 1 : 0]
    const accountMe = this.state.accounts[this.state.me]
    const accountOpponent = this.state.accounts[this.state.me === 0 ? 1 : 0]

    const lastAttack = this.state.attacks[this.state.attacks.length - 1]

    let buffsMe = []
    let buffsOpponent = []
    let healthDataMe
    let healthDataOpponent

    if (lastAttack) {
      buffsMe = lastAttack.playerStates[this.state.me].buffs
      buffsOpponent = lastAttack.playerStates[this.state.me === 0 ? 1 : 0].buffs
      healthDataMe = {
        currentHP: lastAttack.playerStates[this.state.me].currentHP,
        maxHP: lastAttack.playerStates[this.state.me].maxHP
      }
      healthDataOpponent = {
        currentHP: lastAttack.playerStates[this.state.me === 0 ? 1 : 0].currentHP,
        maxHP: lastAttack.playerStates[this.state.me === 0 ? 1 : 0].maxHP
      }
    }

    if (this.state.failedLoad) {
      return (
        <div className='page-game-fight'>
          FIght not found
        </div>
      )
    }

    return (
      <div className='page-game-fight page-game-inventory'>
        <div className='content-background'>
          <div className='window equip-window'>
            <h2>Equipped Items</h2>
            <div className='equip windowcontent'>
              {playerMe &&
                <div>
                  {accountMe.username}
                  <div className='equip-itemslot equip-right'>
                    {this.createSpecialSlot(playerMe, 'equipped', 0, 'head', 'head')}
                    {this.createSpecialSlot(playerMe, 'equipped', 6, 'trinket', 'trinket')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerMe, 'equipped', 4, 'lefthand', 'hand')}
                    {this.createSpecialSlot(playerMe, 'equipped', 1, 'body', 'torso')}
                    {this.createSpecialSlot(playerMe, 'equipped', 5, 'righthand', 'hand')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerMe, 'equipped', 2, 'legs', 'legs')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerMe, 'equipped', 3, 'boots', 'feet')}
                  </div>
                </div>
              }
              {healthDataMe &&
                <HealthBar healthData={healthDataMe} />
              }
              <BuffBar buffs={buffsMe} />
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
              {playerOpponent &&
                <div>
                  {accountOpponent.username}
                  <div className='equip-itemslot equip-right'>
                    {this.createSpecialSlot(playerOpponent, 'equipped', 0, 'head', 'head')}
                    {this.createSpecialSlot(playerOpponent, 'equipped', 6, 'trinket', 'trinket')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerOpponent, 'equipped', 4, 'lefthand', 'hand')}
                    {this.createSpecialSlot(playerOpponent, 'equipped', 1, 'body', 'torso')}
                    {this.createSpecialSlot(playerOpponent, 'equipped', 5, 'righthand', 'hand')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerOpponent, 'equipped', 2, 'legs', 'legs')}
                  </div>
                  <div className='equip-itemslot'>
                    {this.createSpecialSlot(playerOpponent, 'equipped', 3, 'boots', 'feet')}
                  </div>
                </div>
              }
              {healthDataOpponent &&
                <HealthBar healthData={healthDataOpponent} />
              }
              <BuffBar buffs={buffsOpponent} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  printRegularAttack (attack) {
    if (this.state.accounts.length === 0) {
      return
    }

    const attacker = this.state.accounts[attack.attacker].username
    const defender = this.state.accounts[attack.defender].username

    const weapon = this.state.players[attack.attacker].weaponStats[attack.weapon].weapon.displayName

    const msg = attack.message
      .replace(/\[attacker\]/g, attacker)
      .replace(/\[defender\]/g, defender)
      .replace(/\[item-name\]/g, weapon)

    return `${msg} (${attack.damage})`
  }

  printBuffAttack (attack) {
    const defender = this.state.accounts[attack.playerDamaged].username

    const buffTexts = []

    if (attack.bleedDamage > 0) {
      buffTexts.push(attack.bleedDamage + ' Bleed Damage')
    }
    if (attack.poisonDamage > 0) {
      buffTexts.push(attack.poisonDamage + ' Poison Damage')
    }
    if (attack.burnDamage > 0) {
      buffTexts.push(attack.burnDamage + ' Burn Damage')
    }
    if (attack.arcaneDamage > 0) {
      buffTexts.push(attack.arcaneDamage + ' Arcane Damage')
    }

    if (buffTexts.length > 0) {
      return `${defender} took ${buffTexts.join(', ')}.`
    }
    return ''
  }
}
