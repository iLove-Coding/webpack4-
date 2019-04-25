import Vue from 'vue'
import Router from 'vue-router'

import App from '@/views/App'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App
    },
    {
      name: 'Main',
      path: '/main',
      component: () => import('@/views/main/')
    },
    {
      path: '/demo',
      component: () => import('@/views/demo/')
    },
  ]
})
