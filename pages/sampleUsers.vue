<template>
  <div>
    <h1>firestore contents here</h1>
    <h2>{{ loginUser.displayName }}</h2>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/database.js'
import auth from '~/plugins/auth.js'

export default {
  data: function() {
    return {
      name: '',
      email: '',
      loginUser: {}
    }
  },
  computed: {
    ...mapGetters({ users: 'getUsers' })
  },
  created: async function() {
    this.loginUser = await auth()
    this.$store.dispatch('setUsersRef', db.collection('users'))
  },
  methods: {
    submit: function() {
      const user = {
        name: this.name,
        email: this.email
      }
      const usersRef = db.collection('users')
      usersRef.add(user)
      this.name = ''
      this.email = ''
    }
  }
}
</script>

<style></style>
