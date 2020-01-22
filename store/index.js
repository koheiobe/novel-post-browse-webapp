import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

// sample store
const createStore = () => {
  return new Vuex.Store({
    state: {
      users: []
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setUsersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('users', ref)
      })
    },
    getters: {
      getUsers: (state) => {
        return state.users
      }
    }
  })
}

export default createStore
