import React from 'react'
import MyInventoryTab from 'client/components/container/MyInventoryTab.js'

const InventoryPage = () =>
  <div>
    <MyInventoryTab items={[1, 2, 3]} tab={0} />
  </div>

export default InventoryPage
