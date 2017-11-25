import React from 'react'
import styled from 'styled-components'
import { FullContainer, CenterContainer, CenterFlex } from './Container.js'
import { Button, LinkButton } from './Button.js'
import Text from './Text.js'
import Textbox from './Textbox.js'
import Fulhacker from './Fulhacker.js'
import { Divider, Spacer } from './Divider.js'
import Logo from './Logo.js'

const SignUp = () => (
  <FullContainer>
    <CenterFlex>
      <CenterContainer>
        <Logo />
        <Spacer />
        <Textbox placeholder="Email" />
        <Textbox placeholder="Username" />
        <Textbox type="password" placeholder="Password" />
        <Textbox type="password" placeholder="Confirm Password" />
        <Button>Sign Up</Button>
        <Divider />
        <LinkButton to="/signin">Sign In</LinkButton>
        <Divider />
        <Button>Play as Guest</Button>
        <Text faded small>
          Your progress will only be saved locally
        </Text>
      </CenterContainer>
    </CenterFlex>
  </FullContainer>
)

export default SignUp
