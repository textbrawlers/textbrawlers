import React, { Component } from 'react'

export default class HealthBar extends Component {
  render () {
    const maxHealth = this.props.healthData.maxHP
    const currHealth = this.props.healthData.currentHP

    const barFillAmount = Math.max((currHealth / maxHealth) * 100, 0)

    return (
      <div>
        <div style={{
          background: 'url(/client/png/hpdepleted.png)',
          height: '28px',
          width: '100%',
          position: 'relative'
        }}>
          <div style={{
            background: 'url(/client/png/hpfull.png)',
            height: '28px',
            width: barFillAmount + '%',
            position: 'absolute',
            left: 0,
            top: 0
          }} />
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            lineHeight: '28px',
            color: 'white',
            textAlign: 'center'
          }}>
            {`${currHealth}/${maxHealth}`}
          <div style={{
            background: 'url(/client/png/hpborder.png)',
            height: '28px',
            width: '100%',
            position: 'absolute',
            left: 0,
            top: 0
          }} />
          </div>
        </div>
      </div>
    )
  }
}
