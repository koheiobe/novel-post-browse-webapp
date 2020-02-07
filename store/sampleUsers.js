import { firestoreAction } from 'vuexfire'

// sample store
// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       users: []
//     },
//     mutations: {
//       ...vuexfireMutations
//     },
//     actions: {
//       setUsersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
//         bindFirestoreRef('users', ref)
//       })
//     },
//     getters: {
//       getUsers: (state) => {
//         return state.users
//       }
//     }
//   })
// }

export const state = () => ({
  users: []
})

export const getters = {
  getUsers: (state) => {
    return state.users
  }
}

export const actions = {
  setUsersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
    bindFirestoreRef('users', ref)
  })
}
