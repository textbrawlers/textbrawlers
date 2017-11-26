import React from 'react'
import PropTypes from 'prop-types'
import {
  StatContainer,
  ItemStatTable,
  ItemStatRow,
  ItemStat,
  ItemStatTitle,
} from './ItemStats.js'

const StatBox = ({ rarity, name }) => (
  <StatContainer>
    <ItemStatTitle rarity={rarity}>{name}</ItemStatTitle>
    <ItemStatTable>
      <tbody>
        <ItemStatRow>
          <ItemStat amount>100&nbsp;</ItemStat>
          <ItemStat>Health</ItemStat>
        </ItemStatRow>
        <ItemStatRow>
          <ItemStat amount>10%&nbsp;</ItemStat>
          <ItemStat>Dodge Chance</ItemStat>
        </ItemStatRow>
      </tbody>
    </ItemStatTable>
  </StatContainer>
)

StatBox.propTypes = {
  rarity: PropTypes.oneOf(['common', 'uncommon', 'rare', 'legendary']),
}

export default StatBox
