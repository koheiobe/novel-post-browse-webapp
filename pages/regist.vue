<template>
  <div>
    <div class="form">
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          v-model="title"
          type="text"
          name="title"
          class="form-control"
          placeholder="タイトルを入力"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          v-model="description"
          class="form-control"
          name="description"
          rows="3"
          cols="30"
          placeholder="本文を入力"
        />
      </div>
    </div>
    <div>
      <button @click="submit" class="btn btn-primary">Submit</button>
      <b-button @click="back()" variant="outline-primary">Back</b-button>
    </div>
    <div v-if="errors.length !== 0">
      <template v-for="(error, errorIdx) in errors">
        <p v-if="error !== ''" :class="$style.error" :key="errorIdx">
          {{ error }}
        </p>
      </template>
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
    },
    back: function() {
      this.$router.push('/')
    }
  }
}
</script>

<style module>
.error {
  color: red;
}
</style>
