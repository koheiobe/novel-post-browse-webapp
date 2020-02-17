<template>
  <div>
    <ul>
      <li v-for="(post, postIdx) in posts" :key="postIdx">
        <div>
          <ul :class="$style.postList">
            <li>title: {{ post.title }}</li>
            <li>
              <a v-on:click="goToPostDetail(post)"
                >content: {{ post.content }}</a
              >
            </li>
            <li>email: {{ post.email }}</li>
            <li>name: {{ post.name }}</li>
          </ul>
        </div>
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
        <p v-if="error !== ''" :class="$style.error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
    ...mapGetters({ loginUser: 'getLoginUser', posts: 'getPosts' })
  },
  created: function() {
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    ...mapMutations({ setPostDetail: 'setPostDetail' }),
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
          author: this.loginUser.name
        })
      }
      this.title = ''
      this.content = ''
    },
    goToPostDetail: function(post) {
      this.setPostDetail(post)
      this.$router.push('samplePost')
    }
  }
}
</script>

<style module>
ul.postList li {
  display: block;
  /* ここの幅は要調整 */
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

ul.postList li a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
