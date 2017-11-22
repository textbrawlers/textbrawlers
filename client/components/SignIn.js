import React from 'react'
import styled from 'styled-components'
import { CenterContainer, CenterFlex } from './Container.js'
import Button from './Button.js'
import Text from './Text.js'
import Textbox from './Textbox.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'

const SignIn = () => (
  <CenterFlex>
    <CenterContainer>
      <Logo />
      <Spacer />
      <Textbox placeholder="Email or Username" />
      <Textbox type="password" placeholder="Password" />
      <Button>Sign In</Button>
      <Divider />
      <Button>Sign Up</Button>
      <Divider />
      <Button>Play as Guest</Button>
      <Text faded small>
        Your progress will only be saved locally
      </Text>
    </CenterContainer>
  </CenterFlex>
)

export default SignIn
