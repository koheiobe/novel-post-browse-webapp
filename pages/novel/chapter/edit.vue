<template>
  <div>
    <div
      :class="$style.editArea"
      v-for="(chapter, chapterIdx) in chapters"
      :key="chapterIdx"
    >
      <EditForm
        :defaultIsOpen="defaultIsOpen(chapterIdx)"
        :title="chapter.title"
        :content="chapter.content"
        :index="String(chapter.index)"
        :chapterIdx="chapterIdx"
        :chaptersCount="chapters.length"
        @onChangeForm="updateValue"
        @onDelete="onDelete"
      />
    </div>
    <div v-if="error !== ''">
      <p>{{ error }}</p>
    </div>
    <div :class="$style.addChapterButtonContainer">
      <b-button @click="addEmptyChapter" variant="primary"
        >追加<BIconPlus
      /></b-button>
    </div>
    <div :class="$style.footer">
      <b-button @click="save()" variant="outline-primary">保存</b-button>
      <b-button to="/novel/register" variant="outline-primary">戻る</b-button>
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
      const hasEmptyTitle = this.chapters.some(
        (chapter) => chapter.title === ''
      )
      if (hasEmptyTitle) {
        this.error = 'タイトルが空白の項目があります。'
        return
      }

      const hasEmptyIdx = this.chapters.some(
        (chapter) => chapter.index === null
      )
      if (hasEmptyIdx) {
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
      // 小説の更新時刻を更新する
      db.updateNoveUpdatedAtl(this.novelId)
      this.syncFirestoreVuex()
    },
    onDelete: function(index) {
      db.deleteChapter(this.novelId, String(index))
    },
    syncFirestoreVuex: function() {
      this.$store.dispatch('setChaptersRef', db.getChapters(this.novelId))
    },
    hasSameIdx: function() {
      return this.chapters.some((chapter, idx) => {
        const newChapters = this.chapters.slice(idx + 1)
        return newChapters.some(
          (m) => parseInt(chapter.index) === parseInt(m.index)
        )
      })
    },
    defaultIsOpen: function(chapterIdx) {
      return chapterIdx === 0
    }
  }
}
</script>

<style module lang="scss">
.editArea {
  margin-bottom: 20px;
  background-color: #f9f9f9;
}
.addChapterButtonContainer {
  color: blue;
  margin-bottom: 40px;
}

.footer {
  display: flex;

  button:first-child {
    margin-right: 16px;
  }
}
</style>
