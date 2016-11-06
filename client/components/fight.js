import React, { Component } from 'react'
import 'client/css/game-fight.scss'
import 'client/css/game-inventory.scss'
import request from 'common/api/request.js'
import Entity from 'common/game/entity.js'
import InventorySlot from './inventorySlot.js'
import InvItem from './invItem.js'
import BuffBar from './buffBar.js'
import HealthBar from './healthBar.js'
import * as common from 'common/api/common.js'

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

  componentWillUpdate () {
    const attacklog = this.refs.attacklog
    this.wasScrolledBottom = attacklog && attacklog.scrollTop + attacklog.offsetHeight === attacklog.scrollHeight
  }

  componentDidUpdate () {
    if (this.wasScrolledBottom) {
      const attacklog = this.refs.attacklog

      attacklog.scrollTop = attacklog.scrollHeight
    }
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

    const players = resp.players.map(player => Entity.fromJSON(player))

    this.setState({
      players: players,
      accounts: resp.accounts,
      me: resp.me === -1 ? 0 : resp.me,
      attacks: resp.history || []
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
      const className = ['fight-text']
      let icons = []
      let attackText = ''
      switch (attack.type) {
        case 'regular':
          attackText = this.printRegularAttack(attack)
          icons = icons.concat(this.getRegularAttackIcons(attack))
          break
        case 'buff':
          attackText = this.printBuffAttack(attack)
          break
        case 'newTurn':
          attackText = this.printNewTurn(attack)
          className.push('fight-text-newturn')
          break
      }

      const isMe = attack.attacker === this.state.me
      if (!isMe) {
        className.push('fight-text-opponent')
      }
      return (
        <div key={i} className={className.join(' ')}>
          <span dangerouslySetInnerHTML={{__html: attackText}} />

          {icons.map((icon, i) => <img key={i} src={`/client/png/${icon}.png`} />)}
        </div>
      )
    })

    const playerMe = this.state.players[this.state.me]
    const playerOpponent = this.state.players[this.state.me === 0 ? 1 : 0]
    const accountMe = this.state.accounts[this.state.me]
    const accountOpponent = this.state.accounts[this.state.me === 0 ? 1 : 0]

    let buffsMe = []
    let buffsOpponent = []
    let healthDataMe
    let healthDataOpponent

    let lastPlayerStates
    for (let i = this.state.attacks.length - 1; i >= 0; i--) {
      if (this.state.attacks[i].playerStates) {
        lastPlayerStates = this.state.attacks[i].playerStates
        break
      }
    }

    if (lastPlayerStates) {
      buffsMe = lastPlayerStates[this.state.me].buffs
      buffsOpponent = lastPlayerStates[this.state.me === 0 ? 1 : 0].buffs
      healthDataMe = {
        currentHP: lastPlayerStates[this.state.me].currentHP,
        maxHP: lastPlayerStates[this.state.me].maxHP
      }
      healthDataOpponent = {
        currentHP: lastPlayerStates[this.state.me === 0 ? 1 : 0].currentHP,
        maxHP: lastPlayerStates[this.state.me === 0 ? 1 : 0].maxHP
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
              <div className='container-fight-text' ref='attacklog'>
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

  getRegularAttackIcons (attack) {
    const icons = []
    if (attack.textData.missed) {
      icons.push('attackmiss')
    } else if (attack.textData.crits === 2) {
      icons.push('attackredcrit')
    } else if (attack.textData.crits === 1) {
      icons.push('attackcrit')
    } else if (attack.textData.blocked) {
      icons.push('attackblock')
    } else {
      icons.push('attackhit')
    }

    return icons
  }

  printRegularAttack (attack) {
    if (this.state.accounts.length === 0) {
      return
    }

    const attackerName = this.state.accounts[attack.attacker].username
    const defenderName = this.state.accounts[attack.defender].username

    const attacker = this.state.players[attack.attacker]

    let weapon
    let weaponName
    if (attacker.weaponStats && attacker.weaponStats.length > 0) {
      weapon = attacker.weaponStats[attack.weapon].weapon
      weaponName = weapon.displayName
    }

    const meIsAttacker = this.state.me === attack.attacker

    let attackerNameStyled
    let defenderNameStyled

    if (meIsAttacker) {
      attackerNameStyled = `<span class="player-name-me">${attackerName}</span>`
      defenderNameStyled = `<span class="player-name-other">${defenderName}</span>`
    } else {
      attackerNameStyled = `<span class="player-name-other">${attackerName}</span>`
      defenderNameStyled = `<span class="player-name-me">${defenderName}</span>`
    }

    let weaponNameStyled
    if (weapon) {
      weaponNameStyled = `<span class="attack-weapon rarity-${weapon.rarity}">${weaponName}</span>`
    }

    const msg = attack.message
      .replace(/\[attacker\]/g, attackerNameStyled)
      .replace(/\[defender\]/g, defenderNameStyled)
      .replace(/\[item-name\]/g, weaponNameStyled)

    return `${msg} (${attack.damage})`
  }

  printBuffAttack (attack) {
    const defender = this.state.accounts[attack.playerDamaged].username

    const buffTexts = []

    Object.entries(attack.dots).forEach(([dot, obj]) => {
      if (dot && obj.damage) {
        buffTexts.push(obj.damage + ' ' + common.capitalizeFirstLetter(obj.type) + ' Damage')
      }
    })

    if (buffTexts.length > 0) {
      return `${defender} took ${buffTexts.join(', ')}.`
    }
    return ''
  }

  printNewTurn (attack) {
    if (this.state.accounts.length === 0) {
      return
    }

    const attacker = this.state.accounts[attack.attacker].username
    const defender = this.state.accounts[attack.defender].username

    const msg = attack.message
      .replace(/\[attacker\]/g, attacker)
      .replace(/\[defender\]/g, defender)

    return `${msg}`
  }
}
