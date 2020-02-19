<template>
  <div>
    <div class="card border-light mb-3">
      <div class="card-header">
        <!-- 小説のタイトル -->
        <h1>{{ postDetail.title }}</h1>
        <h2>{{ postDetail.author }}</h2>
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ postDetail.description }}
        </p>
      </div>
    </div>
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
      this.$router.push('/')
    }
  }
}
</script>

<style module></style>
