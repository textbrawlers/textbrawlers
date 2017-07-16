import React from 'react'
import { connect } from 'react-redux'
import InventoryTab from 'client/components/InventoryTab.js'

const MyInventoryTab = () => {
  const items = []
  for (let i = 0; i < 40; i++) {
    items.push(undefined)
  }
  return <InventoryTab items={items} />
}

export default connect()(MyInventoryTab)
