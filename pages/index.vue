<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
    <template>
      <div>
        <b-form-select
          v-model="selected"
          :options="options"
          @change="onChangeSelect"
        >
        </b-form-select>
        <div class="mt-3">
          Selected: <strong>{{ selected }}</strong>
        </div>
      </div>
    </template>
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
          <td>{{ novel.title }}</td>
          <td class="description">
            <a v-on:click="goToDetail(novel)">{{ novel.description }}</a>
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

<style></style>
