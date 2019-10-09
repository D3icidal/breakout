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
    requestAnimationFrame(renderDraws)
  }
  // requestAnimationFrame( renderDraws );
}




//
//start the game loop
//
renderDraws();
