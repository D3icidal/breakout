var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.getElementById("close-button")


function addscore(points) {
  if(score >= brickRowCount*brickColumnCount) {
    // drawBricks();
    alert("YOU WIN, CONGRATS!");
    triggerModal();
  }
}

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

function close(event){
  if (event.target === closeButton) {
      // triggerModal();
      toggleModal();
      reloadGame();
  }

}

function reloadGame(){
  document.location.reload();
}
closeButton.addEventListener("mouseup", close);
window.addEventListener("click", windowOnClick);
