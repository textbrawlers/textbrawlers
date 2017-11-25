import React from 'react'
import styled from 'styled-components'
import {
  FullContainer,
  Container,
  CenterContainer,
  CenterFlex,
} from './Container.js'
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
import {
  ItemStatTable,
  ItemStatRow,
  ItemStat,
  ItemStatTitle,
} from './ItemStats.js'
import { Item } from './Items.js'

const Inventory = () => (
  <FullContainer>
    <Logo small center />
    <CenterFlex>
      <CenterContainer>
        <CenterContainer row my={10}>
          <Divider vertical fill />
          <CenterContainer>
            <Container>
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
            </Container>
          </CenterContainer>
          <CenterContainer>
            <Container mx={5}>
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
            </Container>
          </CenterContainer>
          <CenterContainer>
            <Container>
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
              <InventorySlot />
            </Container>
          </CenterContainer>
          <Divider vertical fill />
          <InventorySlot stats>
            <ItemStatTitle>Character Name</ItemStatTitle>
            <ItemStatTable>
              <tbody>
                <ItemStatRow>
                  <ItemStat amount>100&nbsp;</ItemStat>
                  <ItemStat>Health</ItemStat>
                </ItemStatRow>
                <ItemStatRow>
                  <ItemStat amount>10%&nbsp;</ItemStat>
                  <ItemStat>Dodge Chance</ItemStat>
                </ItemStatRow>
              </tbody>
            </ItemStatTable>
          </InventorySlot>
          <Divider vertical fill />
          <InventorySlot stats>
            <ItemStatTitle rare>Ripping Sharp Long Sword</ItemStatTitle>
            <ItemStatTable>
              <tbody>
                <ItemStatRow>
                  <ItemStat amount>10&nbsp;</ItemStat>
                  <ItemStat>Damage</ItemStat>
                </ItemStatRow>
                <ItemStatRow>
                  <ItemStat amount>80%&nbsp;</ItemStat>
                  <ItemStat>Hit Chance</ItemStat>
                </ItemStatRow>
                <ItemStatRow>
                  <ItemStat amount>20%&nbsp;</ItemStat>
                  <ItemStat>Bleed Chance</ItemStat>
                </ItemStatRow>
              </tbody>
            </ItemStatTable>
          </InventorySlot>
          <Divider vertical fill />
          <InventorySlot stats>
            <ItemStatTitle uncommon>Sharp Long Sword</ItemStatTitle>
            <ItemStatTable>
              <tbody>
                <ItemStatRow>
                  <ItemStat amount>10&nbsp;</ItemStat>
                  <ItemStat>Damage</ItemStat>
                </ItemStatRow>
                <ItemStatRow>
                  <ItemStat amount>80%&nbsp;</ItemStat>
                  <ItemStat>Hit Chance</ItemStat>
                </ItemStatRow>
              </tbody>
            </ItemStatTable>
          </InventorySlot>
          <Divider vertical fill />
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
  </FullContainer>
)

export default Inventory
