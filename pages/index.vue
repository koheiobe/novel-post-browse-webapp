<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>1 of 3</b-col>
        <b-col>2 of 3</b-col>
        <b-col>3 of 3</b-col>
      </b-row>
    </b-container>
  </div>
  <!-- <div>
    <h1>firestore contents here</h1>
    <h2>{{ userName }}</h2>
    <ul>
      <li v-for="(user, userIdx) in users" :key="userIdx">
        <ul>
          <li>name: {{ user.name }}</li>
          <li>email: {{ user.email }}</li>
        </ul>
      </li>
    </ul>
    <div class="form">
      <h1>I know, but this is the form!</h1>
      <div>
        Name:
        <input v-model="name" type="text" name="name" />
      </div>
      <div>
        email:
        <input v-model="email" type="text" name="email" />
      </div>
      <div>
        <button @click="submit">Submit</button>
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'
import { getCurrentLoginUser } from '~/plugins/auth.js'

export default {
  data: function() {
    return {
      name: '',
      email: '',
      loginUser: {}
    }
  },
  computed: {
    ...mapGetters({ users: 'getUsers' }),
    userName: function() {
      return this.loginUser.displayName || 'ゲスト'
    }
  },
  created: async function() {
    this.loginUser = await getCurrentLoginUser()
    this.$store.dispatch('setUsersRef', db.collection('users'))
  },
  methods: {
    submit: function() {
      const user = {
        name: this.name,
        email: this.email
      }
      const usersRef = db.collection('users')
      usersRef.doc(this.email).set(user)
      this.name = ''
    }
  }
}
</script>

<style></style>
