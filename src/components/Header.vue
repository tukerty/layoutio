<template>
    <div class="header" v-if="visible">

    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
        visible: true
    }
  },
  methods:{
      hide(){
          this.visble = false
      }
  }
}
</script>

<style scoped>

</style>
