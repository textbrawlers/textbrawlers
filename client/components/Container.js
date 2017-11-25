import React from 'react'
import styled from 'styled-components'
import styledSystem from 'styled-system'

export const FullContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 100%;
`

export const Container = styled.div`
  ${styledSystem.space};
  ${styledSystem.width};
`

export const CenterContainer = styled.div`
  ${styledSystem.space};
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
  flex: 1;
`
