<template>
  <div class="card border-light mb-3">
    <div class="card-header">
      <h2>title:{{ novelDetail.title }}</h2>
      <h3>author:{{ novelDetail.author }}</h3>
    </div>
    <div :class="$style.chaptersContainer">
      <h2>Chapters</h2>
      <b-list-group v-if="!isFirstTitleEmpty">
        <template v-for="(chapter, idx) in chapters">
          <nuxt-link :to="'/novel/chapter/' + chapter.index" :key="idx">
            <b-list-group-item>{{ chapter.title }}</b-list-group-item>
          </nuxt-link>
        </template>
      </b-list-group>
      <!-- <ul>
        <li v-for="(chapter, idx) in chapters" :key="idx">
          <nuxt-link :to="'/novel/chapter/' + chapter.index">
            {{ chapter.title }}
          </nuxt-link>
        </li>
      </ul> -->
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
    }),
    isFirstTitleEmpty: function() {
      return this.chapters[0] && this.chapters[0].title === ''
    }
  },
  created: function() {
    this.$store.dispatch(
      'setChaptersRef',
      db.getChapters(`${this.novelDetail.email}-${this.novelDetail.title}`)
    )
  }
}
</script>

<style module lang="scss">
.chaptersContainer {
  padding: 16px;

  h2 {
    margin-bottom: 16px;
  }
}
</style>
