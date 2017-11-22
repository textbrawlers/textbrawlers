import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`width: 100%;`

export const CenterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${props =>
    props.row &&
    `
    flex-direction: row;
`};
`

export const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
