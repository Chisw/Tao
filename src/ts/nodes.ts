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
        childNodes: [
          {
            id: 'config',
            icon: 'document',
            label: 'config.js',
          },
          {
            id: 'friendMap',
            icon: 'document',
            label: 'friendMap.js',
          },
          {
            id: 'taoList',
            icon: 'document',
            label: 'taoList.js',
          },
          {
            id: 'data',
            icon: 'document',
            label: 'data.json',
          },
        ]
      },
      {
        id: 'emoji',
        hasCaret: true,
        isExpanded: true,
        icon: 'folder-open',
        label: 'emoji',
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