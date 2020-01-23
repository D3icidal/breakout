var modal = document.getElementById("announcement-modal")
var modalText = document.getElementById("modal-text")
var trigger = document.querySelector(".trigger");
var closeButton = document.getElementById("close-button")

function addscore(points) {
  score += points
  if(score >= brickRowCount*brickColumnCount) {
    drawBricks();
    // alert("YOU WIN, CONGRATS!");
    triggerModal("YOU WIN, CONGRATS!");
  }
}

function triggerModal(msg){
  if (msg) { modalText.innerText = msg }
  toggleModal();
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        triggerModal();
        reloadGame();
    }
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
