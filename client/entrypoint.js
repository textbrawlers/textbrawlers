import React from 'react'
import { render } from 'react-dom'
import { Router, Link, browserHistory, Route, IndexRoute } from 'react-router'
import LoginApp from './components/loginApp.js'
import ToolsApp from './components/toolsApp.js'
import Game from './components/game.js'
import LoginPage from './components/loginPage.js'
import RegisterPage from './components/registerPage.js'
import GameIndex from './components/gameIndex.js'
import ItemBrowser from './components/tools/itemBrowser.js'
import ItemGen from './components/tools/itemGen.js'
import { DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import 'client/css/index.scss'


const NotFound = () => (<p>Jaha ja.</p>)
const Index = () => (<p>Fancy homepage!</p>)


const FullIndex = () => <LoginApp><Index /></LoginApp>
const FullLoginPage = () => <LoginApp><LoginPage /></LoginApp>
const FullRegisterPage = () => <LoginApp><RegisterPage /></LoginApp>

const routes = (
  <Route path='/'>
    <IndexRoute component={FullIndex} />
    <Route path='login' component={FullLoginPage} />
    <Route path='register' component={FullRegisterPage} />
    <Route path='game' component={Game}>
      <IndexRoute component={GameIndex} />
    </Route>
    <Route path='tools' component={ToolsApp}>
      <Route path='itembrowser' component={ItemBrowser}/>
      <Route path='itemgen' component={ItemGen}/>
    </Route>
    <Route path='*' component={NotFound} />a
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

const WrappedRenderForcer = DragDropContext(HTML5Backend)(RenderForcer)

render((
  <WrappedRenderForcer />
  ), document.getElementById('root'))
