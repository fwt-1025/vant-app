import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import store from '@/vuex/store.js'
Vue.use(Router)
Vue.use(Vuex)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '',
    components: {
      default: () => import('@/page/Index.vue')
    },
    redirect: '/login',
    children: [{
      path: '/home',
      component: () => import('@/page/Home.vue'),
      meta: {
        auth: '10001'
      }
    }, {
      path: '/smallpay',
      component: () => import('@/page/SmallPay.vue'),
      meta: {
        requireLogin: true,
        auth: '10001'
      }
    }, {
      path: '/message',
      component: () => import('@/page/Message.vue'),
      meta: {
        requireLogin: true,
        auth: '10001'
      }
    }, {
      path: '/cart',
      component: () => import('@/page/Cart.vue'),
      meta: {
        requireLogin: true,
        auth: '10001'
      }
    }, {
      path: '/buyerme',
      component: () => import('@/page/BuyerMe.vue'),
      meta: {
        requireLogin: true,
        auth: '10001'
      }
    }, {
      path: '/bussinessMe',
      component: () => import('@/page/business/BussinessMe.vue'),
      meta: {
        requireLogin: true,
        auth: '20002'
      }
    }, {
      path: '/business/upload',
      component: () => import('@/page/business/Upload.vue'),
      meta: {
        requireLogin: true,
        auth: '20001'
      }
    }, {
      path: '/business/chat',
      component: () => import('@/page/business/Chat.vue'),
      meta: {
        requireLogin: true,
        auth: '20001'
      }
    }, {
      path: '/business/echarts-o',
      component: () => import('@/page/business/Echart.vue'),
      meta: {
        requireLogin: true,
        auth: '20001'
      }
    }]
  }, {
    path: '/login',
    component: () => import('@/components/Login.vue')
  }, {
    path: '/register',
    component: () => import('@/components/Register.vue')
  }, {
    path: '/goodsDetail',
    component: () => import('@/components/goodsDetail.vue'),
    meta: {
      requireLogin: true,
      auth: '10001'
    }
  }, {
    name: 'pay',
    path: '/goodsDetail/pay',
    component: () => import('@/components/buyGoods.vue'),
    meta: {
      requireLogin: true,
      auth: '10001'
    }
  }, {
    path: '/common',
    component: () => import('@/components/common')
  }, {
    name: 'receiveAddress',
    path: '/receiveAddress',
    component: () => import('@/components/ReceiveAddress'),
    meta: {
      requireLogin: true,
      auth: '10001'
    }
  }, {
    name: 'addAddress',
    path: '/addAddress',
    component: () => import('@/components/AddAddress'),
    meta: {
      requireLogin: true,
      auth: '10001'
    }
  }, {
    name: 'settings',
    path: '/settings',
    component: () => import('@/page/settings')
  }, {
    name: 'buyerChat',
    path: '/buyerchat',
    component: () => import('@/page/buyerChat')
  }]
})
router.beforeEach((to, from, next) => {
  let d = JSON.parse(localStorage.getItem('user'))
  if(to.meta.requireLogin) {
    console.log(d)
    // eslint-disable-next-line no-console
    // let d = JSON.parse(localStorage.getItem('user'))
    // console.log(store.state.buyer.username, store.state.business.username)
    if (d.username || d.userName) {
      next()
    } else {
      router.push('/login')
    }
    next()
  }
  next()
})
export default router
