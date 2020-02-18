import { firestoreAction } from 'vuexfire'

export default {
  state: {
    novels: [],
    novelDetail: {
      title: '',
      email: '',
      content: '',
      author: ''
    },
    editNovelId: ''
  },
  actions: {
    setNovelsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('novels', ref)
    })
  },
  getters: {
    getNovels: (state) => {
      return state.novels
    },
    getNovelDetail: (state) => {
      return state.novelDetail
    }
  },
  mutations: {
    setNovelDetail(state, novelDetail) {
      state.novelDetail = { ...novelDetail }
    },
    setEditNovelId(state, id) {
      state.editNovelId = id
    }
  }
}
