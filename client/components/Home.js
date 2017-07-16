import React from 'react'
import PageContainer from './PageContainer.js'
import LoginForm from 'client/containers/LoginForm.js'
import RegisterForm from 'client/containers/RegisterForm.js'
import { Box, BoxHeader, BoxContent, OuterBox, BoxBanner } from './Box.js'
import Logo from './Logo.js'
import { InlineLink } from 'client/components/UI/InlineLink.js'

const Home = ({ user }) => (
  <PageContainer>
    <Logo src="/client/img/textbrawlers.png" />
    {user && (
      <BoxBanner>
        You are already logged in as {user.username}.{' '}
        <InlineLink to="/game">Click here</InlineLink> to continue to the game.
      </BoxBanner>
    )}
    <OuterBox>
      <Box>
        <BoxHeader>Login</BoxHeader>
        <BoxContent>
          <LoginForm />
        </BoxContent>
      </Box>
      <Box>
        <BoxHeader>Register</BoxHeader>
        <BoxContent>
          <RegisterForm />
        </BoxContent>
      </Box>
      <Box>
        <BoxHeader>Play as Guest</BoxHeader>
        <BoxContent />
      </Box>
    </OuterBox>
  </PageContainer>
)
export default Home
