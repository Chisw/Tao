import React, { useEffect } from 'react'
import { Tree, Button } from '@blueprintjs/core'
import { userDataNodes } from '../../ts/nodes'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

export default function ConfigPage() {


  useEffect(() => {
    hljs.initHighlightingOnLoad()
  }, [])

  return (
    <div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">user_data 文件夹</h4>
        <p className="mt-2 text-gray-600">用户数据包解压后，是一个名为 “user_data_*QQ_NUMBER” 的文件夹</p>
        <p className="mt-2 text-gray-600">内部又包含 avatar, data, emoji, media 四个文件夹，其大致结构如下</p>
      </div>

      <div className="border rounded p-4 text-xs">
        <code>
          <Tree contents={userDataNodes} className="text-xs" />
        </code>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">配置文件</h4>
        <p className="mt-2 text-gray-600">为保证数据的完整性，建议修改都发生在 user_data/data/config.js 中</p>
        <p className="mt-2 text-gray-600">建议使用轻量级的 Sublime Text 编辑器打开进行编辑</p>
        <p className="mt-2 text-gray-600">
          <Button
            small
            icon="download"
            onClick={() => window.open(`https://www.sublimetext.com/`)}
          >
            下载 Sublime Text
          </Button>
        </p>
      </div>

      <pre className="rounded overflow-hidden text-xs"><code className="javascript">
{`
  const config = {
    title: 'QQ 空间标题',
    description: 'QQ 空间描述',
    qq: 3210123456,
    name: '昵称',
    // 要隐藏的说说 ID，单引号包裹，逗号结尾
    hide: [
      '603******************700',
      '603******************800',
    ],
    // QQ 昵称别名
    alias: {
      '3210123456': '张三',
      '3210123457': '李四',
    },
    // 黑名单列表，其评论、点赞记录将被隐藏
    blacklist: [
      3210123456,
      3210123457,
    ]
  }

`}
      </code></pre>

    </div>
  )
}