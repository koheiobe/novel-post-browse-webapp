<template>
  <div>
    <h1>title:{{ novelDetail.title }}</h1>
    <h2>content</h2>
    <p>{{ novelDetail.content }}</p>
    <h2>author:{{ novelDetail.author }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ novelDetail: 'getNovelDetail' })
  },
  created: function() {
    this.$store.dispatch('setChaptersRef', this.chaptersRef)
  },
  methods: {
    back: function() {
      this.$router.push('samplePosts')
    }
  }
}
</script>

<style module></style>
