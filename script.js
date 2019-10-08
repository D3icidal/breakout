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


randomize_Parameters()
createBricks()

createNeonBall(ballRGB[0], ballRGB[1], ballRGB[2]);

//
//start the game loop
//
renderDraws();


var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        triggerModal();
    }
}

function triggerModal(Msg){

  toggleModal();
}

function close(){
  reloadGame();
}

function reloadGame(){
  document.location.reload();
}
// closeButton.addEventListener("click", close());
window.addEventListener("click", windowOnClick);
