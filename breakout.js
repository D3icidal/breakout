var canvas = document.getElementById("breakoutCanvas"),
ctx = canvas.getContext("2d"),


ballRadius = 10,
x = canvas.width/2,
y = canvas.height-50,
dx = 2,
dy = 2,
neonGlowBuffer = 7.5, //pixels to allow for neon glow around object
paddleHeight = 10,
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

//
//  BRICK COLLISION
//
function brickCollisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        var brickCollision = circleRectCollisionDetection(x, y, dx, dy, b.x, b.y, brickWidth, brickHeight);

        switch(brickCollision) {
          case "horizontally":
            dy = -dy
            console.log ("horrizontal brick collision")
            break;

          case "vertically":
          console.log ("vertical brick collision")
            dy = -dy
            break;

          default:
            return true;
          // dy = -dy;
          // score++;
          // if(score == brickRowCount*brickColumnCount) {
          //   // alert("YOU WIN, CONGRATS!");
          //   document.location.reload();
          // }
        }
      }
    }
  }
}





function drawBall(ballX, ballY) {
  // drawNeonBall(x,y);
  offscreenCtx.drawImage(drawNeonBall(ballX,ballY),0,0);
}

function drawPaddle() {
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


// DETECTION COLLISION CIRCLE WITH RECT UTILITY
function circleRectCollisionDetection(cX, cY, cDX, cDY, rX, rY, rW, rH){
  // DISTANCE BETWEEN CENTER OF CIRCLE AND CENTER OF RECT ALONG X/Y
  var distX = Math.abs(cX - rX - (rW / 2));
  var distY = Math.abs(cY - rY - (rH / 2));

  //Colliding?
  if ((distX <= (rW / 2)) && (distY <= (rH / 2))) {
    console.log("Collision ball-rect distance = [" + "distX:" + distX + "  distY:" + distY + "]")
    //determine if rect was hit from side or from top/bot
    return ( distX >= ((rW / 2) - Math.round( rW * 0.1))  ? "horizontally" : "vertically")
  }

  //Not Colliding
  if (distX > (rW / 2 + ballRadius)) {
    // dx = -dx;
    return false;
  }
  if (distY > (rH / 2 + ballRadius)) {
    // dy = -dy;
    return false;
  }

  //corner of rect detection
  var dx = distX - rW / 2;
  var dy = distY - rH / 2;
  return (dx * dx + dy * dy <= (ballRadius * ballRadius) ? "horizontally" : false);

}


function paddleCollisionDetection(circle, rect){
  var paddleCollision = circleRectCollisionDetection(circle[0], circle[1], circle[2], circle[3], rect[0], rect[1], rect[2], rect[3]);

  switch(paddleCollision) {
    case "horizontally":
    console.log("ball x/y: " + circle[0] + "/" + circle[1])
    console.log("rect x/y: " + rect[0] + "/" + rect[1])
      y = y - 2
      dy = -dy
      dx = -dx
      // console.log ("horrizontal paddle collision!")
      break;
    case "vertically":
    // console.log ("vertical paddle collision")
      y = y - 2
      dy = -dy
      break;
    default:
      // console.log( "paddleCollisionDetection default switch")
  }
}




//
//
//    RENDERING
//
//
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
  var brickCollisionType = brickCollisionDetection();
  // if (brickCollisionType) {
  //   if (brickCollisionType == "horizontally") {
  //     dx = -dx;
  //   } else if (brickCollisionType == "vertically") {
  //     dy = -dy;
  //   } else {
  //     console.log("unknown brickCollisionType. Not H or V")
  //   }
    // score++;
    // if(score == brickRowCount*brickColumnCount) {
    //   // alert("YOU WIN, CONGRATS!");
    //   document.location.reload();
    // }
  // }
  paddleCollisionDetection([x,y,dx,dy],[paddleX, paddleY, paddleWidth, paddleHeight])
  // if (paddleCollisionDetection([x,y,dx,dy],[paddleX, paddleY, paddleWidth, paddleHeight])) {
  //   dy = -dy;
  // }

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > paddleY) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      // dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
