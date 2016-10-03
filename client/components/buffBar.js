import React, { Component } from 'react'
import buffConfig from 'common/json/dotcfg.json'

export default class BuffBar extends Component {
  render () {
    const buffs = this.props.buffs.reduce((newArr, buff) => {
      buff.stacks = buff.stacks || 1
      const exisiting = newArr.find(b => b.type === buff.type)
      if (exisiting) {
        exisiting.stacks++
        return newArr
      }
      return newArr.concat(Object.assign({}, buff))
    }, [])

    const buffList = buffs.map((buff, i) => {
      const b = buffConfig[buff.type]

      return (
        <div key={i} title={b.name} style={{display: 'inline-block'}}>
          {buff.stacks > 1 && <span>{buff.stacks}x</span>}
          <img src={`/client/png/${b.image}`} />
        </div>
      )
    })
    return <div>{buffList}</div>
  }
}
