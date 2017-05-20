import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { media } from 'client/util/styleUtils.js'
import Logo from './Logo.js'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;

  ${media.ltLarge`
    display: block;
  `}
`

const TitleBar = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  background: red;
`

const GameArea = styled.div`
  grid-column: 2;
  grid-row: 2;
  background: yellow;

  display: flex;
  justify-content: center;
`

const Menu = styled.div`
  grid-column: 1;
  grid-row: 2;
`

const MenuSection = styled.div`
  margin-bottom: 10px;
`

const MenuItem = styled(Link)`
  padding: 5px;
  background: #ccc;
  margin-bottom: 2px;
  display: block;
`

const MenuHeader = styled.div`
  font-weight: bold;
`

const GameInterface = props => (
  <Grid>
    <TitleBar>
      <Link to="/game/inventory">
        <Logo src="/client/img/textbrawlers.png" />
      </Link>
    </TitleBar>
    <GameArea>
      {props.children}
    </GameArea>
    <Menu>
      <MenuSection>
        <MenuHeader>Section</MenuHeader>
        <MenuItem to="/game/a">Item</MenuItem>
        <MenuItem to="/game/b">Item</MenuItem>
      </MenuSection>
    </Menu>
  </Grid>
)

export default GameInterface

