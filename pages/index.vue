<template>
  <div>
    <div :class="$style.tableHeader">
      <b-form-select
        :class="$style.selectbox"
        v-model="selected"
        :options="options"
        @change="onChangeSelect"
      >
      </b-form-select>
    </div>
    <!-- 小説一覧 -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(novel, novelIdx) in novels" :key="novelIdx">
          <td>{{ novelIdx + 1 }}</td>
          <td :class="$style.title">
            <a v-on:click="goToDetail(novel)">{{ novel.title }}</a>
          </td>
          <td>
            {{ novel.description }}
          </td>
          <td>{{ novel.author }}</td>
        </tr>
      </tbody>
    </table>
    <nuxt-link to="/novel/register"
      ><b-button variant="outline-primary">小説を書く</b-button></nuxt-link
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as db from '~/plugins/database.js'
export default {
  data: function() {
    return {
      selected: null,
      options: [
        { value: null, text: '選択', disabled: true },
        { value: 'newer', text: '新しい順' },
        { value: 'older', text: '古い順' },
        { value: 'author', text: '著者' }
      ]
    }
  },
  computed: {
    ...mapGetters({ users: 'getUsers', novels: 'getNovels' })
  },
  created: function() {
    this.$store.dispatch('setNovelsRef', db.getNovels())
  },
  methods: {
    ...mapMutations({ setNovelDetail: 'setNovelDetail' }),
    goToDetail: function(novel) {
      this.setNovelDetail(novel)
      this.$router.push('/novel/detail')
    },
    onChangeSelect: function(value) {
      switch (value) {
        case 'newer':
          this.novels.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          break
        case 'older':
          this.novels.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
          break
        // TODO 挙動未確認
        case 'author':
          this.novels.sort((a, b) =>
            a.author > b.author ? 1 : b.author < a.author ? -1 : 0
          )
          break
      }
    }
  }
}
</script>

<style module>
.tableHeader {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
.selectbox {
  width: 200px;
}
.title a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
