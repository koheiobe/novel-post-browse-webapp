import firebase from '~/plugins/firebase'

export const db = firebase.firestore()

// ※※※※※※ novelIdは ユーザーemail + - + novelタイトル ※※※※※※※

// users
export const getUsers = () => db.collection('users')
// ユーザーの判定方法はemailを使用
export const getUser = (email) => getUsers().doc(email)
export const setUser = (email, user) => getUser(email).set(user)

// novels
export const getNovels = () => db.collection('novels')
export const getNovel = (novelId) => db.collection('novels').doc(novelId)

// Chapter
export const getChapters = (novelId) => getNovel(novelId).collection('chapters')
export const getChapter = (novelId, chapterIdx) =>
  getChapters(novelId).doc(chapterIdx)

export const setChapter = (novelId, chapterId, chapter) => {
  getChapters(novelId)
    .doc(chapterId)
    .set(chapter)
}
export const deleteChapter = (novelId, chapterId) => {
  getChapters(novelId)
    .doc(chapterId)
    .delete()
}
