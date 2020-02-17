<template>
  <div>
    <h1>title:{{ postDetail.title }}</h1>
    <h2>content</h2>
    <p>{{ postDetail.content }}</p>
    <h2>author:{{ postDetail.author }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ postDetail: 'getPostDetail' })
  }
}
</script>

<style module></style>
