import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import farewell from '../../images/farewell.gif'
import demo from '../../images/demo.png'
import chart from '../../images/chart.png'
import logo from '../../images/logo.png'
import qzone from '../../images/qzone.png'

export default function Header() {

  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setToggle(!toggle)
    }, 5000)
    return () => clearInterval(timer)
  }, [setToggle, toggle])

  return (
    <div
      className="z-30 top-0 w-full bg-theme"
      style={{
        backgroundImage: `url(${qzone})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
      <div className="tao-center flex">

        <div className="flex-grow text-white">
          <div className="pt-8 pb-6">
            <p className="w-32"><img src={logo} alt="logo" /></p>
            <p className="text-base mt-4">归档 QQ 空间 “说说” </p>
            <p className="text-base mt-1">保存至本地，可离线浏览、搜索、统计</p>
            <p className="text-base mt-1">重磅！现已能同时保存留言板数据</p>
          </div>

          <div className="pb-6 text-xs leading-loose">
            <p>2007年8月13日，腾讯实验室的新产品—滔滔，正式上线公测</p>
            <p>2010年1月26日，腾讯发出滔滔业务调整公告，将滔滔整合进 QQ 空间心情</p>
            <p>2010年5月19日，QQ 空间心情更名为“说说”</p>
            <p>
              {DateTime.fromJSDate(new Date()).toFormat('yyyy年M月dd日')}，今天，是时候说再见了..&nbsp;
              <img alt="bye" src={farewell} className="inline-block relative -mt-1 w-6 h-6" />
            </p>
          </div>
        </div>

        <div className="relative ml-4 w-1/3">
          <img alt="demo" src={toggle ? demo : chart} className="-mb-10 absolute bottom-0 rounded shadow-lg" />
        </div>

      </div>
    </div>
  )
}