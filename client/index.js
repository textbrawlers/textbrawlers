import { module } from '@hot'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import { Provider } from 'react-redux'

import { Route, Redirect } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'

import HomePage from 'client/components/HomePage.js'

import createStore from 'client/store/createStore.js'

export const history = module ? module.history : createHistory()

const store = createStore(history)

const About = () => <div>About</div>

const rootContainer = document.getElementById('root')

const isAuthenticated = () => {
  return store.getState().user
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/' }} />}
  />
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div style={{ height: '100%' }}>
        <Route exact path="/" component={HomePage} />
        <Route path="/game/">
          {isAuthenticated()
            ? <Route path="/" component={About} />
            : <Redirect to={{ pathname: '/' }} />}
        </Route>
      </div>
    </ConnectedRouter>
  </Provider>,
  rootContainer
)

export function __unload () {
  ReactDOM.unmountComponentAtNode(rootContainer)
}

