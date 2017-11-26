import styled from 'styled-components'

const rarityColors = {
  common: '#cacaca',
  uncommon: 'rgb(107, 198, 70)',
  rare: 'rgb(109, 149, 188)',
  legendary: 'rgb(173, 119, 198)',
}

const getRarityColor = name => rarityColors[name] || 'rgb(198, 156, 109)'

export const ItemStatTable = styled.table`
  margin: 0 5px;
`

export const ItemStatRow = styled.tr`
  color: #1a1a1a;
`

// prettier-ignore
export const ItemStat = styled.td`
  font-size: 16px;
  padding: ;
  text-align: right;
  &:nth-child(even) {
    text-align: left;
  }

  ${props => props.amount && `
    font-weight:bold;
`};
`

// prettier-ignore
export const ItemStatTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  padding: 3px;
  margin: 0px 0px 5px 0px;
  width: 200px;
  flex-direction: column;
  text-align: center;
  align-items: center;
  background: ${props => getRarityColor(props.rarity)};
`

export const StatContainer = styled.div`
  border: none;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 200px;
  background: none;
  font-size: 16px;
`
