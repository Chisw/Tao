import React from 'react'
import { FocusStyleManager } from '@blueprintjs/core'
import Layout from './components/layout'
import './App.css'

import HomePage from './components/pages/HomePage'

FocusStyleManager.onlyShowFocusOnTabs()

const App: React.FC = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

export default App
