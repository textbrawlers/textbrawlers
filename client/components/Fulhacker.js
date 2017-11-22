import React from 'react'
import styled from 'styled-components'

export const OuterFulhacker = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 0;
  height: 100%;
`

export const InnerFulhacker = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
`

const Fulhacker = ({children}) => <OuterFulhacker>
  <InnerFulhacker>
    {children}
  </InnerFulhacker>
</OuterFulhacker>

export default Fulhacker
