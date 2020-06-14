import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Toaster, KeyCombo } from '@blueprintjs/core'
import step1 from '../../images/step1.png'
import step3 from '../../images/step3.png'

const toaster = Toaster.create({ position: 'top' })

export default function StartPage() {

  const [JSZipTxt, setJSZipTxt] = useState('')
  const [FileSaverTxt, setFileSaverTxt] = useState('')
  const [TaoTxt, setTaoTxt] = useState('')

  const [qq, setQq] = useState('')

  const [copyLoading, setCopyLoading] = useState(false)

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
    fetch(`/code/tao.js?tmp=${Date.now()}`)
      .then(res => res.text())
      .then(text => {
        setTaoTxt(text)
      })

  }, [])

  const copyCode = () => {
    if (qq && !/^[0-9]*$/.test(qq)) {
      toaster.show({
        message: 'QQ 不合法',
        timeout: 3000,
        icon: 'error',
        intent: 'danger',
      })
      return
    }
    setCopyLoading(true)

    setTimeout(() => {
      const exec = `Tao.get(${qq ? `${qq}` : ''});`
      const input = document.createElement('textarea')
      document.body.appendChild(input)
      input.value = `${JSZipTxt}\n${FileSaverTxt}\n${TaoTxt}\n${exec}\n`
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
      toaster.show({
        message: '复制成功',
        timeout: 3000,
        icon: 'tick',
        intent: 'success',
      })
      setCopyLoading(false)
    }, 20)
  }
  
  return (
    <div>

      {/* step 1 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">获取代码段</h4>
        <p className="mt-2 text-gray-600">点击“获取代码段”（如需抓取好友说说，请输入好友 QQ）</p>
      </div>

      <div className="pb-4">
        <div className="pb-2">
          <div>
            <InputGroup
              placeholder="请输入好友 QQ (非必填)"
              value={qq}
              onChange={(e: any) => setQq(e.target.value)}
              rightElement={(
                qq.length ? (
                  <Button
                    minimal
                    icon="cross"
                    onClick={() => setQq('')}
                  />
                ) : (
                  <></>
                )
              )}
            />
          </div>
          <div className="pt-2">
            <Button
              large
              intent="warning"
              icon="code-block"
              loading={!JSZipTxt || !FileSaverTxt || !TaoTxt || copyLoading}
              onClick={copyCode}
            >
              获取代码段
            </Button>
          </div>
        </div>
      </div>

      {/* step 2 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">使用开发者工具</h4>
        <p className="mt-2 text-gray-600">登录 <a className="text-yellow-600 underline hover:text-yellow-700" href="https://qzone.qq.com" target="_blank" rel="noreferrer">QQ 空间</a></p>
        <p className="mt-2 text-gray-600">打开 Chrome 浏览器中的“① 控制 / ② 更多工具 / ③ 开发者工具”</p>
        <p className="mt-2 text-gray-600">
          <span>快捷键为</span>
          <KeyCombo className="inline-block mx-1" combo="F12" />
          <span className="md:hidden block h-2"><br /></span>
          <span>或</span>
          <KeyCombo className="inline-block mx-1" combo="cmd" />
          <span>+ </span>
          <KeyCombo className="inline-block mx-1" combo="alt" />
          <span>+</span>
          <KeyCombo className="inline-block mx-1" combo="i" />
        </p>
        <p className="mt-2 text-gray-600">
          <Button
            outlined
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


      {/* step 3 */}
      <div className="pt-8 pb-4">
        <h4 className="text-2xl">执行代码段</h4>
        <p className="mt-2 text-gray-600">进入 ①“Console” 控制台，点击 ②“禁用”按钮清空控制台</p>
        <p className="mt-2 text-gray-600">粘贴代码段，敲击 <KeyCombo className="inline-block" combo="enter" /> 键开始执行</p>
        <p className="mt-2 text-gray-600">执行过程中会抓取说说、评论、点赞、图片、视频、头像、表情包，请耐心等待</p>
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