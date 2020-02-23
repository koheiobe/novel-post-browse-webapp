<template>
  <div class="card border-light mb-3">
    <div class="card-header">
      <h1>title:{{ novelDetail.title }}</h1>
      <h2>content</h2>
      <p>{{ novelDetail.content }}</p>
      <h2>author:{{ novelDetail.author }}</h2>
    </div>
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
    <nuxt-link to="/">
      <b-button variant="outline-primary">小説一覧に戻る</b-button>
    </nuxt-link>
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
  }
}
</script>

<style module></style>
