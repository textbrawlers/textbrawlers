import styled from 'styled-components'

const Button = styled.button`
  background-color: #c4c4c4;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 3px 15px;
  border: 1px solid #afafaf;
  border-bottom-width: 2px;

  &:active {
    background: #d4d4d4;
    border-color: #ccc;
  }

  &:focus {
    outline: 1px solid #888;
  }
`

export default Button
