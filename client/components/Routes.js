import { Route, Switch } from 'react-router'
import SignIn from 'client/components/SignIn.js'
import SignUp from 'client/components/SignUp.js'
import Inventory from 'client/components/Inventory.js'
import React from 'react'

const Routes = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/inventory" component={Inventory} />
  </Switch>
)

export default Routes
