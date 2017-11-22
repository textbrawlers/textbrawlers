import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

const SideBar = styled.div`
  height: 100%;
  width: 10px;
  background: f2f2f2;
  padding: 20px 10px;
  border-right: 1px solid ${lighten(0.7, '#000000')};
`

export default SideBar
