import React from 'react'
import { Tree } from '@blueprintjs/core'
import { userDataNodes } from '../../ts/nodes'

export default function ConfigPage() {
  return (
    <div>
      <div className="border rounded p-4 text-xs">
        <code>
          <Tree contents={userDataNodes} />
        </code>
      </div>
    </div>
  )
}