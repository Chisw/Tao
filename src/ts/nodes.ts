import { ITreeNode } from '@blueprintjs/core'

export const userDataNodes: ITreeNode[] = [
  {
    id: 'user_data',
    hasCaret: true,
    isExpanded: true,
    icon: 'folder-open',
    label: 'user_data_*QQ_NUMBER',
    childNodes: [
      {
        id: 'avatar',
        hasCaret: true,
        isExpanded: true,
        icon: 'folder-open',
        label: 'avatar',
        secondaryLabel: '所有参与过评论、点赞的好友头像',
        childNodes: [
          {
            id: 'avatar1',
            icon: 'user',
            label: '3210123456.jpeg',
          },
          {
            id: 'avatar2',
            label: '...',
          }
        ]
      },
      {
        id: 'data',
        hasCaret: true,
        isExpanded: true,
        icon: 'folder-open',
        label: 'data',
        secondaryLabel: '所有文本数据',
        childNodes: [
          {
            id: 'config',
            icon: 'document',
            label: 'config.js',
            secondaryLabel: '配置文件',
          },
          {
            id: 'friendMap',
            icon: 'document',
            label: 'friendMap.js',
            secondaryLabel: 'QQ 号码/昵称 映射表',
          },
          {
            id: 'taoList',
            icon: 'document',
            label: 'taoList.js',
            secondaryLabel: '处理后的所有说说记录',
          },
          {
            id: 'data',
            icon: 'document',
            label: 'data.json',
            secondaryLabel: '抓取的原始数据，供纠错、二次开发',
          },
        ]
      },
      {
        id: 'emoji',
        hasCaret: true,
        isExpanded: true,
        icon: 'folder-open',
        label: 'emoji',
        secondaryLabel: '所有使用到的表情包',
        childNodes: [
          {
            id: 'emoji44',
            icon: 'heart',
            label: 'e44@2x.gif',
          },
          {
            id: 'emoji46',
            label: '...',
          },
        ]
      },
      {
        id: 'media',
        hasCaret: true,
        isExpanded: true,
        icon: 'folder-open',
        label: 'media',
        secondaryLabel: '所有使用到的图片和视频',
        childNodes: [
          {
            id: 'media1',
            icon: 'film',
            label: '60342630***ac0800-0.mp4',
          },
          {
            id: 'media2',
            icon: 'media',
            label: '60342630***bd0900-0.jpeg',
          },
          {
            id: 'media3',
            label: '...',
          },
        ]
      },
    ]
  },
]