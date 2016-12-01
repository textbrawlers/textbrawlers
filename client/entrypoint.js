import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, IndexRoute, IndexRedirect } from 'react-router'
import HomepageApp from './components/homepageApp.js'
import ToolsApp from './components/toolsApp.js'
import Game from './components/game.js'
import GameIndex from './components/gameIndex.js'
import NPCFightSelection from './components/npcFightSelection.js'
import Fight from './components/fight.js'
import ItemDetails from './components/itemDetails.js'
import Scoreboard from './components/scoreboard.js'
import ItemBrowser from './components/tools/itemBrowser.js'
import ItemGen from './components/tools/itemGen.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import 'client/css/common.scss'
import 'client/css/global.scss'
import getItems from 'common/items/items.js'
import getPrefixes from 'common/items/prefixes.js'
import EloCalculator from './components/tools/eloCalculator.js'
import Interface from './components/interface.js'
import PageInventory from './components/pageInventory.js'
import PageFight from './components/pageFight.js'
import { Provider } from 'react-redux'
import createStore from './store/createStore.js'
import { fetchInventory } from './store/actions.js'
import Item from 'common/game/item.js'

const NotFound = () => (
  <center>
    <h1>404</h1><br />
    <p>Page not found</p><br />
    <iframe title='BRAINPOWER' width='420' height='315' src='https://www.youtube.com/embed/h-mUGj41hWA?autoplay=1&start=11' frameborder='0' allowfullscreen />
  </center>
)

const store = createStore()

store.subscribe(() => {
  console.log('store update', store.getState())
})

store.dispatch({
  type: 'TEST'
})

const routes = (
  <Route path='/'>
    <IndexRoute component={HomepageApp} />
    <Route path='game' component={Game}>
      <IndexRoute component={GameIndex} />
      <Route path='fight' component={NPCFightSelection} />
      <Route path='fight/:fightId' component={Fight} />
      <Route path='item/:itemId' component={ItemDetails} />
      <Route path='scoreboard' component={Scoreboard} />
    </Route>
    <Route path='game2' component={Interface}>
      <IndexRedirect to='inventory' />
      <Route path='inventory' component={PageInventory} />
      <Route path='fight' component={PageFight} />
    </Route>
    <Route path='tools' component={ToolsApp}>
      <Route path='itembrowser' component={ItemBrowser} />
      <Route path='itemgen' component={ItemGen} />
      <Route path='elocalculator' component={EloCalculator} />
    </Route>
    <Route path='*' component={NotFound} />
  </Route>
  )

class RenderForcer extends React.Component {
  componentWillMount () {
    this.forceUpdate() // a little hack to help us rerender when this module is reloaded
  }
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    )
  }
}

const WrappedRenderForcer = DragDropContext(HTML5Backend)(RenderForcer)

Promise.all([
  getItems(),
  getPrefixes(),
  Item.loadPromise
]).then(() => {
  console.log('Loaded initial items & prefixes')
  store.dispatch((fetchInventory('me')))

  render((
    <WrappedRenderForcer />
  ), document.getElementById('root'))
}).catch(err => console.error(err.stack || err))

loadWebfont()

function loadWebfont () {
  window.WebFontConfig = {
    google: { families: [ 'Roboto::latin' ] }
  }

  const wf = document.createElement('script')
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
  wf.type = 'text/javascript'
  wf.async = 'true'

  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(wf, s)
}
