function renderDraws() {
  // draw();
  // requestAnimationFrame(renderDraws, step() );
  // ballPos = draw();

  draw();
  // renderNeonBall();
  // renderNeonRect();
  // rainbowRender(ballPos[0], ballPos[1])
  // step();
  if(downPressed || lives <= 0){
    setTimeout(renderDraws,100)
  }else{
    requestAnimationFrame(renderDraws)
  }
  // requestAnimationFrame( renderDraws );
}




//
//start the game loop
//
// draw();
renderDraws();
