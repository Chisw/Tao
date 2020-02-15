import React from 'react'
import use_template from '../../images/use_template.gif'

export default function TemplatePage() {
  return (
    <div>

      <div className="pt-8 pb-4">
        <h4 className="text-2xl">使用方式</h4>
        <p className="mt-2 text-gray-600">1. 解压模板包、用户数据包</p>
        <p className="mt-2 text-gray-600">2. 将用户数据文件夹重命名为  user_data, 并移入模板文件夹</p>
        <p className="mt-2 text-gray-600">3. 进入模板文件夹</p>
        <p className="mt-2 text-gray-600">4. 右击 index.html 选择在 Chrome 中打开，或直接将其拖入浏览器，即可浏览</p>
      </div>

      <div className="pb-4">
        <img src={use_template} className="shadow-lg" />
      </div>
    </div>
  )
}