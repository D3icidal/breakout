randomize_Parameters();

createBricks();
drawBricks();

createNeonBall(ballRGB[0], ballRGB[1], ballRGB[2]);


//
//  CREATE BRICKS
//
function createBricks() {
  var brick = {
    status: 1,
    x: 0,
    y: 0,
    // fillstyle: "#0095DD",
  };
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
