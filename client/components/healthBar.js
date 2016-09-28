import React, { Component } from 'react'

export default class HealthBar extends Component {
  render () {
    const maxHealth = this.props.healthData.maxHP
    const currHealth = this.props.healthData.currentHP

    const barFillAmount = Math.floor((currHealth/maxHealth) * 100)

    return (
      <div>
        <div style={{
          backgroundColor: '#F00',
          height: '5px',
          width: '100%'
        }}>
          <div style={{
            backgroundColor: '#F00',
            height: '5px',
            width: barFillAmount + '%'
          }}>
          </div>
        </div>
        <br />
        `${currHealth}/${maxHealth}`
      </div>
    )
  }
}
