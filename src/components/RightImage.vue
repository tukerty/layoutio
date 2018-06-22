<template>
  <div id="currentimage" :class="{cursorHidden: showZoom}" @mousewheel="handleScroll">
    <h1>Current point: <span>{{newId}}</span></h1>
    <canvas id="right-main" width="640" height="400" style="border:1px solid #BBB" @mouseup="mouseUp" @mousemove="mouseMove" @mousedown="mouseDown" @contextmenu="preventContext">
    </canvas>
    <canvas id="right-zoom" :width="magSize" :height="magSize" v-bind:class="{hidden: !showZoom}"></canvas>
    <img id="right-img" src="../assets/LowerArm.png" alt="">
    <h3>Picture type: {{picType}} - {{maxpoints}} /  {{maxlines}}</h3>
  </div>
</template>

<script>
export default {
  name: 'RightImage',
  data () {
    return {
      picType: '',
      maxpoints: undefined,
      maxlines: undefined,
      showZoom: false,
      lineMode: false,
      currentIndex: 0,
      newId: 1,
      pointsArray: [],
      linesArray: [],
      collideLine: undefined,
      collideIndex: undefined,
      image: undefined,
      mainc: undefined,
      mainctx: undefined,
      zoomc: undefined,
      zoomctx: undefined,
    }
  },
  props: ['magSize', 'magStrength', 'reviewMode'],
  mounted(){
    this.mainc = document.getElementById("right-main")
    this.mainctx = this.mainc.getContext("2d")
    this.zoomc = document.getElementById("right-zoom")
    this.zoomctx = this.zoomc.getContext("2d")
    this.image = document.getElementById("right-img")
    this.image.onload = () => {
      this.mainctx.drawImage(this.image, 640, 0, 640, 400,0, 0,640,400)
      console.log(this.image.src)
      if (this.image.src.includes('LowerArm')){
        this.picType = 'LowerArm'
        this.maxpoints = 10
        this.maxlines = 1
      }
      else if (this.image.src.includes('UpperArm')){
        this.picType = 'UpperArm'
        this.maxpoints = 5
        this.maxlines = 0
      }
      else if (this.image.src.includes('Recent')){
        this.picType = 'Recenter'
        this.maxpoints = 14
        this.maxlines = 0
      }
      this.$emit('ready')
    }
    this.mainctx.translate(0.5, 0.5);
    this.zoomctx.translate(0.5, 0.5);
  },
  methods: {
    handleScroll(event){
      event.preventDefault()
      this.redrawCanvas()
      if (event.deltaY < 0){
        this.newId += 1
        if (this.newId > this.maxpoints){
          this.newId = 1
        }
      }
      else {
        this.newId -= 1
        if (this.newId < 1){
          this.newId = this.maxpoints
        }
      }
      this.redrawCanvas()
      
      setTimeout(()=>{
        this.$emit('scrolled')
      },10)
    },
    addEmptyPoint(){

    },
    preventContext(event){
      event.preventDefault()
    },
    mouseUp(event){

      switch(event.button) {
        case 0:
          break;
        case 1:
          this.lineMode = false
          break;
        case 2:
          this.removeItem(event)
          break;
        default:
          return 0
      }

      this.setPoint(event)
      this.redrawCanvas()
      this.moveZoom(event)
      this.showZoom = false
    },
    mouseMove(event){

      switch(event.button) {
        case 0:
          break;
        case 1:
          break;
        default:
          return 0
      }
      this.moveZoom(event)
      this.redrawCanvas()
      this.moveZoom(event)
    },
    mouseDown(event){
      switch(event.button) {
        case 0:
          if (this.lineMode == true){
            this.putLineEnd(event)
          }
          else if (event.ctrlKey){
            this.putLineStart(event)
          }
          else{
            this.putNewPoint(event)
          }
          break;
        case 1:
          this.dropLine(event)
          this.movePoint(event)
          break;
        case 2:
          this.dropLine(event)
          break;
        default:
          return 0
      }

      this.redrawCanvas()
      this.moveZoom(event)
      this.showZoom = true
    },
    putNewPoint(event){
      let x = event.offsetX
      let y = event.offsetY
      for (let iter = 0; iter < this.pointsArray.length; iter++){
        let point = this.pointsArray[iter]
        if (point.id == this.newId){
          this.pointsArray.splice(iter,1)
        }
      }
      this.pointsArray.push({x:x,y:y, id:this.newId})
      this.newId += 1
      if (this.newId > this.maxpoints){
        this.newId = 1
      }
      this.collideIndex = this.pointsArray.length - 1
      this.redrawCanvas()
    },
    setPoint(event){
      this.collideIndex = undefined
      this.collideLine = undefined
    },

    dropLine(event){
      if (this.lineMode == true){
        this.lineMode = false
        this.collideLine = undefined
        this.linesArray.splice(-1,1)
      }
    },

    removeItem(event){
      let x = event.offsetX
      let y = event.offsetY
      let deleted = 0;
      for (let iter = 0; iter < this.pointsArray.length; iter++){
        let point = this.pointsArray[iter]
        if (Math.abs(point.x - x) < 5 && Math.abs(point.y - y) < 5 && deleted == 0){
          this.pointsArray.splice(iter,1)
          this.newId = iter
        }
      }
      this.newId += 1
      if (this.newId > this.maxpoints){
        this.newId = 1
      }
      for (let iter = 0; iter < this.linesArray.length; iter++){
        let line = this.linesArray[iter]
        if (Math.abs(line.x1 - x) < 5 && Math.abs(line.y1 - y) < 5 && deleted == 0 || Math.abs(line.x2 - x) < 5 && Math.abs(line.y2 - y) < 5 && deleted == 0){ 
          this.linesArray[iter].x1 = undefined
          this.linesArray[iter].y1 = undefined
          this.linesArray[iter].x2 = undefined
          this.linesArray[iter].y2 = undefined
        }
      }
    },

    putLineStart(event){
      console.log('line Start')
      let x = event.offsetX
      let y = event.offsetY
      this.lineMode = true
      this.linesArray.push({
        x1:x,
        y1:y,
        x2:undefined,
        y2:undefined
      })
      this.collideLine = this.linesArray.length - 1
      this.redrawCanvas()
    },

    putLineEnd(event){
      console.log('line End')
      let x = event.offsetX
      let y = event.offsetY
      this.lineMode = false
      this.collideLine = this.linesArray.length - 1
      this.linesArray[this.collideLine].x2 = x
      this.linesArray[this.collideLine].y2 = y
      this.redrawCanvas()
    },

    moveZoom(event){
      let x = event.offsetX;
      let y = event.offsetY;
      this.zoomctx.fillStyle = "white";
      this.zoomctx.clearRect(0,0, this.zoomc.width, this.zoomc.height);
      this.zoomctx.fillStyle = "transparent";
      this.zoomctx.fillRect(0,0, this.zoomc.width, this.zoomc.height);
      this.zoomctx.drawImage(this.mainc, x-this.magSize / this.magStrength /2, y-this.magSize / this.magStrength /2, this.magSize / this.magStrength, this.magSize / this.magStrength, 0,0, this.magSize, this.magSize);
      
      this.zoomc.style.top = event.pageY - this.magSize/2 + "px"
      this.zoomc.style.left = event.pageX - this.magSize/2 + "px"

      if (this.collideIndex != undefined){
        this.pointsArray[this.collideIndex].x = x
        this.pointsArray[this.collideIndex].y = y
      }
      if (this.collideLine != undefined && this.lineMode == true){
        this.linesArray[this.collideLine].x1 = x
        this.linesArray[this.collideLine].y1 = y
      }

      if (this.collideLine != undefined && this.lineMode == false){
        this.linesArray[this.collideLine].x2 = x
        this.linesArray[this.collideLine].y2 = y
      }

    },
    movePoint(event){
      this.showZoom = true
      let x = event.offsetX
      let y = event.offsetY
      for (let iter = 0; iter < this.pointsArray.length; iter++){
        let point = this.pointsArray[iter]
        if (Math.abs(point.x - x) < 5 && Math.abs(point.y - y) < 5){
          console.log("collide with " + iter)
          this.collideIndex = iter
        }
      }

      for (let iter = 0; iter < this.linesArray.length; iter++){
        let line = this.linesArray[iter]
        if (Math.abs(line.x1 - x) < 5 && Math.abs(line.y1 - y) < 5){
          console.log("collide with " + iter)
          this.lineMode = true
          this.collideLine = iter
        }
        if (Math.abs(line.x2 - x) < 5 && Math.abs(line.y2 - y) < 5){
          console.log("collide with " + iter)
          this.collideLine = iter
        }
      }
    },
    moveCircle(){
      this.showZoom = false
    },
    redrawCanvas(){
      this.$emit('update', {points:this.pointsArray, lines: this.linesArray})
      this.mainctx.drawImage(this.image, 640, 0, 640, 400,0, 0,640,400)
      for (let iter = 0; iter < this.pointsArray.length; iter++){
        let point = this.pointsArray[iter]
        if (this.reviewMode == true && point.id == this.newId){
          this.mainctx.fillStyle = "white";
          this.mainctx.fillRect(point.x + 8,point.y - 20, 15, 15);
          this.mainctx.fillStyle = "black";
          this.mainctx.font = "10px Arial"
          this.mainctx.fillText(point.id, point.x + 10,point.y - 10)
        }
        this.mainctx.strokeStyle="red"
        if (point.id == this.newId){
          this.mainctx.strokeStyle="blue"
        }
        this.mainctx.beginPath()
        this.mainctx.moveTo(point.x - 4, point.y + 0)
        this.mainctx.lineTo(point.x + 4, point.y + 0)
        this.mainctx.moveTo(point.x + 0, point.y - 4)
        this.mainctx.lineTo(point.x + 0, point.y + 4)
        this.mainctx.stroke()        
      }

      for (let iter = 0; iter < this.linesArray.length; iter++){
        let line = this.linesArray[iter]
        /*
        this.mainctx.fillStyle = "white";
        this.mainctx.fillRect(line.x1 + 8,line.y1 - 20, 15, 15);
        this.mainctx.fillRect(line.x2 + 8,line.y2 - 20, 15, 15);
        this.mainctx.fillStyle = "black";
        this.mainctx.font = "10px Arial"
        this.mainctx.fillText(iter+1, line.x2 + 10,line.y2 - 10)
        this.mainctx.fillText(iter+1, line.x1 + 10,line.y1 - 10)
        */

        this.mainctx.strokeStyle="red"
        this.mainctx.beginPath()
        this.mainctx.moveTo(line.x1 - 4, line.y1)
        this.mainctx.lineTo(line.x1 + 4, line.y1)
        this.mainctx.moveTo(line.x1, line.y1 - 4)
        this.mainctx.lineTo(line.x1, line.y1 + 4)
        if (line.x2 != undefined && line.y2 != undefined){
          this.mainctx.moveTo(line.x1, line.y1)
          this.mainctx.lineTo(line.x2, line.y2)
          this.mainctx.moveTo(line.x2 - 4, line.y2)
          this.mainctx.lineTo(line.x2 + 4, line.y2)
          this.mainctx.moveTo(line.x2, line.y2 - 4)
          this.mainctx.lineTo(line.x2, line.y2 + 4)
        }
        this.mainctx.stroke()
      }
    }
  },
  directives: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color:#fff
}
h1 span{
  font-size: 30px
}
h3{
  color:#fff;
  text-align: right;
}
#right-img{
  display: none
}
.cursorHidden{
  cursor: none;
}
#right-zoom{
  border-radius: 50%;
  position:absolute;
  border: 1px solid red;
  pointer-events:none
}
.hidden{
  display: none;
}
</style>
