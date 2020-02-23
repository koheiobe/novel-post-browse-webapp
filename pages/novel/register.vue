<template>
  <div>
    <div>
      <h2>投稿した小説一覧</h2>
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
      <h2>小説を登録する</h2>
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
import * as db from '~/plugins/database.js'

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
    this.$store.dispatch('setNovelsRef', db.getNovels())
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
      const novelId = `${this.loginUser.email}-${this.title}`
      const novelRef = db.getNovel(novelId)
      const novel = await novelRef.get()

      if (novel.exists) {
        this.errors.push('すでに同名のタイトルが存在します。')
      } else {
        db.setNovel(novelId, {
          email: this.loginUser.email,
          title: this.title,
          description: this.description,
          author: this.loginUser.name
        })
        db.setChapter(novelId, 1, { title: '', content: '' })
      }
      this.title = ''
      this.description = ''
    },
    goToEdit: function(novel) {
      this.$store.commit('setEditNovelId', `${novel.email}-${novel.title}`)
      this.$router.push('/novel/chapter/edit')
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
