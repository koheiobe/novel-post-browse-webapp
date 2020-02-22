import { firestoreAction } from 'vuexfire'

export default {
  state: {
    novels: [],
    chapters: [],
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
    },
    getEditNovelId: (state) => {
      return state.editNovelId
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
