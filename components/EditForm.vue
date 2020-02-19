<template>
  <div>
    <BIconChevronRight v-if="!isOpen" @click="toggleForm" />
    <BIconChevronDown v-if="isOpen" @click="toggleForm" />
    <div v-if="isOpen">
      <div class="form">
        <div>
          title:
          <input v-model="title" type="text" name="title" />
        </div>
        <div>
          content:
          <textarea v-model="content" name="content" rows="3" cols="30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconChevronDown, BIconChevronRight } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'

export default {
  components: {
    BIconChevronDown,
    BIconChevronRight
  },
  data: function() {
    return {
      isOpen: false,
      title: '',
      content: ''
    }
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
  },
  methods: {
    toggleForm: function() {
      this.isOpen = !this.isOpen
    }
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
