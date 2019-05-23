import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

const store = new Store({
  modules: {
    user
  }
})

export default store