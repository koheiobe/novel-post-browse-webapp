import { firestoreAction } from 'vuexfire'

export default {
  state: {
    users: [],
    user: {
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
      return state.user
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = { ...user }
    }
  }
}
