<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>novel post & browse site</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->

          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown> -->

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
            <b-dropdown-text>{{ userName }}</b-dropdown-text>
            <b-dropdown-item v-on:click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as auth from '~/plugins/auth'
import { db } from '~/plugins/database.js'

export default {
  computed: {
    ...mapGetters({ user: 'getLoginUser' }),
    userName: function() {
      return this.user.name
    }
  },
  created: function() {
    this.$store.dispatch('setUsersRef', db.collection('users'))
  },
  async mounted() {
    const user = await auth.getCurrentLoginUser()
    // ログインしてなかったらログイン画面へ
    if (!user) {
      this.$router.push('login')
      return null
    }
    if (user.email === '') {
      this.setUser({
        name: 'Guest',
        email: ''
      })
    }
    const userRef = db.collection('users').doc(user.email)
    const registerdUser = await userRef.get()
    // ログインしたユーザーがDBに登録されていなければ、登録する
    if (registerdUser.exists) {
      this.setUser(registerdUser.data())
    } else {
      this.registerUser(user)
    }
  },
  methods: {
    ...mapMutations({ setUser: 'setUser' }),
    logout: function() {
      auth.logout().then(this.$router.push('login'))
    },
    registerUser: function(user) {
      const usersCollection = db.collection('users')
      // ユーザーの判定方法はemailを使用
      usersCollection.doc(user.email).set({
        name: user.displayName,
        email: user.email
      })
    }
  }
}
</script>

<style module></style>
