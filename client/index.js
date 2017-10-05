import { module } from '@hot'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createStore from 'client/store/createStore.js'
import { tryRestoreSession } from 'client/network/session.js'
import { startGlobalLoading, stopGlobalLoading } from 'client/actions/global.js'
import Routes from 'client/components/Routes.js'

export const history = module ? module.history : createHistory()
export const store = module ? module.store : createStore(history)

// Don't try to sign in again if hot-reloading
if (!module) {
  store.dispatch(startGlobalLoading())
  tryRestoreSession(store).then(() => {
    store.dispatch(stopGlobalLoading())
  })
}

const rootContainer = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  rootContainer,
)

export function __unload() {
  ReactDOM.unmountComponentAtNode(rootContainer)
}
