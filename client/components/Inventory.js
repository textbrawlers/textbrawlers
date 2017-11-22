import React from 'react'
import styled from 'styled-components'
import { Container, CenterContainer, CenterFlex } from './Container.js'
import Button from './Button.js'
import Text from './Text.js'
import Textbox from './Textbox.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'
import TopBar from './TopBar'
import SideBar from './SideBar'
import InventorySlot from './InventorySlot.js'

const Inventory = () => (
  <Container>
    <Logo small center />
    <CenterFlex>
      <CenterContainer>
        <CenterContainer row>
          <CenterContainer>
            <InventorySlot />
            <InventorySlot />
            <InventorySlot />
            <InventorySlot />
          </CenterContainer>
          <Spacer vertical />
          <InventorySlot stats />
          <Divider vertical />
        </CenterContainer>
        <Divider />
        <InventorySlot cluster />
      </CenterContainer>
    </CenterFlex>
  </Container>
)

export default Inventory
