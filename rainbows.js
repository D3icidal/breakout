// var range;
// var color;
// var sizeInt;
// var left;
// var top;
// var style;
//
// var canvas = document.getElementById("rainbowCanvas");
// var ctx = canvas.getContext("2d")
//
// canvas.offscreenCanvas = document.createElement('canvas');
// var offscreenCtx = canvas.offscreenCanvas.getContext('2d');
// canvas.offscreenCanvas.width = canvas.width;
// canvas.offscreenCanvas.height = canvas.height;
//
// function rainbowRender(ballX, ballY) {
//       range = 15;
//
//       color = "background: rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+");";
//
//       sizeInt = getRandomInt(5, 30);
//       size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
//
//       left = "left: " + getRandomInt(ballX-range-sizeInt, ballX+range) + "px;";
//
//       top = "top: " + getRandomInt(ballY-range-sizeInt, ballY+range) + "px;";
//
//       style = left+top+color+size;
//
//       offscreenCtx.beginPath();
//       offscreenCtx.arc(ballX, ballY, sizeInt, 0, Math.PI*2);
//       // offscreenCtx.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
//       offscreenCtx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
//       offscreenCtx.fill();
//       ctx.drawImage(canvas.offscreenCanvas , 0, 0);
//
//       // $("<div class='ball' style='" + style + "'></div>").appendTo('#breakoutCanvas').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();});
//
//     // requestAnimationFrame(rainbowRender())
//   };
//
//
// // rainbowRender()
// // $(document).ready(function(){
//
// //   var mousePos = {};
//
// function getRandomInt(min, max) {
//   return Math.round(Math.random() * (max - min + 1)) + min;
// }
//
// //   $(window).mousemove(function(e) {
// //     mousePos.x = e.pageX;
// //     mousePos.y = e.pageY;
// //   });
//
// //   $(window).mouseleave(function(e) {
// //     mousePos.x = -1;
// //     mousePos.y = -1;
// //   });
//
// //     var draw = setInterval(function(){
// //     if(mousePos.x > 0 && mousePos.y > 0){
//
// //       var range = 15;
//
// //       var color = "background: rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+");";
//
// //       var sizeInt = getRandomInt(5, 30);
// //       size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
//
// //       var left = "left: " + getRandomInt(mousePos.x-range-sizeInt, mousePos.x+range) + "px;";
//
// //       var top = "top: " + getRandomInt(mousePos.y-range-sizeInt, mousePos.y+range) + "px;";
//
// //       var style = left+top+color+size;
// //       $("<div class='ball' style='" + style + "'></div>").appendTo('#gameContainer').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();});
// //     }
// //   }, 10);
// // });
//
// // //   var draw = setInterval(function(){
// // //     if(mousePos.x > 0 && mousePos.y > 0){
//
// // //       var range = 15;
//
// // //       var color = "background: rgb("+getRandomInt(0,255)+","+getRandomInt(0,255)+","+getRandomInt(0,255)+");";
//
// // //       var sizeInt = getRandomInt(10, 30);
// // //       size = "height: " + sizeInt + "px; width: " + sizeInt + "px;";
//
// // //       var left = "left: " + getRandomInt(mousePos.x-range-sizeInt, mousePos.x+range) + "px;";
//
// // //       var top = "top: " + getRandomInt(mousePos.y-range-sizeInt, mousePos.y+range) + "px;";
//
// // //       var style = left+top+color+size;
// // //       $("<div class='ball' style='" + style + "'></div>").appendTo('#gameContainer').one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){$(this).remove();});
// // //     }
// // //   }, 10);
// // // });
