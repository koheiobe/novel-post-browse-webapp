<template>
  <div>
    <!-- ページネーションの仮実装 -->
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
    <nuxt-link to="regist"
      ><b-button variant="outline-primary">小説を書く</b-button></nuxt-link
    >
  </div>
  <!-- <div>
    <h1>firestore contents here</h1>
    <h2>{{ userName }}</h2>
    <ul>
      <li v-for="(user, userIdx) in users" :key="userIdx">
        <ul>
          <li>name: {{ user.name }}</li>
          <li>email: {{ user.email }}</li>
        </ul>
      </li>
    </ul>
    <div class="form">
      <h1>I know, but this is the form!</h1>
      <div>
        Name:
        <input v-model="name" type="text" name="name" />
      </div>
      <div>
        email:
        <input v-model="email" type="text" name="email" />
      </div>
      <div>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { db } from '~/plugins/database.js'
import { getCurrentLoginUser } from '~/plugins/auth.js'

export default {
  data: function() {
    return {
      name: '',
      email: '',
      loginUser: {},
      title: '',
      content: '',
      author: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({ users: 'getUsers', posts: 'getPosts' }),
    userName: function() {
      return this.loginUser.displayName || 'ゲスト'
    }
  },
  created: async function() {
    this.loginUser = await getCurrentLoginUser()
    this.$store.dispatch('setUsersRef', db.collection('users'))
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    ...mapMutations({ setPostDetail: 'setPostDetail' }),
    submit: function() {
      const user = {
        name: this.name,
        email: this.email
      }
      const usersRef = db.collection('users')
      usersRef.doc(this.email).set(user)
      this.name = ''
    },
    goToDetail: function(post) {
      this.setPostDetail(post)
      this.$router.push('detail')
    }
  }
}
</script>

<style>
.description {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
