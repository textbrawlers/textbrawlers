import React from 'react'
import { FullContainer, CenterContainer, CenterFlex } from './Container.js'
import Fulhacker from './Fulhacker.js'
import { Divider } from './Divider.js'
import Logo from './Logo.js'
import { FriendContainer, Friend, FriendStatus } from './Friend.js'
import InventoryGrid from './InventoryGrid.js'
import StatBox from './StatBox.js'
import styled from 'styled-components'

// Placeholder stats

const OffensiveItems = styled.div`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  // 2 weaponboxes including dividers
  max-width: ${(200 + 35 + 1 + 35) * 2};
`

const Inventory = () => (
  <FullContainer>
    <Logo small center />
    <CenterFlex>
      <CenterContainer>
        <CenterContainer row my={10}>
          <Divider vertical fill />
          <InventoryGrid width={3} height={4} margin={5} />
          <Divider vertical fill />
          <StatBox name="SkevskjutarN" />
          <Divider vertical fill />
          <OffensiveItems>
            <StatBox rarity="rare" name="Ripping Sharp Long Sword" />
            <Divider vertical fill />

            <StatBox rarity="uncommon" name="Sharp Long Sword" />
            <Divider vertical fill />

            <StatBox rarity="common" name="Sharp Long Sword" />
            <Divider vertical fill />

            <StatBox rarity="legendary" name="Sharp Long Sword" />
            <Divider vertical fill />
          </OffensiveItems>
        </CenterContainer>
        <Divider />
        <InventoryGrid width={16} height={4} />
        <Fulhacker side="right">
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
        <Fulhacker side="left">
          <CenterContainer row>
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
            <Divider vertical fill />
          </CenterContainer>
        </Fulhacker>
      </CenterContainer>
    </CenterFlex>
  </FullContainer>
)

export default Inventory
