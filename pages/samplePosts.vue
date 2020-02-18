<template>
  <div>
    <ul>
      <li v-for="(novel, novelIdx) in novels" :key="novelIdx">
        <div>
          <ul :class="$style.novelList">
            <li>title: {{ novel.title }}</li>
            <li>
              <a @click="goTonovelDetail(novel)"
                >description: {{ novel.description }}</a
              >
            </li>
            <li>email: {{ novel.email }}</li>
            <li>author: {{ novel.author }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  computed: {
    ...mapGetters({ novels: 'getNovels' })
  },
  created: function() {
    this.$store.dispatch('setNovelsRef', db.collection('novels'))
  },
  methods: {
    ...mapMutations({ setNovelDetail: 'setNovelDetail' }),
    goToNovelDetail: function(novels) {
      this.setNovelDetail(novels)
      this.$router.push('novel')
    }
  }
}
</script>

<style module>
ul.novelList li {
  display: block;
  /* ここの幅は要調整 */
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

ul.novelList li a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
