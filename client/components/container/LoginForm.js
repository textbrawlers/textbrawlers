import React from 'react'
import Form, { MODE_LOGIN } from '../Form.js'
import request from 'client/network/request.js'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { storeKey } from 'client/network/session.js'
import { setUser } from 'client/store/actions.js'
import querystring from 'querystring'

const createErrorMap = errors =>
  errors.reduce(
    (obj, { field, message }) => Object.assign(obj, { [field]: message }),
    {},
  )

class LoginForm extends React.Component {
  constructor() {
    super()

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {}
  }
  render() {
    const { loading, errors } = this.state
    return (
      <Form
        mode={MODE_LOGIN}
        onSubmit={this.onSubmit}
        loading={loading}
        errors={errors}
      />
    )
  }

  async onSubmit({ username, password }) {
    let errors = []
    if (username.length < 1) {
      errors.push({ field: 'username', message: 'Please enter a username' })
    }

    if (password.length < 1) {
      errors.push({ field: 'password', message: 'Please enter a password' })
    }

    if (errors.length > 0) {
      this.setState({ errors: createErrorMap(errors) })
      return
    }

    this.setState({ errors: {}, loading: true })

    try {
      await this.sendNetworkRequest({ username, password })
    } catch (err) {
      console.error(err)
      this.setState({ loading: false, errors: { general: 'Network error' } })
    }
  }

  async sendNetworkRequest({ username, password }) {
    const { errors, key, user } = await request.post('/api/user/login', {
      username,
      password,
    })

    this.setState({ loading: false })

    if (errors) {
      this.setState({ errors: createErrorMap(errors) })
    } else {
      user.key = key
      this.props.dispatch(setUser(user))
      const query = querystring.parse(this.props.location.search.substr(1))
      this.props.dispatch(push(query.continue || '/game/'))
      storeKey(key)
    }
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
})

export default connect(mapStateToProps)(LoginForm)
