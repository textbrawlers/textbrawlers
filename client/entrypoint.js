import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, IndexRoute } from 'react-router'
import LoginApp from './components/loginApp.js'
import OutlineApp from './components/outlineApp.js'
import ToolsApp from './components/toolsApp.js'
import Game from './components/game.js'
import GameIndex from './components/gameIndex.js'
import ItemBrowser from './components/tools/itemBrowser.js'
import ItemGen from './components/tools/itemGen.js'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
//import 'client/css/index.scss'

const NotFound = () => (<p> Jaha ja.</p>)

const routes = (
  <Route path='/' component={OutlineApp}>
    <IndexRoute component={LoginApp} />
    <Route path='game' component={Game}>
      <IndexRoute component={GameIndex} />
    </Route>
    <Route path='tools' component={ToolsApp}>
      <Route path='itembrowser' component={ItemBrowser} />
      <Route path='itemgen' component={ItemGen} />
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
      <Router history={browserHistory}>
        {routes}
      </Router>
    )
  }
}

const WrappedRenderForcer = DragDropContext(HTML5Backend)(RenderForcer)

render((
  <WrappedRenderForcer />
  ), document.getElementById('root'))

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
