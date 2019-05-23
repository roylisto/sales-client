
const state = {
  sales: null
}

const getters = {
  getSales: state => state.sales
}

const mutations = {
  setSales(state, sales) {
    state.sales = sales
  }
}

const actions = {
  setSales({commit}, sales){
    commit('setSales', sales)
  }  
}

export default {
  state,
  mutations,
  getters,
  actions
}