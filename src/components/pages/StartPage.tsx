import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Icon, Toaster } from '@blueprintjs/core'
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

  const copy = () => {
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
      message: '已复制到剪切板',
      timeout: 3000,
      icon: 'tick',
      intent: 'success',
    })
  }
  
  return (
    <div>

      <p className="text-gray-500">
        1. 使用开发者工具
        <Icon icon="caret-right" />
        2. 使用 g_tk 获取代码段
        <Icon icon="caret-right" />
        3. 执行代码段
      </p>


      {/* step 1 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">使用开发者工具</h4>
        <p className="mt-2 text-gray-600">打开 Chrome 浏览器中的“控制 / 更多工具 / 开发者工具”。</p>
        <p className="mt-2 text-gray-600">无法保证在 QQ、360、搜狗等低端浏览器 100% 运行成功，但能保证在 IE 这种**浏览器 100% 运行失败。</p>
      </div>

      <div className="pb-4">
        <img src={step1} className="shadow-lg" />
      </div>

      {/* step 2 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">使用 g_tk 获取代码段</h4>
        <p className="mt-2 text-gray-600">登录 QQ 空间，依次点击开发者工具中的“Network / XHR / 任意一个网络请求 / Headers”。</p>
        <p className="mt-2 text-gray-600">在 “General / Request URL” 中找到 g_tk 值并复制（数字部分），若未找到，请切换网络请求。</p>
        <p className="mt-2 text-gray-600">粘贴 g_tk 到下方输入框，如需抓取好友说说，请输入其 QQ，然后点击“获取代码段”。</p>
      </div>

      <div className="flex pb-4">
        <div className="flex-grow pr-2">
          <InputGroup
            placeholder="请粘贴 g_tk 值"
            value={token}
            onChange={(e: any) => setToken(e.target.value)}
          />
        </div>
        <div className="flex-grow pr-2">
          <InputGroup
            placeholder="请输入好友 QQ (非必填)"
            value={qq}
            onChange={(e: any) => setQq(e.target.value)}
          />
        </div>
        <div>
          <Button
            intent="success"
            icon="code-block"
            loading={!JSZipTxt || !FileSaverTxt || !TaoTxt}
            disabled={!token}
            onClick={copy}
          >
            获取代码段
          </Button>
        </div>
      </div>

      <div className="pb-4">
        <img src={step2} className="shadow-lg" />
      </div>

      {/* step 3 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">执行代码段</h4>
        <p className="mt-2 text-gray-600">返回开发者工具，进入 “Console” 并点击“禁用”按钮清空。</p>
        <p className="mt-2 text-gray-600">粘贴代码段，敲击回车键，静候即可，代码段执行结束会自动下载 .zip 数据包。</p>
      </div>

      <div className="pb-4">
        <img src={step3} className="shadow-lg" />
      </div>


      <div className="pt-8 pb-4">
        <h4 className="text-2xl">已完成</h4>
        <p className="mt-2 text-gray-600">请继续下载模板，以实现本地浏览数据。</p>
      </div>

    </div>
  )
}