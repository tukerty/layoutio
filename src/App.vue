<template>
  <div id="app">
    <div class="wrapper">
      <div class="settings">
        <div class="field is-grouped">
          <div class="control">
            <input class="input numput" v-model="magStrength">
          </div>
          <div class="control">
            <input class="input numput" v-model="magSize">
          </div>
          <b-switch type="is-danger" v-model="bamActive"></b-switch>
          <p>Enable BAM &nbsp; </p>
          <b-switch type="is-info" v-model="reviewMode" v-on:input="redrawImages()" ></b-switch>
          <p>Review Mode</p>
        </div>
      </div>
      <div class="images">
        <left-image ref="left" @update="handleLeft" @scrolled="handleScrollLeft" @ready="handleReadyLeft" v-bind:magSize="magSize" v-bind:magStrength="magStrength" v-bind:reviewMode="reviewMode" />
        <right-image ref="right" @update="handleRight" @scrolled="handleScrollRight" @ready="handleReadyRight" v-bind:magSize="magSize" v-bind:magStrength="magStrength" v-bind:reviewMode="reviewMode" />
      </div>
      <div class="buttons">
        <button @click="sendData" class="button is-big sendbtn">Send</button>
      </div>
      <big-ass-magnifier ref="bam" v-if="canUseBAM" :class="{'hidden': !bamActive}" v-bind:magStrength="magStrength" />
    </div>
  </div>
</template>

<script>
import LeftImage from './components/LeftImage'
import RightImage from './components/RightImage'
import BigAssMagnifier from './components/BigAssMagnifier'

export default {
  name: 'App',
  data () {
    return {
        reviewMode: false,
        bamActive: true,
        magStrength: 4,
        magSize: 100,
        canUseBAM: false,
        loading: false,
        leftReady: false,
        rightReady: false,
        leftPoints: [],
        leftLines: [],
        rightPoints: [],
        rightLines: [],
        userId: undefined,      
    }
  },
  components: {
    RightImage,
    LeftImage,
    BigAssMagnifier
  },
  mounted(){
    let uri = window.location.search.substring(1); 
    let params = new URLSearchParams(uri);
    this.userId = params.get("userId")
  },
  methods: {
    handleLeft(event) {
      this.leftPoints = event.points
      this.leftLines = event.lines
    },
    handleRight(event) {
      this.rightPoints = event.points
      this.rightLines = event.lines
    },
    handleScrollLeft() {
      this.$refs.bam.redrawLeftScroll()
    },
    handleScrollRight() {
      this.$refs.bam.redrawRightScroll()
    },
    handleReadyLeft(){
      this.leftReady = true
      if (this.rightReady){
        this.canUseBAM = true
      }
    },
    handleReadyRight(){
      this.rightReady = true
      if (this.leftReady){
        this.canUseBAM = true
      }
    },
    redrawImages(){
      console.log('rr')
      setTimeout(()=>{
      this.$refs.left.redrawCanvas()
      this.$refs.right.redrawCanvas()

      },10)

    },
    sendData(){
    }
  }
}
</script>

<style>
*{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html{
  overflow-x: scroll!important;
  overflow-y: scroll!important;
}
body{
  background: linear-gradient(to top, #0f2027, #203a43, #2c5364); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  min-width: 1330px;
  background-repeat: no-repeat;
  background-size: cover;
}
#app{
  display: flex;
  justify-content: center;
  align-items: center;
}
.sendbtn{
  margin: auto;
  width:30vw;
}
.buttons{
  margin-top: 20px;
  text-align: center
}
.images{
  display: flex;
  justify-content: center;
  align-items: center;
}
.images div{
  padding: 10px;
}
.settings{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.input.numput{
  width: 60px;
}
.field.is-grouped{

  align-items: center;
}
p{
  color: #FFF;
}
.hidden{
  display: none;
}
</style>
