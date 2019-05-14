import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    activeMenu: 0,
    buyer: {
      id: '',
      userName: '',
      auth: ''
    },
    business: {
      id: '',
      userName: '',
      auth: ''
    }
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
    }
  }
})

export default store
