<template>
    <div class="bigAssMagnifier">
        <canvas id="bigAssZoom" :height="300"></canvas>
    </div>
</template>

<script>
export default {
  name: 'BigAssMagnifier',
  data () {
    return {
        x: 0,
        y: 0,
        leftc: undefined,
        leftctx: undefined,
        rightc: undefined,
        rightctx: undefined,
        mainc: undefined,
        mainctx: undefined,
    }
  },
  mounted(){

    this.leftc = document.getElementById("left-main")
    this.leftctx = this.leftc.getContext("2d")
    this.rightc = document.getElementById("right-main")
    this.rightctx = this.rightc.getContext("2d")

    this.mainc = document.getElementById("bigAssZoom")
    this.mainctx = this.mainc.getContext("2d")
    this.mainctx.canvas.width  = document.body.clientWidth;

    this.mainctx.translate(0.5, 0.5);

    this.setHandlers()
  },
  props: ['magStrength'],
  methods:{
      magLeft(event){
        this.x = event.offsetX
        this.y = event.offsetY
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.clearRect(0,0, this.mainctx.canvas.width, this.mainctx.canvas.height);  
        this.mainctx.drawImage(this.leftc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);
        this.mainctx.strokeStyle="red"
        this.mainctx.beginPath()
        this.mainctx.moveTo(mainw/2 - 8, mainh/2 + 0)
        this.mainctx.lineTo(mainw/2 + 8, mainh/2 + 0)
        this.mainctx.moveTo(mainw/2 + 0, mainh/2 - 8)
        this.mainctx.lineTo(mainw/2 + 0, mainh/2 + 8)
        this.mainctx.stroke()
      },
      magRight(event){
        this.x = event.offsetX
        this.y = event.offsetY
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.strokeStyle="red"
        this.mainctx.clearRect(0,0, this.mainctx.canvas.width, this.mainctx.canvas.height);  
        this.mainctx.drawImage(this.rightc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);

        this.mainctx.beginPath()
        this.mainctx.moveTo(mainw/2 - 8, mainh/2 + 0)
        this.mainctx.lineTo(mainw/2 + 8, mainh/2 + 0)
        this.mainctx.moveTo(mainw/2 + 0, mainh/2 - 8)
        this.mainctx.lineTo(mainw/2 + 0, mainh/2 + 8)
        this.mainctx.stroke()
      },
      redrawLeft(event){
        this.x = event.offsetX
        this.y = event.offsetY
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.drawImage(this.leftc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);
      },
      redrawRight(event){
        this.x = event.offsetX
        this.y = event.offsetY
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.drawImage(this.rightc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);
      },
      redrawLeftScroll(){
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.drawImage(this.leftc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);
      },
      redrawRightScroll(){
        let mainw = this.mainctx.canvas.width
        let mainh = this.mainctx.canvas.height
        this.mainctx.drawImage(this.rightc, this.x - mainw / (this.magStrength * 2), this.y - mainh / (this.magStrength * 2), this.mainctx.canvas.width/this.magStrength, this.mainctx.canvas.height/this.magStrength, 0, 0, this.mainctx.canvas.width, this.mainctx.canvas.height);
      },
      setHandlers(){
        this.rightc.addEventListener("mousemove", this.magRight)
        this.leftc.addEventListener("mousemove", this.magLeft)
        this.rightc.addEventListener("mouseup", this.redrawRight)
        this.leftc.addEventListener("mouseup", this.redrawLeft)
      }
  }
}
</script>

<style scoped>

</style>
