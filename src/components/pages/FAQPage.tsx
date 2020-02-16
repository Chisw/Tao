import React from 'react'
import { Button, Tag } from '@blueprintjs/core'

export default function FAQPage() {
  return (
    <div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">抓取数据安全吗，有没有隐私风险？</h4>
        <p className="mt-4 text-gray-600">非常安全</p>
        <p className="mt-2 text-gray-600">所有的数据请求都是发生在 QQ 空间 https 的域下，没有泄露的风险</p>
        <p className="mt-2 text-gray-600">代码段只做了抓取、处理、压缩下载三件事，中途既没有、也无法泄露信息</p>
        <p className="mt-2 text-gray-600">源码托管在 GitHub 上，可供审查</p>
        <p className="mt-2 text-gray-600">
          <Button
            small
            icon="link"
            onClick={() => window.open(`https://github.com/chisw/Tao`)}
          >
            https://github.com/chisw/Tao
          </Button>
        </p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">刚执行代码段就报了一堆错怎么办？</h4>
        <p className="mt-4 text-gray-600">在控制台空白处中部，右击菜单选择“Clear console history”</p>
        <p className="mt-2 text-gray-600">重写粘贴代码段，并回车执行</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">为什么我输入了好友的 QQ 后无法抓取到 TA 的数据？</h4>
        <p className="mt-4 text-gray-600">你不在对方的好友列表中，或者对方的空间屏蔽了你的访问权限</p>
        <p className="mt-2 text-gray-600">Tao 无法破解任何权限，Tao 只是一个普通的操作工</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">为什么实际抓取到的好友说说数量比显示的数量少？</h4>
        <p className="mt-4 text-gray-600">少掉的那部分的说说对你是不可见的</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">为什么提示我即将下载后，一直没反应？</h4>
        <p className="mt-4 text-gray-600">能到这一步，说明代码段执行的非常顺利</p>
        <p className="mt-2 text-gray-600">图片、视频的总大小，以及你的设备性能，会直接影响到压缩的速度</p>
        <p className="mt-2 text-gray-600">请耐心等待，若超过五分钟都没有下载，建议更换性能更好的设备</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">格式化日期是怎么搜索的？</h4>
        <p className="mt-4 text-gray-600">输入 <Tag>@20080808</Tag> 返回2008年8月8日当天的说说</p>
        <p className="mt-2 text-gray-600">输入 <Tag>@20080808.</Tag> 返回2008年8月8日当天及以前的说说</p>
        <p className="mt-2 text-gray-600">输入 <Tag>@20080808..</Tag> 返回2008年8月8日当天及以后的说说</p>
        <p className="mt-2 text-gray-600">输入 <Tag>@20080808.20081231</Tag> 返回2008年8月8日当天 至 2008年12月31日当天的说说</p>
        <p className="mt-2 text-gray-600">不符合上述格式的文本，将以原文本直接搜索</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">如何获取说说的 ID 或者 好友的 QQ 号码？</h4>
        <p className="mt-4 text-gray-600">说说的 ID 通过点击说说右上角的复制按钮获取</p>
        <p className="mt-2 text-gray-600">QQ 号码通过点击好友的蓝色昵称获取</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">为什么某条评论只有内容，却没有昵称？</h4>
        <p className="mt-4 text-gray-600">该 QQ 已经注销</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">弹框提示视频文件缺失该怎么办？</h4>
        <p className="mt-4 text-gray-600">复制说说的 ID，并前往 user_data/data/data.json 中搜索</p>
        <p className="mt-2 text-gray-600">找到说说原始数据中的 video[0].url3 字段，是原始视频地址</p>
        <p className="mt-2 text-gray-600">设法下载该视频，并重命名为弹框中的文件名，放入 user_data/media 中即可</p>
        <p className="mt-2 text-gray-600">该情形基本发生于原始视频无法下载，才导致 Tao 无法将其压缩到数据包内</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">有新的模板包发布后，该如何使用？</h4>
        <p className="mt-4 text-gray-600">将旧的 user_data 照例拖入新的模板文件夹中即可</p>
      </div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">更多问题</h4>
        <p className="mt-4 text-gray-600">请发送邮件至：i@jisuowei.com</p>
        <p className="mt-2 text-gray-600">或提出 issue 至源码仓库</p>
      </div>

    </div>
  )
}