import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

export const FriendContainer = styled.button`
  margin: 0 5px;
  padding: 10px;
  background: orange;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: ${lighten(0.1, '#000000')};
  background: rgb(198, 156, 109);
  border: none;
  white-space: nowrap;
  &:not(:first-child) {
    margin: 20px 5px 0 5px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${darken(0.1, 'rgb(198, 156, 109)')};
  }

  &:active {
    background: ${darken(0.2, 'rgb(198, 156, 109)')};
  }
`
export const Friend = styled.div`
  flex: 1;
  font-size: 16px;
`

export const FriendStatus = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 0 0 8px;
  border-radius: 32px;
  background: #f2f2f2;

  ${props =>
    props.online &&
    `
    background: rgb(0, 175, 0);
`};
`
