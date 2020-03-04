<template>
  <div>
    <h2>投稿した小説一覧</h2>
    <div :class="$style.tableContainer">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(novel, novelIdx) in loginUserNovels" :key="novelIdx">
            <td>
              <a>{{ novel.title }}</a>
            </td>
            <td>
              {{ novel.description }}
            </td>
            <td>
              <b-button
                :class="$style.button"
                @click="goToEdit(novel)"
                variant="outline-primary"
                >小説編集ページへ行く</b-button
              >
            </td>
            <td>
              <b-button
                :class="$style.button"
                @click="deleteNovel(novel)"
                variant="danger"
                >削除する</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form">
      <h2>小説を登録する</h2>

      <div :class="$style.formContainer">
        <div class="form-group">
          <label for="title">タイトル</label>
          <input
            v-model="title"
            type="text"
            name="title"
            class="form-control"
            placeholder="タイトルを入力"
          />
          <label for="description">説明</label>
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
          <b-button @click="submit" variant="primary">登録する</b-button>
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
      // TODO 一時的にコメントアウト
      if (this.loginUserNovels.length >= 3) {
        this.errors.push('小説の投稿数は３つまでです')
        return
      }
      if (this.title === '') {
        this.errors.push('タイトルを入力してください')
        return
      }
      if (this.description === '') {
        this.errors.push('説明文を入力してください')
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
        db.setChapter(novelId, '1', { title: '', content: '' })
      }
      this.title = ''
      this.description = ''
    },
    deleteNovel: function(novel) {
      db.deleteNovel(`${this.loginUser.email}-${novel.title}`)
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
.button {
  width: 200px;
}
.tableContainer {
  margin-bottom: 40px;
}
.formContainer {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 16px;
}
</style>
