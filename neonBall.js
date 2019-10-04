var breakoutCanvas = document.getElementById("breakoutCanvas");
var breakoutCtx = breakoutCanvas.getContext("2d");

var neonBallCanvas = document.getElementById('rainbowCanvas');
neonBallCanvas.width = 40;
neonBallCanvas.height = 40;
var ctx = neonBallCanvas.getContext('2d');

// ctx.lineJoin = "round";
ctx.globalCompositeOperation = "lighter";

var drawBall = function(x, y, w, h, border){
  ctx.beginPath();
  ctx.arc(x, y, radius = 10, 0, Math.PI*2);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

var neonBall = function(x,y,w,h,r,g,b) {
  ctx.shadowColor = "rgb("+r+","+g+","+b+")";
  ctx.shadowBlur = 10;
  ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ctx.lineWidth=7.5;
  drawBall(x,y,w,h,1.5);
  ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ctx.lineWidth=6;
  drawBall(x,y,w,h,1.5);
  ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ctx.lineWidth=4.5;
  drawBall(x,y,w,h,1.5);
  ctx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ctx.lineWidth=3;
  drawBall(x,y,w,h,1.5);
  ctx.strokeStyle= '#fff';
  ctx.lineWidth=1.5;
  drawBall(x,y,w,h,1.5);
}

function renderNeonBall(x,y){
  neonBall(20,20,50,50,13,213,252);
  breakoutCtx.drawImage(neonBallCanvas, 180, 180 )
}

function loop(){
  renderNeonBall()
}

renderNeonBall()
