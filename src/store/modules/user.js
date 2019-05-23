const state = {
  isUserLoggedIn: false,  
  user: JSON.parse(localStorage.getItem('user'))
}

const getters = {
  getUser: state => state.user,
  isUserLoggedIn: state => state.isUserLoggedIn
}

const mutations= {
  setUser (state, user) {
    if(user !== null) {
      state.isUserLoggedIn = true
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))      
    } else if (user === null) {
      state.isUserLoggedIn = false
      state.user = null
      localStorage.removeItem('user')
    }
  },
  setIsUserLoggedIn(state, isUserLoggedIn) {
    state.isUserLoggedIn = isUserLoggedIn
  }
}

const actions = {
  setIsUserLoggedIn({commit}, isUserLoggedIn) {
    commit('setIsUserLoggedIn', isUserLoggedIn)
  },
  setUser({commit}, user) {
    commit('setUser', user)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}