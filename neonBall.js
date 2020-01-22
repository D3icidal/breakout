// var breakoutCanvas = document.getElementById("breakoutCanvas");
// var breakoutCtx = breakoutCanvas.getContext("2d");
var trailLimit = 10;
var balls;
var prevBalls = [];

var ballFieldCanvas =
document.createElement('CANVAS');
ballFieldCanvas.width = document.getElementById("breakoutCanvas").width
ballFieldCanvas.height = document.getElementById("breakoutCanvas").height
var ballFieldCtx = ballFieldCanvas.getContext('2d');

// ballFieldCtx.lineJoin = "round";
ballFieldCtx.globalCompositeOperation = "lighter"; //lighter: Where both shapes overlap the color is determined by adding color values.


var ballObjectCanvas =
document.createElement('CANVAS');
ballObjectCanvas.width = (ballRadius * 2) + 20
ballObjectCanvas.height = (ballRadius * 2) + 20

var ballObjectCtx = ballObjectCanvas.getContext('2d');

var drawCircle = function(x, border){
  ballObjectCtx.beginPath();
  ballObjectCtx.arc(x, x, ballRadius, 0, Math.PI*2);
  ballObjectCtx.closePath();
  ballObjectCtx.stroke();
}

var neonBall = function(x,r,g,b,neonBorder) {
  ballObjectCtx.shadowColor = "rgb("+r+","+g+","+b+")";
  ballObjectCtx.shadowBlur = 10;

  ballObjectCtx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ballObjectCtx.lineWidth=7.5;
  drawCircle(x,neonBorder);
  ballObjectCtx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ballObjectCtx.lineWidth=6;
  drawCircle(x,neonBorder);
  ballObjectCtx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ballObjectCtx.lineWidth=4.5;
  drawCircle(x,neonBorder);
  ballObjectCtx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
  ballObjectCtx.lineWidth=1.5;
  drawCircle(x,neonBorder);
  ballObjectCtx.strokeStyle= '#fff';
  ballObjectCtx.lineWidth=3;
  drawCircle(x,neonBorder);
}


function createNeonBall(r,g,b){
  neonBall(ballObjectCanvas.width/2,r,g,b,1.5);
}

function drawNeonBall(x,y){
  ballFieldCtx.clearRect(0, 0, ballFieldCanvas.width, ballFieldCanvas.height);
  ballFieldCtx.drawImage(ballObjectCanvas, x - (ballObjectCanvas.width/2), y - (ballObjectCanvas.height/2));
  return ballFieldCanvas;
}
