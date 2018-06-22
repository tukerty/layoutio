webpackJsonp([0],{"7Bh1":function(t,i){},"86h+":function(t,i){},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("7+uW"),n={name:"LeftImage",data:function(){return{picType:"",maxpoints:void 0,maxlines:void 0,showZoom:!1,lineMode:!1,currentIndex:0,newId:1,pointsArray:[],linesArray:[],collideLine:void 0,collideIndex:void 0,image:void 0,mainc:void 0,mainctx:void 0,zoomc:void 0,zoomctx:void 0}},props:["magSize","magStrength","reviewMode"],mounted:function(){var t=this;this.mainc=document.getElementById("left-main"),this.mainctx=this.mainc.getContext("2d"),this.zoomc=document.getElementById("left-zoom"),this.zoomctx=this.zoomc.getContext("2d"),this.image=document.getElementById("left-img"),this.image.onload=function(){t.mainctx.drawImage(t.image,0,0),console.log(t.image.src),t.image.src.includes("LowerArm")?(t.picType="LowerArm",t.maxpoints=10,t.maxlines=1):t.image.src.includes("UpperArm")?(t.picType="UpperArm",t.maxpoints=5,t.maxlines=0):t.image.src.includes("Recent")&&(t.picType="Recenter",t.maxpoints=14,t.maxlines=0),t.$emit("ready")},this.mainctx.translate(.5,.5),this.zoomctx.translate(.5,.5)},methods:{handleScroll:function(t){var i=this;t.preventDefault(),this.redrawCanvas(),t.deltaY<0?(this.newId+=1,this.newId>this.maxpoints&&(this.newId=1)):(this.newId-=1,this.newId<1&&(this.newId=this.maxpoints)),this.redrawCanvas(),setTimeout(function(){i.$emit("scrolled")},10)},addEmptyPoint:function(){},preventContext:function(t){t.preventDefault()},mouseUp:function(t){switch(t.button){case 0:break;case 1:this.lineMode=!1;break;case 2:this.removeItem(t);break;default:return 0}this.setPoint(t),this.redrawCanvas(),this.moveZoom(t),this.showZoom=!1},mouseMove:function(t){switch(t.button){case 0:case 1:break;default:return 0}this.moveZoom(t),this.redrawCanvas(),this.moveZoom(t)},mouseDown:function(t){switch(t.button){case 0:1==this.lineMode?this.putLineEnd(t):t.ctrlKey?this.putLineStart(t):this.putNewPoint(t);break;case 1:this.dropLine(t),this.movePoint(t);break;case 2:this.dropLine(t);break;default:return 0}this.redrawCanvas(),this.moveZoom(t),this.showZoom=!0},putNewPoint:function(t){for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){this.pointsArray[s].id==this.newId&&this.pointsArray.splice(s,1)}this.pointsArray.push({x:i,y:e,id:this.newId}),this.newId+=1,this.newId>this.maxpoints&&(this.newId=1),this.collideIndex=this.pointsArray.length-1,this.redrawCanvas()},setPoint:function(t){this.collideIndex=void 0,this.collideLine=void 0},dropLine:function(t){1==this.lineMode&&(this.lineMode=!1,this.collideLine=void 0,this.linesArray.splice(-1,1))},removeItem:function(t){for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){var n=this.pointsArray[s];Math.abs(n.x-i)<5&&Math.abs(n.y-e)<5&&(this.pointsArray.splice(s,1),this.newId=s)}this.newId+=1,this.newId>this.maxpoints&&(this.newId=1);for(var a=0;a<this.linesArray.length;a++){var h=this.linesArray[a];(Math.abs(h.x1-i)<5&&Math.abs(h.y1-e)<5||Math.abs(h.x2-i)<5&&Math.abs(h.y2-e)<5)&&(this.linesArray[a].x1=void 0,this.linesArray[a].y1=void 0,this.linesArray[a].x2=void 0,this.linesArray[a].y2=void 0)}},putLineStart:function(t){console.log("line Start");var i=t.offsetX,e=t.offsetY;this.lineMode=!0,this.linesArray.push({x1:i,y1:e,x2:void 0,y2:void 0}),this.collideLine=this.linesArray.length-1,this.redrawCanvas()},putLineEnd:function(t){console.log("line End");var i=t.offsetX,e=t.offsetY;this.lineMode=!1,this.collideLine=this.linesArray.length-1,this.linesArray[this.collideLine].x2=i,this.linesArray[this.collideLine].y2=e,this.redrawCanvas()},moveZoom:function(t){var i=t.offsetX,e=t.offsetY;this.zoomctx.fillStyle="white",this.zoomctx.clearRect(0,0,this.zoomc.width,this.zoomc.height),this.zoomctx.fillStyle="transparent",this.zoomctx.fillRect(0,0,this.zoomc.width,this.zoomc.height),this.zoomctx.drawImage(this.mainc,i-this.magSize/this.magStrength/2,e-this.magSize/this.magStrength/2,this.magSize/this.magStrength,this.magSize/this.magStrength,0,0,this.magSize,this.magSize),this.zoomc.style.top=t.pageY-this.magSize/2+"px",this.zoomc.style.left=t.pageX-this.magSize/2+"px",void 0!=this.collideIndex&&(this.pointsArray[this.collideIndex].x=i,this.pointsArray[this.collideIndex].y=e),void 0!=this.collideLine&&1==this.lineMode&&(this.linesArray[this.collideLine].x1=i,this.linesArray[this.collideLine].y1=e),void 0!=this.collideLine&&0==this.lineMode&&(this.linesArray[this.collideLine].x2=i,this.linesArray[this.collideLine].y2=e)},movePoint:function(t){this.showZoom=!0;for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){var n=this.pointsArray[s];Math.abs(n.x-i)<5&&Math.abs(n.y-e)<5&&(console.log("collide with "+s),this.collideIndex=s)}for(var a=0;a<this.linesArray.length;a++){var h=this.linesArray[a];Math.abs(h.x1-i)<5&&Math.abs(h.y1-e)<5&&(console.log("collide with "+a),this.lineMode=!0,this.collideLine=a),Math.abs(h.x2-i)<5&&Math.abs(h.y2-e)<5&&(console.log("collide with "+a),this.collideLine=a)}},moveCircle:function(){this.showZoom=!1},redrawCanvas:function(){this.$emit("update",{points:this.pointsArray,lines:this.linesArray}),this.mainctx.drawImage(this.image,0,0);for(var t=0;t<this.pointsArray.length;t++){var i=this.pointsArray[t];1==this.reviewMode&&i.id==this.newId&&(this.mainctx.fillStyle="white",this.mainctx.fillRect(i.x+8,i.y-20,15,15),this.mainctx.fillStyle="black",this.mainctx.font="10px Arial",this.mainctx.fillText(i.id,i.x+10,i.y-10)),this.mainctx.strokeStyle="red",i.id==this.newId&&(this.mainctx.strokeStyle="blue"),this.mainctx.beginPath(),this.mainctx.moveTo(i.x-4,i.y+0),this.mainctx.lineTo(i.x+4,i.y+0),this.mainctx.moveTo(i.x+0,i.y-4),this.mainctx.lineTo(i.x+0,i.y+4),this.mainctx.stroke()}for(var e=0;e<this.linesArray.length;e++){var s=this.linesArray[e];this.mainctx.strokeStyle="red",this.mainctx.beginPath(),this.mainctx.moveTo(s.x1-4,s.y1),this.mainctx.lineTo(s.x1+4,s.y1),this.mainctx.moveTo(s.x1,s.y1-4),this.mainctx.lineTo(s.x1,s.y1+4),void 0!=s.x2&&void 0!=s.y2&&(this.mainctx.moveTo(s.x1,s.y1),this.mainctx.lineTo(s.x2,s.y2),this.mainctx.moveTo(s.x2-4,s.y2),this.mainctx.lineTo(s.x2+4,s.y2),this.mainctx.moveTo(s.x2,s.y2-4),this.mainctx.lineTo(s.x2,s.y2+4)),this.mainctx.stroke()}}},directives:{}},a={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{class:{cursorHidden:t.showZoom},attrs:{id:"currentimage"},on:{mousewheel:t.handleScroll}},[s("h1",[t._v("Current point: "),s("span",[t._v(t._s(t.newId))])]),t._v(" "),s("canvas",{staticStyle:{border:"1px solid #BBB"},attrs:{id:"left-main",width:"640",height:"400"},on:{mouseup:t.mouseUp,mousemove:t.mouseMove,mousedown:t.mouseDown,contextmenu:t.preventContext}}),t._v(" "),s("canvas",{class:{hidden:!t.showZoom},attrs:{id:"left-zoom",width:t.magSize,height:t.magSize}}),t._v(" "),s("img",{attrs:{id:"left-img",src:e("SOpJ"),alt:""}}),t._v(" "),s("h3",[t._v("Picture type: "+t._s(t.picType)+" - "+t._s(t.maxpoints)+" /  "+t._s(t.maxlines))])])},staticRenderFns:[]};var h=e("VU/8")(n,a,!1,function(t){e("7Bh1")},"data-v-3ceccc2e",null).exports,o={name:"RightImage",data:function(){return{picType:"",maxpoints:void 0,maxlines:void 0,showZoom:!1,lineMode:!1,currentIndex:0,newId:1,pointsArray:[],linesArray:[],collideLine:void 0,collideIndex:void 0,image:void 0,mainc:void 0,mainctx:void 0,zoomc:void 0,zoomctx:void 0}},props:["magSize","magStrength","reviewMode"],mounted:function(){var t=this;this.mainc=document.getElementById("right-main"),this.mainctx=this.mainc.getContext("2d"),this.zoomc=document.getElementById("right-zoom"),this.zoomctx=this.zoomc.getContext("2d"),this.image=document.getElementById("right-img"),this.image.onload=function(){t.mainctx.drawImage(t.image,640,0,640,400,0,0,640,400),console.log(t.image.src),t.image.src.includes("LowerArm")?(t.picType="LowerArm",t.maxpoints=10,t.maxlines=1):t.image.src.includes("UpperArm")?(t.picType="UpperArm",t.maxpoints=5,t.maxlines=0):t.image.src.includes("Recent")&&(t.picType="Recenter",t.maxpoints=14,t.maxlines=0),t.$emit("ready")},this.mainctx.translate(.5,.5),this.zoomctx.translate(.5,.5)},methods:{handleScroll:function(t){var i=this;t.preventDefault(),this.redrawCanvas(),t.deltaY<0?(this.newId+=1,this.newId>this.maxpoints&&(this.newId=1)):(this.newId-=1,this.newId<1&&(this.newId=this.maxpoints)),this.redrawCanvas(),setTimeout(function(){i.$emit("scrolled")},10)},addEmptyPoint:function(){},preventContext:function(t){t.preventDefault()},mouseUp:function(t){switch(t.button){case 0:break;case 1:this.lineMode=!1;break;case 2:this.removeItem(t);break;default:return 0}this.setPoint(t),this.redrawCanvas(),this.moveZoom(t),this.showZoom=!1},mouseMove:function(t){switch(t.button){case 0:case 1:break;default:return 0}this.moveZoom(t),this.redrawCanvas(),this.moveZoom(t)},mouseDown:function(t){switch(t.button){case 0:1==this.lineMode?this.putLineEnd(t):t.ctrlKey?this.putLineStart(t):this.putNewPoint(t);break;case 1:this.dropLine(t),this.movePoint(t);break;case 2:this.dropLine(t);break;default:return 0}this.redrawCanvas(),this.moveZoom(t),this.showZoom=!0},putNewPoint:function(t){for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){this.pointsArray[s].id==this.newId&&this.pointsArray.splice(s,1)}this.pointsArray.push({x:i,y:e,id:this.newId}),this.newId+=1,this.newId>this.maxpoints&&(this.newId=1),this.collideIndex=this.pointsArray.length-1,this.redrawCanvas()},setPoint:function(t){this.collideIndex=void 0,this.collideLine=void 0},dropLine:function(t){1==this.lineMode&&(this.lineMode=!1,this.collideLine=void 0,this.linesArray.splice(-1,1))},removeItem:function(t){for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){var n=this.pointsArray[s];Math.abs(n.x-i)<5&&Math.abs(n.y-e)<5&&(this.pointsArray.splice(s,1),this.newId=s)}this.newId+=1,this.newId>this.maxpoints&&(this.newId=1);for(var a=0;a<this.linesArray.length;a++){var h=this.linesArray[a];(Math.abs(h.x1-i)<5&&Math.abs(h.y1-e)<5||Math.abs(h.x2-i)<5&&Math.abs(h.y2-e)<5)&&(this.linesArray[a].x1=void 0,this.linesArray[a].y1=void 0,this.linesArray[a].x2=void 0,this.linesArray[a].y2=void 0)}},putLineStart:function(t){console.log("line Start");var i=t.offsetX,e=t.offsetY;this.lineMode=!0,this.linesArray.push({x1:i,y1:e,x2:void 0,y2:void 0}),this.collideLine=this.linesArray.length-1,this.redrawCanvas()},putLineEnd:function(t){console.log("line End");var i=t.offsetX,e=t.offsetY;this.lineMode=!1,this.collideLine=this.linesArray.length-1,this.linesArray[this.collideLine].x2=i,this.linesArray[this.collideLine].y2=e,this.redrawCanvas()},moveZoom:function(t){var i=t.offsetX,e=t.offsetY;this.zoomctx.fillStyle="white",this.zoomctx.clearRect(0,0,this.zoomc.width,this.zoomc.height),this.zoomctx.fillStyle="transparent",this.zoomctx.fillRect(0,0,this.zoomc.width,this.zoomc.height),this.zoomctx.drawImage(this.mainc,i-this.magSize/this.magStrength/2,e-this.magSize/this.magStrength/2,this.magSize/this.magStrength,this.magSize/this.magStrength,0,0,this.magSize,this.magSize),this.zoomc.style.top=t.pageY-this.magSize/2+"px",this.zoomc.style.left=t.pageX-this.magSize/2+"px",void 0!=this.collideIndex&&(this.pointsArray[this.collideIndex].x=i,this.pointsArray[this.collideIndex].y=e),void 0!=this.collideLine&&1==this.lineMode&&(this.linesArray[this.collideLine].x1=i,this.linesArray[this.collideLine].y1=e),void 0!=this.collideLine&&0==this.lineMode&&(this.linesArray[this.collideLine].x2=i,this.linesArray[this.collideLine].y2=e)},movePoint:function(t){this.showZoom=!0;for(var i=t.offsetX,e=t.offsetY,s=0;s<this.pointsArray.length;s++){var n=this.pointsArray[s];Math.abs(n.x-i)<5&&Math.abs(n.y-e)<5&&(console.log("collide with "+s),this.collideIndex=s)}for(var a=0;a<this.linesArray.length;a++){var h=this.linesArray[a];Math.abs(h.x1-i)<5&&Math.abs(h.y1-e)<5&&(console.log("collide with "+a),this.lineMode=!0,this.collideLine=a),Math.abs(h.x2-i)<5&&Math.abs(h.y2-e)<5&&(console.log("collide with "+a),this.collideLine=a)}},moveCircle:function(){this.showZoom=!1},redrawCanvas:function(){this.$emit("update",{points:this.pointsArray,lines:this.linesArray}),this.mainctx.drawImage(this.image,640,0,640,400,0,0,640,400);for(var t=0;t<this.pointsArray.length;t++){var i=this.pointsArray[t];1==this.reviewMode&&i.id==this.newId&&(this.mainctx.fillStyle="white",this.mainctx.fillRect(i.x+8,i.y-20,15,15),this.mainctx.fillStyle="black",this.mainctx.font="10px Arial",this.mainctx.fillText(i.id,i.x+10,i.y-10)),this.mainctx.strokeStyle="red",i.id==this.newId&&(this.mainctx.strokeStyle="blue"),this.mainctx.beginPath(),this.mainctx.moveTo(i.x-4,i.y+0),this.mainctx.lineTo(i.x+4,i.y+0),this.mainctx.moveTo(i.x+0,i.y-4),this.mainctx.lineTo(i.x+0,i.y+4),this.mainctx.stroke()}for(var e=0;e<this.linesArray.length;e++){var s=this.linesArray[e];this.mainctx.strokeStyle="red",this.mainctx.beginPath(),this.mainctx.moveTo(s.x1-4,s.y1),this.mainctx.lineTo(s.x1+4,s.y1),this.mainctx.moveTo(s.x1,s.y1-4),this.mainctx.lineTo(s.x1,s.y1+4),void 0!=s.x2&&void 0!=s.y2&&(this.mainctx.moveTo(s.x1,s.y1),this.mainctx.lineTo(s.x2,s.y2),this.mainctx.moveTo(s.x2-4,s.y2),this.mainctx.lineTo(s.x2+4,s.y2),this.mainctx.moveTo(s.x2,s.y2-4),this.mainctx.lineTo(s.x2,s.y2+4)),this.mainctx.stroke()}}},directives:{}},r={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{class:{cursorHidden:t.showZoom},attrs:{id:"currentimage"},on:{mousewheel:t.handleScroll}},[s("h1",[t._v("Current point: "),s("span",[t._v(t._s(t.newId))])]),t._v(" "),s("canvas",{staticStyle:{border:"1px solid #BBB"},attrs:{id:"right-main",width:"640",height:"400"},on:{mouseup:t.mouseUp,mousemove:t.mouseMove,mousedown:t.mouseDown,contextmenu:t.preventContext}}),t._v(" "),s("canvas",{class:{hidden:!t.showZoom},attrs:{id:"right-zoom",width:t.magSize,height:t.magSize}}),t._v(" "),s("img",{attrs:{id:"right-img",src:e("SOpJ"),alt:""}}),t._v(" "),s("h3",[t._v("Picture type: "+t._s(t.picType)+" - "+t._s(t.maxpoints)+" /  "+t._s(t.maxlines))])])},staticRenderFns:[]};var c={name:"BigAssMagnifier",data:function(){return{x:0,y:0,leftc:void 0,leftctx:void 0,rightc:void 0,rightctx:void 0,mainc:void 0,mainctx:void 0}},mounted:function(){this.leftc=document.getElementById("left-main"),this.leftctx=this.leftc.getContext("2d"),this.rightc=document.getElementById("right-main"),this.rightctx=this.rightc.getContext("2d"),this.mainc=document.getElementById("bigAssZoom"),this.mainctx=this.mainc.getContext("2d"),this.mainctx.canvas.width=document.body.clientWidth,this.mainctx.translate(.5,.5),this.setHandlers()},props:["magStrength"],methods:{magLeft:function(t){this.x=t.offsetX,this.y=t.offsetY;var i=this.mainctx.canvas.width,e=this.mainctx.canvas.height;this.mainctx.clearRect(0,0,this.mainctx.canvas.width,this.mainctx.canvas.height),this.mainctx.drawImage(this.leftc,this.x-i/(2*this.magStrength),this.y-e/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height),this.mainctx.strokeStyle="red",this.mainctx.beginPath(),this.mainctx.moveTo(i/2-8,e/2+0),this.mainctx.lineTo(i/2+8,e/2+0),this.mainctx.moveTo(i/2+0,e/2-8),this.mainctx.lineTo(i/2+0,e/2+8),this.mainctx.stroke()},magRight:function(t){this.x=t.offsetX,this.y=t.offsetY;var i=this.mainctx.canvas.width,e=this.mainctx.canvas.height;this.mainctx.strokeStyle="red",this.mainctx.clearRect(0,0,this.mainctx.canvas.width,this.mainctx.canvas.height),this.mainctx.drawImage(this.rightc,this.x-i/(2*this.magStrength),this.y-e/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height),this.mainctx.beginPath(),this.mainctx.moveTo(i/2-8,e/2+0),this.mainctx.lineTo(i/2+8,e/2+0),this.mainctx.moveTo(i/2+0,e/2-8),this.mainctx.lineTo(i/2+0,e/2+8),this.mainctx.stroke()},redrawLeft:function(t){this.x=t.offsetX,this.y=t.offsetY;var i=this.mainctx.canvas.width,e=this.mainctx.canvas.height;this.mainctx.drawImage(this.leftc,this.x-i/(2*this.magStrength),this.y-e/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height)},redrawRight:function(t){this.x=t.offsetX,this.y=t.offsetY;var i=this.mainctx.canvas.width,e=this.mainctx.canvas.height;this.mainctx.drawImage(this.rightc,this.x-i/(2*this.magStrength),this.y-e/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height)},redrawLeftScroll:function(){var t=this.mainctx.canvas.width,i=this.mainctx.canvas.height;this.mainctx.drawImage(this.leftc,this.x-t/(2*this.magStrength),this.y-i/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height)},redrawRightScroll:function(){var t=this.mainctx.canvas.width,i=this.mainctx.canvas.height;this.mainctx.drawImage(this.rightc,this.x-t/(2*this.magStrength),this.y-i/(2*this.magStrength),this.mainctx.canvas.width/this.magStrength,this.mainctx.canvas.height/this.magStrength,0,0,this.mainctx.canvas.width,this.mainctx.canvas.height)},setHandlers:function(){this.rightc.addEventListener("mousemove",this.magRight),this.leftc.addEventListener("mousemove",this.magLeft),this.rightc.addEventListener("mouseup",this.redrawRight),this.leftc.addEventListener("mouseup",this.redrawLeft)}}},m={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"bigAssMagnifier"},[i("canvas",{attrs:{id:"bigAssZoom",height:300}})])},staticRenderFns:[]};var l={name:"App",data:function(){return{reviewMode:!1,bamActive:!0,magStrength:4,magSize:100,canUseBAM:!1,loading:!1,leftReady:!1,rightReady:!1,leftPoints:[],leftLines:[],rightPoints:[],rightLines:[],userId:void 0}},components:{RightImage:e("VU/8")(o,r,!1,function(t){e("uWv9")},"data-v-3263c1d6",null).exports,LeftImage:h,BigAssMagnifier:e("VU/8")(c,m,!1,function(t){e("86h+")},"data-v-4e7b4d5f",null).exports},mounted:function(){var t=window.location.search.substring(1),i=new URLSearchParams(t);this.userId=i.get("userId")},methods:{handleLeft:function(t){this.leftPoints=t.points,this.leftLines=t.lines},handleRight:function(t){this.rightPoints=t.points,this.rightLines=t.lines},handleScrollLeft:function(){this.$refs.bam.redrawLeftScroll()},handleScrollRight:function(){this.$refs.bam.redrawRightScroll()},handleReadyLeft:function(){this.leftReady=!0,this.rightReady&&(this.canUseBAM=!0)},handleReadyRight:function(){this.rightReady=!0,this.leftReady&&(this.canUseBAM=!0)},redrawImages:function(){var t=this;console.log("rr"),setTimeout(function(){t.$refs.left.redrawCanvas(),t.$refs.right.redrawCanvas()},10)},sendData:function(){}}},d={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"wrapper"},[e("div",{staticClass:"settings"},[e("div",{staticClass:"field is-grouped"},[e("div",{staticClass:"control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.magStrength,expression:"magStrength"}],staticClass:"input numput",domProps:{value:t.magStrength},on:{input:function(i){i.target.composing||(t.magStrength=i.target.value)}}})]),t._v(" "),e("div",{staticClass:"control"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.magSize,expression:"magSize"}],staticClass:"input numput",domProps:{value:t.magSize},on:{input:function(i){i.target.composing||(t.magSize=i.target.value)}}})]),t._v(" "),e("b-switch",{attrs:{type:"is-danger"},model:{value:t.bamActive,callback:function(i){t.bamActive=i},expression:"bamActive"}}),t._v(" "),e("p",[t._v("Enable BAM   ")]),t._v(" "),e("b-switch",{attrs:{type:"is-info"},on:{input:function(i){t.redrawImages()}},model:{value:t.reviewMode,callback:function(i){t.reviewMode=i},expression:"reviewMode"}}),t._v(" "),e("p",[t._v("Review Mode")])],1)]),t._v(" "),e("div",{staticClass:"images"},[e("left-image",{ref:"left",attrs:{magSize:t.magSize,magStrength:t.magStrength,reviewMode:t.reviewMode},on:{update:t.handleLeft,scrolled:t.handleScrollLeft,ready:t.handleReadyLeft}}),t._v(" "),e("right-image",{ref:"right",attrs:{magSize:t.magSize,magStrength:t.magStrength,reviewMode:t.reviewMode},on:{update:t.handleRight,scrolled:t.handleScrollRight,ready:t.handleReadyRight}})],1),t._v(" "),e("div",{staticClass:"buttons"},[e("button",{staticClass:"button is-big sendbtn",on:{click:t.sendData}},[t._v("Send")])]),t._v(" "),t.canUseBAM?e("big-ass-magnifier",{ref:"bam",class:{hidden:!t.bamActive},attrs:{magStrength:t.magStrength}}):t._e()],1)])},staticRenderFns:[]};var g=e("VU/8")(l,d,!1,function(t){e("yeTE")},null,null).exports,v=e("MMSg"),x=e.n(v);e("doPI");s.a.use(x.a),s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:g},template:"<App/>"})},SOpJ:function(t,i,e){t.exports=e.p+"static/img/LowerArm.b310f60.png"},doPI:function(t,i){},uWv9:function(t,i){},yeTE:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.534d7e915310b69be093.js.map