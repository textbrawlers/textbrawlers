import { css } from 'styled-components'

const breakpoints = {
  small: '576px',
  medium: '768px',
  large: '1200px'
}

export const media = {
  ltSmall: arg => css`
    @media (max-width: ${breakpoints.small}) {
      ${css(arg)}
    }
  `,
  ltMedium: arg => css`
    @media (max-width: ${breakpoints.medium}) {
      ${css(arg)}
    }
  `,
  ltLarge: arg => css`
    @media (max-width: ${breakpoints.large}) {
      ${css(arg)}
    }
  `
}

