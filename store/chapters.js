import { firestoreAction } from 'vuexfire'

export default {
  state: {
    chapters: [],
    chapter: {
      content: '',
      index: '',
      title: ''
    }
  },
  actions: {
    setChaptersRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('chapters', ref)
    }),
    setChapterRef: firestoreAction(({ bindFirestoreRef }, ref) => {
      bindFirestoreRef('chapter', ref)
    })
  },
  getters: {
    getChapters: (state) => state.chapters,
    getChapter: (state) => state.chapter
  },
  mutations: {
    addChapter: (state, chapter) => {
      if (state.chapters.length > 10) return
      state.chapters.push(chapter)
    }
  }
}
