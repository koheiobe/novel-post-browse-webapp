<template>
  <div>
    <h1>title:{{ postDetail.title }}</h1>
    <h2>content</h2>
    <p>{{ postDetail.content }}</p>
    <h2>author:{{ postDetail.author }}</h2>
    <b-button @click="back()" variant="outline-primary">Back</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ postDetail: 'getPostDetail' })
  },
  methods: {
    back: function() {
      this.$router.push('samplePosts')
    }
  }
}
</script>

<style module></style>
