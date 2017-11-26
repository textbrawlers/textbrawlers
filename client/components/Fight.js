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
import { FightLogContainer, FightLogEvent, FightLogMarker } from './FightLog.js'

const Fight = () => (
  <FullContainer>
    <Logo small center />

    <CenterFlex>
      <CenterContainer row>
        <Divider vertical fill />
        <FightLogContainer>
          <FightLogEvent self>
            <FightLogMarker />StenfiskeN got analklåda
          </FightLogEvent>
        </FightLogContainer>
        <Divider vertical fill />
      </CenterContainer>
    </CenterFlex>
  </FullContainer>
)

export default Fight
