<template>
  <div>
    <div
      :class="$style.editArea"
      v-for="(chapter, chapterIdx) in chapters"
      :key="chapterIdx"
    >
      <EditForm
        :title="chapter.title"
        :content="chapter.content"
        :index="String(chapter.index)"
        :chapterIdx="chapterIdx"
        @onChangeForm="updateValue"
        @onDelete="onDelete"
      />
    </div>
    <div :class="$style.addChapterButtonContainer">
      <BIconPlus @click="addEmptyChapter" />
    </div>
    <div>
      <b-button @click="save()" variant="outline-primary">保存</b-button>
    </div>
    <div v-if="error !== ''">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { BIconPlus } from 'bootstrap-vue'
import { mapGetters, mapMutations } from 'vuex'
import EditForm from '~/components/EditForm'
import { db } from '~/plugins/database.js'

export default {
  components: {
    EditForm,
    BIconPlus
  },
  data: function() {
    return {
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      editNovelId: 'getEditNovelId',
      chapters: 'getChapters'
    }),
    loginUserNovels: function() {
      return this.novels.filter((novel) => novel.email === this.loginUser.email)
    },
    chaptersRef: function() {
      return db
        .collection('novels')
        .doc(this.editNovelId)
        .collection('chapters')
    }
  },
  created: function() {
    if (this.editNovelId === '') {
      this.$router.push('/novel/register')
      return
    }
    this.syncFirestoreVuex()
  },
  methods: {
    ...mapMutations({ addChapter: 'addChapter' }),
    addEmptyChapter: function() {
      this.error = ''
      if (this.chapters.length > 10) {
        this.error = '10章以上は登録できません。'
        return
      }
      this.addChapter({
        title: '',
        content: '',
        index: null
      })
    },
    updateValue: function(formName, value, chapterIdx) {
      this.chapters[chapterIdx][formName] = value
    },
    save: function() {
      this.error = ''
      const hasSameIdx = this.chapters.some((chapter, idx) => {
        const newChapters = this.chapters.slice(idx + 1)
        return newChapters.some(
          (m) => parseInt(chapter.index) === parseInt(m.index)
        )
      })
      if (hasSameIdx) {
        this.error =
          '同じindexが含まれています。indexはそれぞれ違う数字を指定してください。'
        return
      }

      const hasNullIdx = this.chapters.some((chapter) => chapter.index === null)
      if (hasNullIdx) {
        this.error = 'indexが空の項目があります。'
        return
      }
      const sortedChapters = this.chapters.sort(
        (chapter1, chapter2) =>
          parseInt(chapter1.index) > parseInt(chapter2.index)
      )
      // firestoreを更新
      sortedChapters.forEach((chapter) => {
        this.chaptersRef.doc(String(chapter.index)).set(chapter)
      })
      this.syncFirestoreVuex()
    },
    onDelete: function(index) {
      this.chaptersRef.doc(String(index)).delete()
    },
    syncFirestoreVuex: function() {
      this.$store.dispatch('setNovelChaptersRef', this.chaptersRef)
    }
  }
}
</script>

<style module>
.editArea {
  margin-bottom: 20px;
}
.addChapterButtonContainer {
  margin-bottom: 20px;
}
</style>
