var canvas = document.getElementById("breakoutCanvas"),
ctx = canvas.getContext("2d"),

ballRadius = 10,
x = canvas.width/2,
y = canvas.height-50,
dx = 2,
dy = -2,
paddleHeight = 10,
paddleWidth = 100,
paddleX = (canvas.width-paddleWidth)/2,
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
lives = 5;

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
// document.addEventListener("mousemove", mouseMoveHandler, false);

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

// function mouseMoveHandler(e) {
//   var relativeX = e.clientX - canvas.offsetLeft;
//   if(relativeX > 0 && relativeX < canvas.width) {
//     paddleX = relativeX - paddleWidth/2;
//   }
// }


//
//  CREATE BRICKS
//
// function createBricks() {
//   var bricks = [];
//   for(var c=0; c<brickColumnCount; c++) {
//     bricks[c] = [];
//     for(var r=0; r<brickRowCount; r++) {
//       bricks[c][r] = { x: 0, y: 0, status: 1 };
//     }
//   }
// }

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


//prerender bricks
// var brickCanvas = document.createElement('canvas');
// var brickCtx = textCanvas.getContext('2d');
// brickCanvas.width = canvas.width;
// brickCanvas.height = canvas.height;

// var brickCanvas = document.createElement('canvas').getContext('bitmaprenderer');

// var brickOffscreen = new OffscreenCanvas(canvas.width, canvas.height);
// var brickOffscreenCtx = brickOffscreen.getContext('2d');



function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        offscreenCtx.drawImage(drawNeonRect(0,0,brickWidth,brickHeight,13,213,252),b.x,b.y)
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

  // for(var c=0; c<brickColumnCount; c++) {
  //   for(var r=0; r<brickRowCount; r++) {

  //     b.x = (r*(brickWidth+brickPadding))+brickOffsetLeft;
  //     b.y = (c*(brickHeight+brickPadding))+brickOffsetTop;
  //   }

  // }


//
//  COLLISION DETECTION
//
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x + ballRadius > b.x && x - ballRadius < b.x+brickWidth && y + ballRadius > b.y && y - ballRadius< b.y+brickHeight) {
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






// function drawBall() {
//   for(var c=0; c<brickColumnCount; c++) {
//     for(var r=0; r<brickRowCount; r++) {
//       var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
//       var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
//       bricks[c][r].x = brickX;
//       bricks[c][r].y = brickY;
//       if(bricks[c][r].status == 1) {
//         offscreenCtx.beginPath();
//         offscreenCtx.rect(brickX, brickY, brickWidth, brickHeight);
//         offscreenCtx.fillStyle = "#0095DD";
//         offscreenCtx.fill();
//         offscreenCtx.closePath();
//       } else {
//         offscreenCtx.clearRect(brickX, brickY, brickWidth, brickHeight)
//       }
//     }
//   ctx.drawImage(canvas.offscreenCanvas , 0, 0);0
//   }
  // var brickBitmap = brickOffscreen.transferToImageBitmap();
  // canvas.transferFromImageBitmap(brickBitmap);
// }



// // Pre-rendering canvas
// var prerenderCanvas = document.createElement('canvas');
// prerenderCanvas.width = canvas.width;
// prerenderCanvas.height = canvas.height;
// var prerenderCtx = prerenderCanvas.getContext('2d');
// draw

function drawBall() {
  // drawNeonBall(x,y);
  offscreenCtx.drawImage(drawNeonBall(x,y),0,0);
  // ctx.beginPath();
  // ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  // ctx.closePath();
}

// function drawNeonBall() {
//   var neonBallCanvas = document.createElement('canvas');
//   neonBallCanvas.width = ballRadius * 2;
//   neonBallCanvas.height = ballRadius * 2;
//
//   // Initialize the GL context
//   var gl = neonBallCanvas.getContext('webgl');
//   if(!gl){
//     console.error("Unable to initialize WebGL.");
//   }
//   ctx.beginPath();
//   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//   ctx.fillStyle = "#0095DD";
//   ctx.fill();
//   // ctx.closePath();
// }


function drawPaddle() {
  // ctx.beginPath();
  // ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  // ctx.fillStyle = "#0095DD";
  // ctx.fill();
  // ctx.closePath();
  offscreenCtx.drawImage(drawNeonRect(0,0,paddleWidth,paddleHeight,13,213,252),paddleX,canvas.height-paddleHeight - 20)
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


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawScore();
  drawLives();
  drawBall();
  ctx.drawImage(canvas.offscreenCanvas , 0, 0);
  // drawNeonBall();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
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

createBricks()
// draw();
