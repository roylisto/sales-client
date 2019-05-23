/* eslint-disable */
import Product from '@/services/Product'

const state = {
  product: []  
}

const getters = {
  getProduct: state => state.product,
  getProductCount: state => state.product.length
}

const mutations = {
  setProduct(state, product) {
    state.product = product
  }
}

const actions = {
  setProduct({commit}, product){
    commit('setProduct', product)
  },
  async fetchProduct({commit}){
    let response = await Product.list()    
    commit('setProduct', response.data.products.rows)    
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}