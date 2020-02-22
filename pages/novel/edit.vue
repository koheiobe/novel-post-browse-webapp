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
        :chaptersCount="chapters.length"
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
import * as db from '~/plugins/database.js'

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
      novelId: 'getEditNovelId',
      chapters: 'getChapters'
    }),
    loginUserNovels: function() {
      return this.novels.filter((novel) => novel.email === this.loginUser.email)
    }
  },
  created: function() {
    if (this.novelId === '') {
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

      if (this.hasSameIdx()) {
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
        db.setChapter(this.novelId, String(chapter.index), chapter)
      })
      this.syncFirestoreVuex()
    },
    onDelete: function(index) {
      db.deleteChapter(this.novelId, String(index))
    },
    syncFirestoreVuex: function() {
      this.$store.dispatch('setNovelChaptersRef', db.getChapters(this.novelId))
    },
    hasSameIdx: function() {
      return this.chapters.some((chapter, idx) => {
        const newChapters = this.chapters.slice(idx + 1)
        return newChapters.some(
          (m) => parseInt(chapter.index) === parseInt(m.index)
        )
      })
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
