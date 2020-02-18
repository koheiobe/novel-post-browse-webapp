<template>
  <div>
    <div>
      <ul>
        <li v-for="(novel, novelIdx) in loginUserNovels" :key="novelIdx">
          <div :class="$style.novelList">
            <ul>
              <li>title: {{ novel.title }}</li>
              <li>description: {{ novel.description }}</li>
              <li>email: {{ novel.email }}</li>
              <li>author: {{ novel.author }}</li>
            </ul>
            <b-button @click="goToEdit(novel)" variant="outline-primary"
              >小説編集ページへ行く</b-button
            >
          </div>
        </li>
      </ul>
    </div>
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
  },
  methods: {
    submit: async function() {
      this.errors = []
      if (this.loginUser.email === '') {
        this.errors.push('投稿するにはログインしてください。')
        return
      }
      if (this.loginUserNovels.length >= 3) {
        this.errors.push('小説の投稿数は３つまでです')
        return
      }
      const novelRef = db
        .collection('novels')
        .doc(`${this.loginUser.email}-${this.title}`)

      const novel = await novelRef.get()

      if (novel.exists) {
        this.errors.push('すでに同名のタイトルが存在します。')
      } else {
        this.error = ''
        novelRef.set({
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
    goToEdit: function(novel) {
      this.$store.commit('setEditNovelId', `${novel.email}-${novel.title}`)
      this.$router.push('/novel/edit')
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
