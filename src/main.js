import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import { sync } from 'vuex-router-sync'
import ArgonDashboard from './plugins/argon-dashboard'

import store from '@/store'

Vue.config.productionTip = false

sync(store, router)

Vue.prototype.$eventHub = new Vue()

Vue.use(ArgonDashboard)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
