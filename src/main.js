import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import Vant from 'vant'
import 'vant/lib/index.css'
// ajax
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import { Lazyload } from 'vant';
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$moment = moment
Vue.use(Vant)
Vue.use(Lazyload)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
