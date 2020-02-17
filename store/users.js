import { firestoreAction } from 'vuexfire'

export default {
  state: {
    users: [],
    loginUser: {
      name: '',
      email: ''
    }
  },
  actions: {
    setUsersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('users', ref)
    })
  },
  getters: {
    getUsers: (state) => {
      return state.users
    },
    getLoginUser: (state) => {
      return state.loginUser
    }
  },
  mutations: {
    setLoginUser(state, loginUser) {
      state.loginUser = { ...loginUser }
    }
  }
}
