var container = document.getElementById( 'gameContainer' );
var breakoutCanvas = document.getElementById("breakoutCanvas");
// var container = document.getElementById( 'gameContainer' );
// var breakoutCanvas = document.createElement( 'breakoutCanvas' );
var breakoutCtx = breakoutCanvas.getContext("2d");
// breakoutCanvas.style.backgroundColor = "transparent";
// breakoutCanvas.style.opacity = "1";

var ballRadius = 10;

var x = breakoutCanvas.width / 2;
var y = breakoutCanvas.height - 30;
var dx = 2;
var dy = -2;

var paddleHeight = 10;
// var paddleWidth = 75;
var paddleWidth = 300;
var paddleX = (breakoutCanvas.width-paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickColCount = 5;
var brickRowCount = 3;
var brickWidth = (breakoutCanvas.width - 100) / 7;
var brickHeight = 20;
var brickPadding = ballRadius * 2;
var brickWallWidth = (brickColCount * brickWidth) + ((brickColCount - 1) * brickPadding); //based on total brick width
var brickOffsetTop = 50;
var brickOffsetLeft = (breakoutCanvas.width - brickWallWidth) / 2;

var score = 0;
var lives = 100;

var bricks = [];
for(var c=0; c<brickRowCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickColCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
breakoutCanvas.addEventListener("mousemove", mouseMoveHandler, false);

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
  var relativeX = e.clientX - breakoutCanvas.offsetLeft;
  if(relativeX > 0 && relativeX < breakoutCanvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetection() {
  for(var c=0; c<brickRowCount; c++) {
    for(var r=0; r<brickColCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickColCount*brickRowCount) {
            // alert("YOU WIN, CONGRATS!");
            // document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  breakoutCtx.beginPath();
  breakoutCtx.arc(x, y, ballRadius, 0, Math.PI*2);
  breakoutCtx.fillStyle = "#0095DD";
  breakoutCtx.fill();
  breakoutCtx.closePath();
}
function drawPaddle() {
  breakoutCtx.beginPath();
  breakoutCtx.rect(paddleX, breakoutCanvas.height-paddleHeight, paddleWidth, paddleHeight);
  breakoutCtx.fillStyle = "#0095DD";
  breakoutCtx.fill();
  breakoutCtx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickRowCount; c++) {
    for(var r=0; r<brickColCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        breakoutCtx.beginPath();
        breakoutCtx.rect(brickX, brickY, brickWidth, brickHeight);
        breakoutCtx.fillStyle = "#0095DD";
        breakoutCtx.fill();
        breakoutCtx.closePath();
      }
    }
  }
}
function drawScore() {
  breakoutCtx.font = "16px Arial";
  breakoutCtx.fillStyle = "#0095DD";
  breakoutCtx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
  breakoutCtx.font = "16px Arial";
  breakoutCtx.fillStyle = "#0095DD";
  breakoutCtx.fillText("Lives: "+lives, breakoutCanvas.width - 80, 20);
}

function draw() {
  breakoutCtx.clearRect(0, 0, breakoutCanvas.width, breakoutCanvas.height);
  step();
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > breakoutCanvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > breakoutCanvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        // alert("GAME OVER");
        // document.location.reload();
      }
      else {
        x = breakoutCanvas.width/2;
        y = breakoutCanvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (breakoutCanvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < breakoutCanvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  // requestAnimationFrame(draw);
  // requestAnimationFrame( renderAll );

}
