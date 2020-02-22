<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand
        ><nuxt-link :class="$style.title" to="/"
          >novel post & browse site</nuxt-link
        ></b-navbar-brand
      >

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
            <b-dropdown-item @click="goToRegister">投稿</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as auth from '~/plugins/auth'
import * as db from '~/plugins/database.js'

export default {
  computed: {
    ...mapGetters({ loginUser: 'getLoginUser' }),
    userName: function() {
      return this.loginUser.name
    }
  },
  created: function() {
    this.syncFirestoreVuex()
  },
  async mounted() {
    const user = await auth.getCurrentLoginUser()
    // ログインしてなかったらログイン画面へ
    if (!user) {
      this.logout()
      return null
    }
    // ユーザーemailが存在しなければゲストとして一時的にログインさせる
    if (user.email === '' || user.email === null) {
      this.setLoginUser({
        name: 'Guest',
        email: ''
      })
      return null
    }
    const userRef = db.getUser(user.email)
    const registerdUser = await userRef.get()
    // ログインしたユーザーがDBに登録されていなければ、登録する
    if (registerdUser.exists) {
      this.setLoginUser(registerdUser.data())
    } else {
      this.registerUser(user)
    }
  },
  methods: {
    ...mapMutations({ setLoginUser: 'setLoginUser' }),
    logout: function() {
      auth.logout().then(this.$router.push('/login'))
    },
    registerUser: function(user) {
      db.setUser(user.email, user)
    },
    goToRegister: function() {
      this.$router.push('/novel/register')
    },
    syncFirestoreVuex: function() {
      this.$store.dispatch('setUsersRef', db.getUsers())
    }
  }
}
</script>

<style module>
.title {
  color: white;
}
</style>
