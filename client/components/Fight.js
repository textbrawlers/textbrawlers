import React from 'react'
import styled from 'styled-components'
import {
  FullContainer,
  Container,
  CenterContainer,
  CenterFlex,
} from './Container.js'
import { Button } from './Button.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'
import InventorySlot from './InventorySlot.js'
import { Item } from './Items.js'
import {
  FightLogContainer,
  FightLogEventContainer,
  FightLogEvent,
  FightLogMarker,
} from './FightLog.js'

const Fight = () => (
  <FullContainer>
    <Logo small center />

    <CenterFlex>
      <CenterContainer row>
        <Divider vertical fill />
        <FightLogContainer>
          <FightLogEventContainer>
            <FightLogMarker />
            <FightLogEvent self>StenfiskeN got analklåda</FightLogEvent>
          </FightLogEventContainer>
          <FightLogEventContainer enemy>
            <FightLogEvent enemy>
              Ineentho got analklåda and released a horde of camels to attack
              his opponent in spite of the prophecy
            </FightLogEvent>
            <FightLogMarker enemy />
          </FightLogEventContainer>
        </FightLogContainer>

        <Divider vertical fill />
      </CenterContainer>
    </CenterFlex>
  </FullContainer>
)

export default Fight
