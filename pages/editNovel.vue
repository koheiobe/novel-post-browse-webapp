<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  data: function() {
    return {
      title: '',
      description: '',
      errors: []
    }
  },
  computed: {
    ...mapGetters({
      loginUser: 'getLoginUser',
      novels: 'getNovels'
    }),
    loginUserNovels: function() {
      return this.novels.filter((novel) => novel.email === this.loginUser.email)
    }
  },
  created: function() {
    this.$store.dispatch('setNovelsRef', db.collection('novels'))
  }
}
</script>

<style module>
.novelList {
  margin-bottom: 20px;
}
.error {
  color: red;
}
</style>
