import { firestoreAction } from 'vuexfire'

export default {
  state: {
    posts: []
  },
  actions: {
    setPostsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('posts', ref)
    })
  },
  getters: {
    getPosts: (state) => {
      return state.posts
    }
  }
}
