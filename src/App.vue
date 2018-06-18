<template>
  <div id="app">
    <loader v-if="loading"/>
    <login v-if="!loading"/>
    <current-image/>
  </div>
</template>

<script>
import Loader from './components/Loader'
import Login from './components/Login'
import CurrentImage from './components/CurrentImage'

export default {
  name: 'App',
  data () {
    return {
        loading: true
    }
  },
  components: {
    CurrentImage,
    Loader,
    Login
  },
  methods: {

  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000) 
  }
}
</script>

<style>
*{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html{
  overflow: hidden;
}
body{
  background-image: url('./assets/bg.jpg');
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
