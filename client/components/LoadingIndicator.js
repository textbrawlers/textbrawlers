import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform: rotateZ(45deg);
  }
  to {
    transform: rotateZ(135deg);
  }
`

const LoadingIndicatorContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, .5);
  animation: linear ${spin} .5s infinite;
`

const LoadingIndicator = () => (
  <LoadingIndicatorContainer>
    <Spinner />
  </LoadingIndicatorContainer>
)

export default LoadingIndicator

