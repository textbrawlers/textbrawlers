import { module } from '@hot'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import {
  requireAuthentication
} from 'client/components/container/AuthenticatedComponent.js'

import { Provider } from 'react-redux'

import { Route, Redirect, Switch } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'

import HomePage from 'client/components/HomePage.js'

import createStore from 'client/store/createStore.js'

export const history = module ? module.history : createHistory()

const store = createStore(history)

const About = () => <div>About</div>
const ErrorPage = () => <div>404</div>

const rootContainer = document.getElementById('root')

const isAuthenticated = () => {
  return store.getState().user
}

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const RequireAuthComponent = requireAuthentication(Component)
  return (
    <Route {...rest}>
      <RequireAuthComponent />
    </Route>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthenticatedRoute path="/game/inventory" component={About} />
        <Redirect from="/game" to="/game/inventory" />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  rootContainer
)

export function __unload () {
  ReactDOM.unmountComponentAtNode(rootContainer)
}

