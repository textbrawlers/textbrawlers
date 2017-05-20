import React from 'react'
import styled from 'styled-components'
import TextInput from './TextInput.js'
import Button from './Button.js'
import LoadingIndicator from './LoadingIndicator.js'

export const MODE_LOGIN = 'MODE_LOGIN'
export const MODE_REGISTER = 'MODE_REGISTER'

const Label = styled.label`
  display: block;
`

const Row = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const FullWidthTextInput = styled(TextInput)`
  width: 100%;
`

const FormElement = styled.form`
  position: relative;
`

const ErrorText = styled.p`
  color: #f55;
  margin-top: 3px;
`

export default class Form extends React.Component {
  constructor () {
    super()

    this.submit = this.submit.bind(this)
    this.updateUsername = this.updateUsername.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    this.updateRepeatPassword = this.updateRepeatPassword.bind(this)

    this.state = {
      username: '',
      password: '',
      repeatPassword: ''
    }
  }
  render () {
    const { loading, mode = MODE_LOGIN, errors = {} } = this.props

    return (
      <FormElement onSubmit={this.submit}>
        <fieldset disabled={loading}>
          {errors.general && <Row><ErrorText>{errors.general}</ErrorText></Row>}
          <Row>
            <Label htmlFor="username">Username:</Label>
            <FullWidthTextInput
              autoFocus={mode === MODE_LOGIN}
              error={errors.username}
              type="text"
              id="username"
              onInput={this.updateUsername}
            />
            {errors.username && <ErrorText>{errors.username}</ErrorText>}
          </Row>
          <Row>
            <Label htmlFor="password">Password:</Label>
            <FullWidthTextInput
              error={errors.password}
              type="password"
              id="password"
              onInput={this.updatePassword}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </Row>
          {mode === MODE_REGISTER &&
            <Row>
              <Label htmlFor="repeatPassword">Confirm Password:</Label>
              <FullWidthTextInput
                error={errors.repeatPassword}
                type="password"
                id="repeatPassword"
                onInput={this.updateRepeatPassword}
              />
            </Row>}
          {errors.repeatPassword &&
            <ErrorText>{errors.repeatPassword}</ErrorText>}
          <Row>
            <Button type="submit">
              {mode === MODE_LOGIN ? 'Login' : 'Register'}
            </Button>
          </Row>
        </fieldset>
        {loading && <LoadingIndicator />}
      </FormElement>
    )
  }

  submit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  updateUsername (e) {
    this.setState({ username: e.target.value })
  }

  updatePassword (e) {
    this.setState({ password: e.target.value })
  }

  updateRepeatPassword (e) {
    this.setState({ repeatPassword: e.target.value })
  }
}

