import './style.scss'
import React from 'react'
import { render } from 'react-dom'
import { Router, Link, browserHistory, Route, IndexRoute } from 'react-router'

const App = React.createClass({
  componentWillMount() {
    this.forceUpdate() // a little hack to help us rerender when this module is reloaded
  },

  render() {
    return (
      <div>
        <Link to='/login'> testatest
        </Link>
        {this.props.children}
      </div>
    )
  }
})

const NotFound = React.createClass({
  render() {
    return <p>
             Page not found
           </p>
  }
})

const Index = React.createClass({
  render() {
    return <p>
             indexatestatestatatest
           </p>
  }
})

const Login = React.createClass({
  render() {
    return <p>
             loginaaaxa
           </p>
  }
})

const routes = (
<Route path='/' component={App}>
  <IndexRoute component={Index} />
  <Route path='login' component={Login} />
  <Route path='*' component={NotFound} />
</Route>
)

class RenderForcer extends React.Component {
  constructor () {
    super()
  }
  componentWillMount () {
    this.forceUpdate() // a little hack to help us rerender when this module is reloaded
  }
  render () {
    return (
      <Router history={browserHistory}>
        {routes}
      </Router>
    )
  }
}

render((
  <RenderForcer />
  ), document.getElementById('root'))
