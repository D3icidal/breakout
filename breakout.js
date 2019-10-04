var canvas = document.getElementById("breakoutCanvas"),
ctx = canvas.getContext("2d"),


ballRadius = 10,
x = canvas.width/2,
y = canvas.height-75,
dx = 2,
dy = 2,
neonGlowBuffer = 7.5, //pixels to allow for neon glow around object
paddleHeight = 20,
paddleWidth = 100,
paddleFloat = 15, //pixels to elevate paddle for costmetic effect
paddleX = (canvas.width/2) - (paddleWidth/2),
paddleY = (canvas.height-paddleHeight) - neonGlowBuffer - paddleFloat
rightPressed = false,
leftPressed = false,
brickRowCount = 5,
brickColumnCount = 3,
brickWidth = 35,
brickHeight = 10
brickPadding = 15,
brickOffsetTop = 30,
brickOffsetLeft = Math.floor((canvas.width - ((brickRowCount * brickWidth) + (brickRowCount * brickPadding))) /2)
score = 0,
lives = 3;

var bricks = [];

//
//  OFFSCREEN CANVAS
//
canvas.offscreenCanvas = document.createElement('canvas');
offscreenCtx = canvas.offscreenCanvas.getContext('2d');
canvas.offscreenCanvas.width = canvas.width;
canvas.offscreenCanvas.height = canvas.height;


//
//  EVENT LISTENERS
//
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

//
//  COLLISION DETECTION
//
function brickCollisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x+ballRadius > b.x && x - ballRadius < b.x+brickWidth && y + ballRadius > b.y && y - ballRadius< b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            // alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}


//
//  CREATE BRICKS
//
var brick = {
  status: 1,
  x: 0,
  y: 0,
  fillstyle: "#0095DD",
};

function createBricks() {

  for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      b = Object.create( brick )
      b.x = (r*(brickWidth+brickPadding))+brickOffsetLeft;
      b.y = (c*(brickHeight+brickPadding))+brickOffsetTop;
      bricks[c][r] = b
    }
  }
  // console.log(bricks[0][0].fillstyle)
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        offscreenCtx.drawImage(drawNeonRect(0,0,brickWidth,brickHeight,13,213,252),b.x-10,b.y-10)
        // offscreenCtx.beginPath();
        // offscreenCtx.rect(b.x, b.y, brickWidth, brickHeight);
        // offscreenCtx.fillStyle = "#0095DD";
        // offscreenCtx.fill();
        // offscreenCtx.closePath();
      } else {
        offscreenCtx.clearRect(b.x, b.y, brickWidth, brickHeight)
      }
    }
  }
  // ctx.drawImage(canvas.offscreenCanvas , 0, 0);
}





function drawBall(ballX, ballY) {
  // drawNeonBall(x,y);
  offscreenCtx.drawImage(drawNeonBall(ballX,ballY),0,0);
}

function drawPaddle() {
  // ctx.beginPath();
  // ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  // ctx.closePath();
  offscreenCtx.drawImage(drawNeonRect(0,0,paddleWidth,paddleHeight,13,213,252),paddleX-neonGlowBuffer,paddleY)
  // ctx.drawImage(canvas.offscreenCanvas , 0, 0);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// function circleRectCollisionDetection(cX, cY, cDX, cDY, rX, rY, rW, rH){
//   var distX = Math.abs(cX - rX + (rW / 2));
//   var distY = Math.abs(cY - rY + (rH / 2));
//
// }

function paddleCollisionDetection(circle, rect){
  // DISTANCE BETWEEN CENTER OF CIRCLE AND CENTER OF RECT ALONG X/Y
  var distX = Math.abs(circle[0] - rect[0] - (rect[2] / 2));
  var distY = Math.abs(circle[1] - rect[1] - (rect[3] / 2));

  //Colliding
  if ((distX <= (rect[2] / 2)) && (distY <= (rect[3] / 2))) {
      console.log("!Colliding!" + "  distX:" + distX + "  distY:" + distY)
      console.log("Circle: " + circle)
      console.log("Rect: " + rect)

      dy = -dy + 5; //Change direction
      return true;
  }

  //Not Colliding
  if (distX > (rect[2] / 2 + ballRadius)) {
      return false;
      dx = -dx;
  }
  if (distY > (rect[3] / 2 + ballRadius)) {
      return false;
      dy = -dy;
  }

  var dx = distX - rect[2] / 2;
  var dy = distY - rect[3] / 2;
  // console.log((dx * dx + dy * dy <= (ballRadius * ballRadius)))
  return (dx * dx + dy * dy <= (ballRadius * ballRadius));
}

function draw() {
  offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawScore();
  drawLives();
  drawBall(x,y);
  ctx.drawImage(canvas.offscreenCanvas , 0, 0);
  // drawNeonBall();
  brickCollisionDetection();
  paddleCollisionDetection([x,y,dx,dy],[paddleX, paddleY, paddleWidth, paddleHeight]);

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    // dy = -dy;
  }
  else if(y + dy > paddleY) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      // dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius ) {
      lives--;
      if(!lives) {
        // alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

  return[Math.floor(x),Math.floor(y)]
  // requestAnimationFrame(step);
}




// function renderBreakout() {

// }


// draw();
