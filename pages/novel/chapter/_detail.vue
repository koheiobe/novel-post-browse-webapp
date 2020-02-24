<template>
  <div v-if="chapter !== null">
    <h2 :class="$style.title">{{ chapter.title }}</h2>
    <div :class="$style.contentArea">{{ chapter.content }}</div>
    <b-button @click="back()" variant="outline-primary">戻る</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as db from '~/plugins/database'

export default {
  computed: {
    ...mapGetters({
      loginUser: 'getLoginUser',
      novelDetail: 'getNovelDetail',
      chapter: 'getChapter'
    })
  },
  created: function() {
    this.$store.dispatch(
      'setChapterRef',
      db.getChapter(
        `${this.loginUser.email}-${this.novelDetail.title}`,
        this.$route.params.detail
      )
    )
  },
  methods: {
    back: function() {
      this.$router.push('/novel/detail')
    }
  }
}
</script>

<style module>
.title {
  margin-bottom: 40px;
}
.contentArea {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: 40px;
}
</style>
