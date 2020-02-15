import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FocusStyleManager } from '@blueprintjs/core'
import Layout from './components/layout'
import './App.css'

import HomePage from './components/pages/HomePage'

FocusStyleManager.onlyShowFocusOnTabs()

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>

          <Route exact path="/" component={HomePage} />
          <Route component={HomePage} />

        </Switch>
      </Layout>
    </Router>
  )
}

export default App
