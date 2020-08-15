import React from 'react'
import use_template from '../../images/use_template.gif'
import { Tag, Button } from '@blueprintjs/core'

const latest = `https://tao.jisuowei.com/download/v2020.08.15.zip`

export default function TemplatePage() {
  return (
    <div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">下载</h4>
        <p className="mt-2 py-2 flex items-center">
          <a
            href={latest}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 underline hover:text-yellow-700"
          >
            {latest}
          </a>
          <Tag intent="warning" round className="ml-2">NEW</Tag>
        </p>
        <p className="mt-2 text-gray-600">- 支持离线浏览、搜索</p>
        <p className="mt-2 text-gray-600">- 支持留言板查看</p>
        <p className="mt-2 text-gray-600">- 支持发布数量、评论点赞的统计</p>
        <p className="mt-2 text-gray-600">- 支持分页、格式化日期搜索</p>
        <p className="mt-2 text-gray-600">- 支持发布设备、发布位置、浏览次数、点赞好友的显示</p>
        <p className="mt-2 text-gray-600">- 支持好友别名、复制 QQ、发送邮件跳转、访问空间跳转</p>
        <p className="mt-2 text-gray-600">- 支持黑名单功能、@好友显示</p>
        <p className="mt-2 text-gray-600">- 支持移动端适配、滑动浏览图片</p>
        <p className="mt-2 text-gray-600">- 支持隐藏指定说说</p>
        <p className="mt-2 text-gray-600">- 支持资源丢失提示</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">本地文件访问</h4>
        <p className="mt-2 text-gray-600">1. 解压模板包、用户数据包</p>
        <p className="mt-2 text-gray-600">2. 将用户数据文件夹重命名为  user_data, 并移入模板文件夹</p>
        <p className="mt-2 text-gray-600">3. 进入模板文件夹</p>
        <p className="mt-2 text-gray-600">4. 右击 index.html 选择在 Chrome 中打开，或直接将其拖入浏览器，即可浏览</p>
        <p className="mt-2 text-gray-600">拷贝整个文件夹至安卓手机内，使用手机浏览器打开 index.html 亦可</p>
        <p className="mt-2 text-gray-600">注：所有的数据及媒体资源都已保存在本地，因此可以断网访问</p>
      </div>

      <div className="pb-4">
        <img alt="img" src={use_template} className="shadow-lg" />
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">内网访问</h4>
        <p className="mt-2 text-gray-600">如果你具备一定的 Web 开发经验，可以搭建本地静态文件服务</p>
        <p className="mt-2 text-gray-600">通过内网 IP 地址，使用任何现代浏览器来访问，还能分享给附近的人</p>
        <p className="mt-2 text-gray-600">推荐使用 Anywhere npm 包</p>
        <p className="mt-2 text-gray-600">
          <Button
            outlined
            icon="link"
            onClick={() => window.open(`https://www.npmjs.com/package/anywhere`)}
          >
            Anywhere
          </Button>
        </p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">外网访问</h4>
        <p className="mt-2 text-gray-600">如果你是 MacOS 用户，下载使用 uTools 中的“内网穿透”插件</p>
        <p className="mt-2 text-gray-600">一键映射本地服务到外网，发送网址给任何人访问</p>
        <p className="mt-2 text-gray-600">
          <Button
            outlined
            icon="link"
            onClick={() => window.open(`https://u.tools/`)}
          >
            uTools
          </Button>
        </p>
      </div>

    </div>
  )
}