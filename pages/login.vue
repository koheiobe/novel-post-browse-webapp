<template>
  <div :class="$style.container">
    <div :class="$style.containerWrapper">
      <h1 :class="$style.loginTitle">小説投稿&閲覧サイト</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import firebase from '~/plugins/firebase'
import 'firebaseui/dist/firebaseui.css'

export default {
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }

    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style module>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #efefef;
}
.loginTitle {
  font-size: 28px;
  margin-bottom: 20px;
}
.containerWrapper {
  padding: 12px;
  border: 1px solid #afafaf;
  border-radius: 5px;
  margin-bottom: 33%;
  background-color: white;
}
</style>
