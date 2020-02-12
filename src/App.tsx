import React from 'react'
import './App.css'

const App = () => {
  return (
    <div className="" style={{width: 640, margin: '0 auto'}}>
      <h2>Tao - Farewell, Taotao of QQ</h2>

      <code>
        /qq_taotao<br/>
        &emsp;&emsp;/avatar<br/>
        &emsp;&emsp;/emoji<br />
        &emsp;&emsp;/css<br />
        &emsp;&emsp;/media<br/>
        &emsp;&emsp;/data<br/>
        &emsp;&emsp;&emsp;&emsp;/data.json<br/>
        &emsp;&emsp;&emsp;&emsp;/msgList.js<br/>
        &emsp;&emsp;&emsp;&emsp;/friendMap.js<br/>
        &emsp;&emsp;&emsp;&emsp;/config.js<br/>
        &emsp;&emsp;/index.html<br/>
      </code>

      <div>
        1. 使用 Chrome 浏览器登录 QQ 空间后，打开开发者工具，点击说说按钮
        2. 进入 Network Tab，查找 'emotion_cgi'，复制 g_tk 值
        3. 在此粘贴 g_tk，复制代码段并返回 Console Tab， 然后回车，稍候即可
      </div>
    </div>
  )
}

export default App
