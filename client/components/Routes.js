import { Route, Switch } from 'react-router'
import EnTomSida from 'client/components/EnTomSida.js'
import React from 'react'

const Routes = () => (
  <Switch>
    <Route path="/en-tom-sida" component={EnTomSida} />
  </Switch>
)

export default Routes
