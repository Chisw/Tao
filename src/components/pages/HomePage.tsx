import React, { useState } from 'react'
import { Tabs, Tab } from '@blueprintjs/core'
import StartPage from './StartPage'
import TemplatePage from './TemplatePage'
import ConfigPage from './ConfigPage'
import FAQPage from './FAQPage'

export default function HomePage() {

  const [active, setActive] = useState('start')

  return (
    <div className="container max-w-3xl mx-auto px-4 lg:px-0">
      <div className="pt-4 pb-12">
        <Tabs
          large
          selectedTabId={active}
          onChange={id => setActive(id as string)}
        >
          <Tab id="start" className="mx-2" title="开始" panel={<StartPage />}></Tab>
          <Tab id="template" className="mx-2" title="模板" panel={<TemplatePage />}></Tab>
          <Tab id="config" className="mx-2" title="配置" panel={<ConfigPage />}></Tab>
          <Tab id="faq" className="mx-2" title="FAQ" panel={<FAQPage />}></Tab>
        </Tabs>
      </div>
    </div>
  )
}
