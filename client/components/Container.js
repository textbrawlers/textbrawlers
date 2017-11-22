import React from 'react'
import styled from 'styled-components'
import styledSystem from 'styled-system'

export const Container = styled.div`
  ${styledSystem.space};
  ${styledSystem.width};
`

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

  ${props =>
    props.itemstretch &&
    `
    align-items: stretch;
  `};
`

export const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
