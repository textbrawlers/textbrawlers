import React from 'react'
import styled from 'styled-components'

export const FightLogContainer = styled.div`
  width: 600px;
  background: red;
  height: 400px;
  display: flex;
  flex-direction: column;
  flex-align: stretch;
`

export const FightLogEvent = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin: 10px 0;
`

export const FightLogMarker = styled.div`
  margin: 0 10px 0 0;
  width: 6px;
  background: green;
`
