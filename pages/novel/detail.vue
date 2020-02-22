<template>
  <div>
    <h1>title:{{ novelDetail.title }}</h1>
    <h2>content</h2>
    <p>{{ novelDetail.content }}</p>
    <h2>author:{{ novelDetail.author }}</h2>
    <h2>Chapters</h2>
    <div>
      <ul>
        <li v-for="(chapter, idx) in chapters" :key="idx">
          <nuxt-link :to="'/novel/chapter/' + chapter.index">
            {{ chapter.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <b-button @click="back()" variant="outline-primary"
      >小説一覧に戻る</b-button
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as db from '~/plugins/database'

export default {
  computed: {
    ...mapGetters({
      novelDetail: 'getNovelDetail',
      chapters: 'getChapters',
      loginUser: 'getLoginUser'
    })
  },
  created: function() {
    this.$store.dispatch(
      'setChaptersRef',
      db.getChapters(`${this.loginUser.email}-${this.novelDetail.title}`)
    )
  },
  methods: {
    back: function() {
      this.$router.push('/samplePosts')
    }
  }
}
</script>

<style module></style>
