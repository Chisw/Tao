import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Toaster, Tooltip } from '@blueprintjs/core'
import step1 from '../../images/step1.png'
import step2 from '../../images/step2.png'
import step3 from '../../images/step3.png'

const toaster = Toaster.create({ position: 'top' })

export default function StartPage() {

  const [JSZipTxt, setJSZipTxt] = useState('')
  const [FileSaverTxt, setFileSaverTxt] = useState('')
  const [TaoTxt, setTaoTxt] = useState('')

  const [token, setToken] = useState('')
  const [qq, setQq] = useState('')

  useEffect(() => {

    fetch('/code/JSZip.txt')
      .then(res => res.text())
      .then(text => {
        setJSZipTxt(text)
      })
    fetch('/code/FileSaver.txt')
      .then(res => res.text())
      .then(text => {
        setFileSaverTxt(text)
      })
    fetch('/code/tao.js')
      .then(res => res.text())
      .then(text => {
        setTaoTxt(text)
      })

  }, [])

  const copyUrl = () => {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = `https://qzone.qq.com`
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    toaster.show({
      message: '复制成功',
      timeout: 3000,
      icon: 'tick',
      intent: 'success',
    })
  }

  function QzoneUrl () {
    return (
      <Tooltip content={<span className="text-xs">点击复制网址：https://qzone.qq.com</span>} position="top-left">
        <span className="text-blue-600 cursor-pointer" onClick={copyUrl}>
          QQ 空间 
        </span>
      </Tooltip>
    )
  }

  const copyCode = () => {
    if (!/^[0-9]*$/.test(token)) {
      toaster.show({
        message: 'g_tk 不合法',
        timeout: 3000,
        icon: 'error',
        intent: 'danger',
      })
      return
    }
    if (qq && !/^[0-9]*$/.test(qq)) {
      toaster.show({
        message: 'QQ 不合法',
        timeout: 3000,
        icon: 'error',
        intent: 'danger',
      })
      return
    }

    const exec = `Tao.get(${token}${qq ? `,${qq}` : ''});`
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = `${JSZipTxt}\n${FileSaverTxt}\n${TaoTxt}\n${exec}\n`
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    toaster.show({
      message: '已复制代码段到剪切板',
      timeout: 3000,
      icon: 'tick',
      intent: 'success',
    })
  }
  
  return (
    <div>

      {/* step 1 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">使用开发者工具</h4>
        <p className="mt-2 text-gray-600">打开 Chrome 浏览器中的“控制 / 更多工具 / 开发者工具”</p>
        <p className="mt-2 text-gray-600">
          <Button
            small
            icon="download"
            onClick={() => window.open(`https://www.google.cn/intl/zh-CN/chrome/`)}
          >
            下载 Chrome
          </Button>
        </p>
      </div>

      <div className="pb-4">
        <img alt="img" src={step1} className="shadow-lg" />
      </div>

      {/* step 2 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">查找 g_tk 值</h4>
        <p className="mt-2 text-gray-600">访问 <QzoneUrl /> 并登录后，进入开发者工具中的“Network / XHR / 任一网络请求 / Headers”</p>
        <p className="mt-2 text-gray-600">在 “General / Request URL” 中找到 g_tk 值并复制（数字部分），若未找到，请切换网络请求</p>
      </div>

      <div className="pb-4">
        <img alt="img" src={step2} className="shadow-lg" />
      </div>

      {/* step 3 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">获取代码段</h4>
        <p className="mt-2 text-gray-600">将 g_tk 值粘贴到下方输入框（如需抓取好友说说，请输入其 QQ），然后点击“获取代码段”</p>
      </div>

      <div className="pb-4">
        <div className="flex pb-2">
          <div className="flex-grow">
            <InputGroup
              placeholder="请粘贴 g_tk 值"
              value={token}
              onChange={(e: any) => setToken(e.target.value)}
            />
          </div>
          <div className="flex-grow pl-2">
            <InputGroup
              placeholder="请输入好友 QQ (非必填)"
              value={qq}
              onChange={(e: any) => setQq(e.target.value)}
            />
          </div>
        </div>
        <Button
          intent="success"
          icon="code-block"
          loading={!JSZipTxt || !FileSaverTxt || !TaoTxt}
          disabled={!token}
          onClick={copyCode}
        >
          获取代码段
        </Button>
      </div>


      {/* step 4 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">执行代码段</h4>
        <p className="mt-2 text-gray-600">返回 QQ 空间页面的开发者工具，进入 “Console” 控制台，点击“禁用”按钮清空控制台</p>
        <p className="mt-2 text-gray-600">在控制台粘贴代码段，敲击回车键，开始执行</p>
        <p className="mt-2 text-gray-600">执行过程中会抓取说说记录、点赞记录、图片、视频、头像、表情包，请耐心等待</p>
        <p className="mt-2 text-gray-600">执行结束会自动下载 .zip 用户数据包，请妥善保存</p>
      </div>

      <div className="pb-4">
        <img alt="img" src={step3} className="shadow-lg" />
      </div>


      <div className="pt-8 pb-4">
        <h4 className="text-2xl">数据抓取完成</h4>
        <p className="mt-2 text-gray-600">请继续下载模板，开始本地离线浏览</p>
      </div>

    </div>
  )
}