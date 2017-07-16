import styled from 'styled-components'

const TextInput = styled.input`
  background: #f5f5f5;
  border: 1px solid;
  padding: 3px;

  border-color: ${props => (props.error ? '#f55' : '#555')};

  &:focus {
    outline: 1px solid #888;
  }
`

export default TextInput
