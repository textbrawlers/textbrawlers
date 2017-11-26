import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

export const FightLogContainer = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  flex-align: stretch;
`

export const FightLogEventContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  border-bottom: 1px solid ${darken(0.15, 'rgb(0, 255, 0)')};
  color: #1a1a1a;
  &:not(:first-child) {
    margin-top: 20px;
  }

  ${props =>
    props.enemy &&
    `
    justify-content: flex-end;
    border-bottom: 1px solid ${darken(0.05, 'rgb(255, 0, 0)')};
`};
`

export const FightLogEvent = styled.div`
  align-self: center;
  font-size: 16px;
  margin: 5px 0;

  ${props =>
    props.enemy &&
    `
    text-align: right;
`};
`

export const FightLogMarker = styled.div`
  align-self: stretch;
  margin: 0 10px 0 0;
  height: initial;
  width: 4px;
  background: ${darken(0.15, 'rgb(0, 255, 0)')};
  flex-shrink: 0;

  ${props =>
    props.enemy &&
    `
    margin: 0 0 0 10px;
    background: ${darken(0.05, 'rgb(255, 0, 0)')};
`};
`
