import React from 'react'
import styled from 'styled-components'
import { FullContainer, CenterContainer, CenterFlex } from './Container.js'
import { Button, LinkButton } from './Button.js'
import Text from './Text.js'
import Textbox from './Textbox.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'

const SignIn = () => (
  <FullContainer>
    <CenterFlex>
      <CenterContainer>
        <Logo />
        <Spacer />
        <Textbox placeholder="Email or Username" />
        <Textbox type="password" placeholder="Password" />
        <Button>Sign In</Button>
        <Divider />
        <LinkButton to="/signup">Sign Up</LinkButton>
        <Divider />
        <Button>Play as Guest</Button>
        <Text faded small>
          Your progress will only be saved locally
        </Text>
      </CenterContainer>
    </CenterFlex>
  </FullContainer>
)

export default SignIn
