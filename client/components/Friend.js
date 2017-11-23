import React from 'react'
import styled from 'styled-components'

export const FriendContainer = styled.div`
  margin: 10px 0px;
  padding: 10px;
  background: orange;
  display: flex;
  flex-direction: row;
  background: rgb(198, 156, 109);
`
export const Friend = styled.div`flex: 1;`

export const FriendStatus = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 0 0 8px;
  border-radius: 32px;
  background: #f2f2f2;

  ${props =>
    props.online &&
    `
    background: green;
`};
`
