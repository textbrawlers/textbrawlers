import React from 'react'
import styled from 'styled-components'

const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 100px;
`

const NotFound = () => <Outer>404</Outer>

export default NotFound
