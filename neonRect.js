var breakoutCanvas = document.getElementById("breakoutCanvas");
var breakoutCtx = breakoutCanvas.getContext("2d");

var neonRectCanvas =
document.createElement('CANVAS');
// document.getElementById('rainbowCanvas');
var neonRectCtx = neonRectCanvas.getContext('2d');
neonRectCtx.globalCompositeOperation = "lighter";

var drawRect = function(x, y, w, h, border){
  neonRectCtx.beginPath();

  neonRectCtx.moveTo(x+border, y);
  neonRectCtx.lineTo(x+w-border, y);
  neonRectCtx.quadraticCurveTo(x+w-border, y, x+w, y+border);

  neonRectCtx.lineTo(x+w, y+h-border);
  neonRectCtx.quadraticCurveTo(x+w, y+h-border, x+w-border, y+h);

  neonRectCtx.lineTo(x+border, y+h);
  neonRectCtx.quadraticCurveTo(x+border, y+h, x, y+h-border);

  neonRectCtx.lineTo(x, y+border);
  neonRectCtx.quadraticCurveTo(x, y+border, x+border, y);

  neonRectCtx.closePath();

  neonRectCtx.stroke();
}


var neonRect = function(x,y,w,h,r,g,b) {
  neonRectCtx.shadowColor = "rgb("+r+","+g+","+b+")";
  neonRectCtx.shadowBlur = 10;
  for (i = 7.5; i > 1.5; i -= 1.5){
    neonRectCtx.strokeStyle= "rgba("+r+","+g+","+b+",0.2)";
    neonRectCtx.lineWidth=i;
    drawRect(x,y,w,h,2);
  }

  neonRectCtx.strokeStyle= '#fff';
  neonRectCtx.lineWidth=3;
  drawRect(x,y,w,h,3);

  return neonRectCanvas
}


function drawNeonRect(x,y,w,h,r,g,b){
  // neonRect(20,20,10,50,13,213,252);
  neonRectCtx.clearRect(0, 0, neonRectCanvas.width, neonRectCanvas.height);
  neonRectCanvas.width = w + 20;
  neonRectCanvas.height = h + 20;
  return neonRect(10,10,w,h,r,g,b);
  // breakoutCtx.drawImage(neonRectCanvas, 10, 10)
}
