import { module } from '@hot'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import GameInterface from 'client/components/GameInterface.js'
import { AuthenticatedRoute } from 'client/containers/AuthenticatedComponent.js'
import { Provider } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import HomePage from 'client/containers/HomePage.js'
import createStore from 'client/store/createStore.js'
import NotFound from 'client/components/NotFound.js'
import InventoryPage from 'client/components/InventoryPage.js'
import GlobalLoadingIndicator from 'client/containers/GlobalLoadingIndicator'
import { tryRestoreSession } from 'client/network/session.js'
import { startGlobalLoading, stopGlobalLoading } from 'client/actions/global.js'

export const history = module ? module.history : createHistory()
export const store = module ? module.store : createStore(history)

// Don't try to sign in again if hot-reloading
if (!module) {
  store.dispatch(startGlobalLoading())
  tryRestoreSession(store).then(() => {
    store.dispatch(stopGlobalLoading())
  })
}

const PVE = () => <div>PVE</div>

const rootContainer = document.getElementById('root')

const Game = () => (
  <GameInterface>
    <Switch>
      <Route path="/game/inventory" component={InventoryPage} />
      <Route path="/game/start-fight/pve" component={PVE} />
      <Redirect exact from="/game" to="/game/inventory" />
      <Route path="*" component={NotFound} />
    </Switch>
  </GameInterface>
)

ReactDOM.render(
  <Provider store={store}>
    <GlobalLoadingIndicator>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthenticatedRoute path="/game" component={Game} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </GlobalLoadingIndicator>
  </Provider>,
  rootContainer,
)

export function __unload() {
  ReactDOM.unmountComponentAtNode(rootContainer)
}
