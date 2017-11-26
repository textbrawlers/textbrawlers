import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// prettier-ignore
export const OuterFulhacker = styled.div`
  position: absolute;
  ${props => props.side === 'right' && 'right: 0px;'}
  ${props => props.side === 'left' && 'left: 0px;'}
  top: 0px;
  width: 0;
  height: 100%;
`

// prettier-ignore
export const InnerFulhacker = styled.div`
  position: absolute;
  ${props => props.side === 'left' && 'right: 0px;'}
  display: flex;
  align-items: center;
  height: 100%;
`

const ZeroSize = styled.div`
  width: 0;
  height: 0;
`

const Fulhacker = ({ children, side }) => (
  <OuterFulhacker side={side}>
    <ZeroSize>
      <InnerFulhacker side={side}>{children}</InnerFulhacker>
    </ZeroSize>
  </OuterFulhacker>
)

Fulhacker.propTypes = {
  children: PropTypes.element.isRequired,
  side: PropTypes.oneOf(['right', 'left']).isRequired,
}

export default Fulhacker
