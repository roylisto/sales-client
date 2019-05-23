/* eslint-disable */
import Sales from '@/services/Sales'

const state = {
  sales: []  
}

const getters = {
  getSales: state => state.sales,
  getSalesCount: state => state.sales.length
}

const mutations = {
  setSales(state, sales) {
    state.sales = sales
  }
}

const actions = {
  setSales({commit}, sales){
    commit('setSales', sales)
  },
  async fetchSales({commit}, filters){
    let response = await Sales.list(filters)           
    commit('setSales', response.data.rows)    
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}