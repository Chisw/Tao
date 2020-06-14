import React from 'react'
import { DateTime } from 'luxon'
import farewell from '../../images/farewell.gif'
import demo from '../../images/demo.png'
import logo from '../../images/logo.png'

export default function Header() {
  return (
    <div className="z-30 top-0 w-full bg-theme">
      <div className="tao-center flex">

        <div className="flex-grow">
          <div className="pt-8 pb-6">
            <p className="w-32"><img src={logo} alt="logo" /></p>
            <p className="text-base text-yellow-300 font-light mt-4">归档 QQ 空间 “说说” </p>
            <p className="text-base text-yellow-300 font-light mt-1">保存至本地，可离线浏览、搜索</p>
          </div>

          <div className="pb-6 text-xs leading-loose font-light">
            <p className="text-yellow-300">2007年8月13日，腾讯实验室的新产品—滔滔，正式上线公测</p>
            <p className="text-yellow-200">2010年1月26日，腾讯发出滔滔业务调整公告，将滔滔整合进 QQ 空间心情</p>
            <p className="text-yellow-100">2010年5月19日，QQ 空间心情更名为“说说”</p>
            <p className="text-white">
              {DateTime.fromJSDate(new Date()).toFormat('yyyy年M月dd日')}，今天，是时候说再见了..&nbsp;
              <img alt="bye" src={farewell} className="inline-block relative -mt-1 w-6 h-6" />
            </p>
          </div>
        </div>

        <div className="relative ml-4 w-1/3">
          <img alt="demo" src={demo} className="absolute bottom-0" />
        </div>

      </div>
    </div>
  )
}