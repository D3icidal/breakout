function renderDraws() {
  // draw();
  // requestAnimationFrame(renderDraws, step() );
  // ballPos = draw();


  ballPos = draw();
  renderNeonBall();
  renderNeonRect();
  // rainbowRender(ballPos[0], ballPos[1])
  // requestAnimationFrame( renderDraws );
  // step();
}

renderDraws();
