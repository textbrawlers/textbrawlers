import styled from 'styled-components'
import { lighten } from 'polished'
import styledSystem from 'styled-system'

// prettier-ignore
const InventorySlot = styled.div`
  width: 50px;
  height: 50px;
  background: ${lighten(0.1, 'rgb(198, 156, 109)')};
  border: 2px solid rgb(198, 156, 109);

  ${styledSystem.space}

  ${props => props.cluster && `
    width: 950px;
    height: 250px;
    margin: 10px 0;
    background: rgb(198, 156, 109);
    border: none;
  `};
`

export default InventorySlot
