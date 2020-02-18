<template>
  <div>
    <h1>title:{{ novelDetail.title }}</h1>
    <h2>content</h2>
    <p>{{ novelDetail.content }}</p>
    <h2>author:{{ novelDetail.author }}</h2>
    <b-button @click="back()" variant="outline-primary">Back</b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ novelDetail: 'getNovelDetail' })
  },
  methods: {
    back: function() {
      this.$router.push('samplePosts')
    }
  }
}
</script>

<style module></style>
