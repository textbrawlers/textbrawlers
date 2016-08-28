import React, { Component } from 'react'
import * as Common from 'common/api/common.js'

export default class ItemTooltip extends Component {
  render () {
    const item = this.props.item

    const characterStats = item.characterStats.getStats().map((stat, i) => {
      const statTooltip = stat.render((stat, i) => `<b>${stat}</b>`)
      return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    const attackStats = item.attackStats.getStats().map((stat, i) => {
      const statTooltip = stat.render(stat => `<b>${stat}</b>`)
      return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
    })

    let characterStatsDiv
    if (!item.characterStats.isEmpty()) {
      characterStatsDiv = (
        <div>
          <p>
            Character:
          </p>
          {characterStats}
        </div>
      )
    }

    let attackStatsDiv
    if (!item.attackStats.isEmpty()) {
      attackStatsDiv = (
        <div>
          <p>
            Attack:
          </p>
          {attackStats}
        </div>
      )
    }

    let description
    if (item.description) {
      description = (
        <div className='description'>
          {item.description}
        </div>
      )
    }

    const empowerStats = this.getEmpowerStats(item)

    return (
      <div className='tooltip'>
        <h2 className={`rarity-${item.rarity}`}>{item.displayName}</h2>
        {attackStatsDiv}
        {characterStatsDiv}
        {empowerStats}
        {description}
      </div>
    )
  }

  getEmpowerStats (item) {
    return item.empoweredStats.map((conf, i) => {
      const stats = conf.stats.getStats().map((stat, i) => {
        const statTooltip = stat.render(stat => `<b>${stat}</b>`)
        return <p key={i} dangerouslySetInnerHTML={{__html: statTooltip}}></p>
      })

      let empowerCategory = ' ' + Common.capitalizeFirstLetter(conf.category)

      return (
        <div key={i}>
          <p>
            Empowers
            {empowerCategory}:
          </p>
          {stats}
        </div>
      )
    })
  }

}
