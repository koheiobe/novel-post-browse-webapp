import { firestoreAction } from 'vuexfire'

export default {
  state: {
    posts: [],
    postDetail: {
      title: '',
      email: '',
      content: '',
      author: ''
    }
  },
  actions: {
    setPostsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('posts', ref)
    })
  },
  getters: {
    getPosts: (state) => {
      return state.posts
    },
    getPostDetail: (state) => {
      return state.postDetail
    }
  },
  mutations: {
    setPostDetail(state, postDetail) {
      state.postDetail = { ...postDetail }
    }
  }
}
