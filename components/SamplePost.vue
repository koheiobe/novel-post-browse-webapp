<template>
  <div>
    <ul>
      <li v-for="(post, postIdx) in posts" :key="postIdx">
        <ul>
          <li>title: {{ post.title }}</li>
          <li>content: {{ post.content }}</li>
          <li>email: {{ post.email }}</li>
          <li>name: {{ post.name }}</li>
        </ul>
      </li>
    </ul>
    <div class="form">
      <div>
        title:
        <input v-model="title" type="text" name="title" />
      </div>
      <div>
        content:
        <textarea v-model="content" name="content" rows="10" cols="60" />
      </div>
      <div>
        <button @click="submit">Submit</button>
      </div>
      <div>
        <p v-if="error !== ''" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  data: function() {
    return {
      title: '',
      content: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters({ posts: 'getPosts' }),
    ...mapGetters({ loginUser: 'getLoginUser' })
  },
  created: function() {
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    submit: async function() {
      const postRef = db
        .collection('posts')
        .doc(`${this.loginUser.email}-${this.title}`)

      const post = await postRef.get()

      if (post.exists) {
        this.error = 'すでに同名のタイトルが存在します。'
      } else {
        this.error = ''
        postRef.set({
          email: this.loginUser.email,
          title: this.title,
          content: this.content,
          name: this.loginUser.name
        })
      }
      this.title = ''
      this.content = ''
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
