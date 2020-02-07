<template>
  <div>
    <div id="firebaseui-auth-container"></div>
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
