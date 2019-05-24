/* eslint-disable */
import Sales from '@/services/Sales'

const state = {
  sales: [],
  salesCountNoLimit: 0    
}

const getters = {
  getSales: state => state.sales,
  getSalesCount: state => state.sales.length,
  getSalesCountNoLimit: state => state.salesCountNoLimit
}

const mutations = {
  setSales(state, sales) {
    state.sales = sales
  },
  setSalesCountNoLimit(state, salesCountNoLimit){
    state.salesCountNoLimit = salesCountNoLimit
  }
}

const actions = {
  setSales({commit}, sales){
    commit('setSales', sales)
  },
  setSalesCountNoLimit({commit}, salesCountNoLimit){
    commit('setSalesCountNoLimit', salesCountNoLimit)
  },
  async fetchSales({commit}, filters){
    try {
      let response = await Sales.list(filters)    
      commit('setSales', response.data.rows)  
      commit('setSalesCountNoLimit', response.data.countNoLimit)  
    } catch (error) {
      commit('setSales', [])  
    }
    
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}