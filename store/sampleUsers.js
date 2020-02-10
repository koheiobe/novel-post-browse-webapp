import { firestoreAction } from 'vuexfire'

export default {
  state: {
    users: []
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
}
