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
        <tr v-for="(post, postIdx) in posts" :key="postIdx">
          <td>{{ postIdx + 1 }}</td>
          <td>{{ post.title }}</td>
          <td class="description">
            <a v-on:click="goToDetail(post)">{{ post.description }}</a>
          </td>
          <td>{{ post.author }}</td>
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
  computed: {
    ...mapGetters({ users: 'getUsers', posts: 'getNovels' })
  },
  created: function() {
    this.$store.dispatch('setNovelsRef', db.getNovels())
  },
  methods: {
    ...mapMutations({ setNovelDetail: 'setNovelDetail' }),
    goToDetail: function(post) {
      this.setNovelDetail(post)
      this.$router.push('/novel/detail')
    }
  }
}
</script>

<style></style>
