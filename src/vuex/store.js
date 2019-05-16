import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {getCartGoods} from '@/api/load-data.js'
const store = new Vuex.Store({
  state: {
    activeMenu: 0,
    buyer: {
      id: '',
      userName: '',
      auth: '',
    },
    business: {
      id: '',
      userName: '',
      auth: ''
    },
    cartNumber: 0,
    goosShow: []
  },
  mutations: {
    setActiveMenu (state, val) {
      state.activeMenu = val
    },
    setBuyer (state, val) {
      state.buyer = val
    },
    setBussiness (state, val) {
      state.business = val
    },
    setCartNumber (state, val) {
      state.cartNumber = val
    },
    setGoodsShow (state, val) {
      console.log('val', val)
      state.goosShow = val
    }
  },
  actions: {
    async getCartNumber ({commit}) {
      let res = await getCartGoods()
      if (res.success) {
        commit('setCartNumber', res.data.length)
      }
    }
  }
})

export default store
