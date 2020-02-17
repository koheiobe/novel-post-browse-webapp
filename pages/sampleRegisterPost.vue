<template>
  <div>
    <div class="form">
      <div>
        title:
        <input v-model="title" type="text" name="title" />
      </div>
      <div>
        description:
        <textarea v-model="description" name="description" rows="3" cols="30" />
      </div>
      <div>
        <button @click="submit">Submit</button>
      </div>
      <div v-if="errors.length !== 0">
        <template v-for="(error, errorIdx) in errors">
          <p v-if="error !== ''" :class="$style.error" :key="errorIdx">
            {{ error }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
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
    ...mapGetters({ loginUser: 'getLoginUser' })
  },
  methods: {
    submit: async function() {
      this.errors = []
      if (this.loginUser.email === '') {
        this.errors.push('投稿するにはログインしてください。')
        return
      }
      const postRef = db
        .collection('posts')
        .doc(`${this.loginUser.email}-${this.title}`)

      const post = await postRef.get()

      if (post.exists) {
        this.errors.push('すでに同名のタイトルが存在します。')
      } else {
        this.error = ''
        postRef.set({
          email: this.loginUser.email,
          title: this.title,
          description: this.description,
          author: this.loginUser.name,
          createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
      }
      this.title = ''
      this.description = ''
    }
  }
}
</script>

<style module>
.error {
  color: red;
}
</style>
