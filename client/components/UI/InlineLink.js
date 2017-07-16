import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const InlineLink = styled(Link)`
  display: inline;
  color: #0056ff;
  text-decoration: underline;

  &:hover {
    color: #0027ff;
  }
`
