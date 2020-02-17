<template>
  <div>
    <ul>
      <li v-for="(post, postIdx) in posts" :key="postIdx">
        <div>
          <ul :class="$style.postList">
            <li>title: {{ post.title }}</li>
            <li>
              <a @click="goToPostDetail(post)"
                >description: {{ post.description }}</a
              >
            </li>
            <li>email: {{ post.email }}</li>
            <li>name: {{ post.name }}</li>
          </ul>
        </div>
      </li>
    </ul>
    <nuxt-link to="sampleRegisterPost"
      ><b-button variant="outline-primary">小説を書く</b-button></nuxt-link
    >
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  computed: {
    ...mapGetters({ posts: 'getPosts' })
  },
  created: function() {
    this.$store.dispatch('setPostsRef', db.collection('posts'))
  },
  methods: {
    ...mapMutations({ setPostDetail: 'setPostDetail' }),
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
</style>
