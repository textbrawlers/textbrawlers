import React from 'react'
import styled from 'styled-components'
import { Container, CenterContainer, CenterFlex } from './Container.js'
import { Button } from './Button.js'
import Text from './Text.js'
import Textbox from './Textbox.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'
import TopBar from './TopBar'
import SideBar from './SideBar'
import InventorySlot from './InventorySlot.js'
import { FriendContainer, Friend, FriendStatus } from './Friend.js'
import { ItemStatRow, ItemStat } from './ItemStats.js'

const Inventory = () => (
  <Container>
    <Logo small center />
    <CenterFlex>
      <CenterContainer>
        <CenterContainer row>
          <CenterContainer>
            <Container m={5}>
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
            </Container>
          </CenterContainer>
          <Spacer vertical vfat />
          <InventorySlot stats>
            <ItemStat />
          </InventorySlot>
          <Divider vertical fill />
          <InventorySlot stats>
            <table>
              <ItemStatRow>
                <ItemStat>10&nbsp;</ItemStat>
                <ItemStat>Damage</ItemStat>
              </ItemStatRow>
              <ItemStatRow>
                <ItemStat>0.8&nbsp;</ItemStat>
                <ItemStat>Hit Chance</ItemStat>
              </ItemStatRow>
            </table>
          </InventorySlot>
        </CenterContainer>
        <Divider />
        <InventorySlot cluster />
        <Fulhacker>
          <CenterContainer row>
            <Divider vertical fill />
            <CenterContainer itemstretch>
              <FriendContainer>
                <Friend>Ineentho</Friend>
                <FriendStatus online />
              </FriendContainer>
              <FriendContainer>
                <Friend>KofoteN</Friend>
                <FriendStatus online />
              </FriendContainer>
              <FriendContainer>
                <Friend>Nicke535</Friend>
                <FriendStatus />
              </FriendContainer>
            </CenterContainer>
          </CenterContainer>
        </Fulhacker>
      </CenterContainer>
    </CenterFlex>
  </Container>
)

export default Inventory
