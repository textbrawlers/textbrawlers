import React from 'react'
import styled from 'styled-components'

export const Item = styled.div`
  height: 50px;
  width: 50px;

  ${props =>
    props.common &&
    `
    background:#cacaca;
`};

  ${props =>
    props.uncommon &&
    `
    background: rgb(107, 198, 70);
`};

  ${props =>
    props.rare &&
    `
    background: rgb(109, 149, 188);
`};

  ${props =>
    props.legendary &&
    `
    background: rgb(173, 119, 198);
`};
`
