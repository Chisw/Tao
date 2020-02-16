import React from 'react'
import { DateTime } from 'luxon'
import farewell from '../../images/farewell.gif'

export default function Header() {
  return (
    <div className="z-30 top-0 w-full bg-gray-200">
      <div className="tao-center">

        <div className="pt-8 pb-6">
          <p className="text-4xl text-gray-800">滔 <code>TAO</code></p>
          <p className="text-base text-gray-500 mt-2">保存 QQ 空间“说说”到本地，搭配模板可离线浏览、搜索</p>
        </div>

        <div className="pb-6 text-xs leading-loose">
          <p className="text-gray-500">2007年8月13日，腾讯实验室的新产品—滔滔，正式上线公测</p>
          <p className="text-gray-600">2010年1月26日，腾讯发出滔滔业务调整公告，将滔滔整合进 QQ 空间心情</p>
          <p className="text-gray-700">2010年5月19日，QQ 空间心情更名为“说说”</p>
          <p className="text-gray-800">
            {DateTime.fromJSDate(new Date()).toFormat('yyyy年M月dd日')}，今天，是时候说再见了..&nbsp;
            <img src={farewell} className="inline-block relative -mt-1 w-6 h-6" />
          </p>
        </div>

      </div>
    </div>
  )
}