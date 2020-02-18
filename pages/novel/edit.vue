<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters({
      editNovelId: 'getEditNovelId',
      chapters: 'getChapters'
    }),
    loginUserNovels: function() {
      return this.novels.filter((novel) => novel.email === this.loginUser.email)
    }
  },
  created: function() {
    if (this.editNovelId === '') {
      this.$router.push('/novel/register')
      return
    }
    this.$store.dispatch(
      'setNovelChaptersRef',
      db
        .collection('novels')
        .doc(this.editNovelId)
        .collection('chapters')
    )
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
