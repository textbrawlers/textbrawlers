import React from 'react'
import { render } from 'react-dom'
import { Router, Link, browserHistory, Route, IndexRoute } from 'react-router'
import App from './components/app.js'
import LoginPage from './components/loginPage.js'
import RegisterPage from './components/registerPage.js'

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
             indexatestatestatatesta
           </p>
  }
})

const routes = (
<Route path='/' component={App}>
  <IndexRoute component={Index} />
  <Route path='login' component={LoginPage} />
  <Route path='register' component={RegisterPage} />
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
