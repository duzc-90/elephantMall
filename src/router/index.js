import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Index from '@/components/home/Index'
import GoodsList from '@/components/home/GoodsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/goodslist',
          name: 'goodslist',
          component: GoodsList
        }
      ]
    }
  ]
})
