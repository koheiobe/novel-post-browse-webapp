<template>
  <div :class="$style.container">
    <NavBar :class="$style.navbar" />
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="11">
          <nuxt :class="$style.nuxt" />
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import NavBar from '~/components/NavBar'
export default {
  components: {
    NavBar
  }
}
</script>

<style module>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  margin-bottom: 40px;
}

.navbar {
  margin-bottom: 40px;
}

.nuxt {
  max-width: 1200px;
}
</style>
