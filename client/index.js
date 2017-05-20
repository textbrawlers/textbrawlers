import { module } from '@hot'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import GameInterface from 'client/components/GameInterface.js'
import {
  AuthenticatedRoute
} from 'client/components/container/AuthenticatedComponent.js'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import HomePage from 'client/components/HomePage.js'
import createStore from 'client/store/createStore.js'
import NotFound from 'client/components/NotFound.js'
import Inventory from 'client/components/Inventory.js'

export const history = module ? module.history : createHistory()
export const store = module ? module.store : createStore(history)

const PVE = () => <div>PVE</div>

const rootContainer = document.getElementById('root')

const Game = () => (
  <GameInterface>
    <Switch>
      <Route path="/game/inventory" component={Inventory} />
      <Route path="/game/start-fight/pve" component={PVE} />
      <Redirect exact from="/game" to="/game/inventory" />
      <Route path="*" component={NotFound} />
    </Switch>
  </GameInterface>
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthenticatedRoute path="/game" component={Game} />
        <Route path="*" component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  rootContainer
)

export function __unload () {
  ReactDOM.unmountComponentAtNode(rootContainer)
}

