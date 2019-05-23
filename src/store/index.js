import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import user from './modules/user'
import sales from './modules/sales'
import product from './modules/product'

Vue.use(Vuex)

const store = new Store({
  modules: {
    user,
    sales,
    product
  }
})

export default store