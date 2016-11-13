import React, { Component } from 'react'
import 'client/css/pageinventory.scss'
import Equipped from './equipped.js'
import Inventory from './inventory.js'

export default class Game extends Component {

  render () {
    return (
      <div className='tb-pageinventory'>
        <Equipped />
        <Inventory />
      </div>
    )
  }
}
