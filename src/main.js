import Vue from 'vue'
import App from '@/App.vue'
import Vuex from 'vuex';

import router from '@/router/index'

Vue.config.productionTip = false // Hide the propduction tip


Vue.use(Vuex); // create a store


import moment from 'moment'
Vue.prototype.moment = moment

window.app = new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
