function renderDraws() {
  // draw();
  // requestAnimationFrame(renderDraws, step() );
  // ballPos = draw();


  draw();
  // renderNeonBall();
  // renderNeonRect();
  // rainbowRender(ballPos[0], ballPos[1])
  requestAnimationFrame( renderDraws );
  // step();
}


createBricks()

createNeonBall();

renderDraws();
