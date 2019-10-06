function renderDraws() {
  // draw();
  // requestAnimationFrame(renderDraws, step() );
  // ballPos = draw();

  draw();
  // renderNeonBall();
  // renderNeonRect();
  // rainbowRender(ballPos[0], ballPos[1])
  // step();
  if( downPressed ){
    setTimeout(renderDraws,200)
  }else {
    setTimeout(renderDraws,10)
  }
  // requestAnimationFrame( renderDraws );
}


randomize_Parameters()
createBricks()

createNeonBall(ballRGB[0], ballRGB[1], ballRGB[2]);

//
//start the game loop
//
renderDraws();
