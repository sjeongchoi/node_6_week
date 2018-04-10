import List from '@/components/board/List'
import Modify from '@/components/board/Modify'
import View from '@/components/board/View'
import Write from '@/components/board/Write'

export default [
  {
    path: '/board/list',
    name: 'list',
    component: List
  },
  {
    path: '/board/modify',
    name: 'modify',
    component: Modify
  },
  {
    path: '/board/view',
    name: 'view',
    component: View
  },
  {
    path: '/board/write',
    name: 'write',
    component: Write
  }
]
