import React, { useState } from 'react'
import { Tabs, Tab } from '@blueprintjs/core'
import StartPage from './StartPage'
import ConfigPage from './ConfigPage'

export default function HomePage() {

  const [active, setActive] = useState('start')

  return (
    <div className="tao-center">
      <div className="pt-4 pb-12">
        <Tabs
          large
          selectedTabId={active}
          onChange={id => { setActive(id as string) }}
        >
          <Tab id="start" className="mx-2" title="开始" panel={<StartPage />}></Tab>
          <Tab id="template" className="mx-2" title="下载模板"></Tab>
          <Tab id="config" className="mx-2" title="功能及配置" panel={<ConfigPage />}></Tab>
          <Tab id="faq" className="mx-2" title="FAQ"></Tab>
        </Tabs>
      </div>
    </div>
  )
}