import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route } from 'react-router'

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname
        const url = `/?continue=${encodeURIComponent(redirectAfterLogin)}`
        this.props.dispatch(push(url))
      }
    }

    render() {
      return (
        <div>{this.props.isAuthenticated && <Component {...this.props} />}</div>
      )
    }
  }

  const mapStateToProps = state => ({
    location: state.router.location,
    isAuthenticated: !!state.user,
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}

export function AuthenticatedRoute({ component: Component, ...rest }) {
  const RequireAuthComponent = requireAuthentication(Component)
  return (
    <Route {...rest}>
      <RequireAuthComponent />
    </Route>
  )
}
