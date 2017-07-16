import React from 'react'
import PageContainer from './PageContainer.js'
import LoginForm from './container/LoginForm.js'
import RegisterForm from './container/RegisterForm.js'
import { Box, BoxHeader, BoxContent, OuterBox } from './Box.js'
import Logo from './Logo.js'

const HomePage = () =>
  <PageContainer>
    <Logo src="/client/img/textbrawlers.png" />
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

export default HomePage
