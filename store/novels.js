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
    }),
    setNovelChaptersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('chapters', ref)
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
    },
    getChapters: (state) => {
      return state.chapters
    }
  },
  mutations: {
    setNovelDetail(state, novelDetail) {
      state.novelDetail = { ...novelDetail }
    },
    setEditNovelId(state, id) {
      state.editNovelId = id
    },
    addChapter: (state, chapter) => {
      if (state.chapters.length > 10) return
      state.chapters.push(chapter)
    }
  }
}
