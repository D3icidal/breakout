var w = document.getElementById("myCanvas").width
var h = document.getElementById("myCanvas").height

var NUM_PARTICLES = ( ( COLS = (h / 4) ) * ( ROWS = (w / 4) ) ),
    THICKNESS = Math.pow( 80, 2 ),
    SPACING = Math.round(h / 100),
    MARGIN = Math.round(w / 5),
    COLOR = 220,
    DRAG = 0.95,
    EASE = 0.25,
    container,
    particle,
    particleCanvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    p, s,
    r, c
    ;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

function init() {
  // container = document.getElementById( 'gameContainer' );
  // particleCanvas = document.createElement( 'canvas' );
  particleCanvas = document.getElementById('particleCanvas');
  particleCanvas.height = h;
  particleCanvas.width = w;
  ctx = particleCanvas.getContext( '2d' );

  // particleCanvas.style.backgroundColor = "transparent";
  // particleCanvas.style.opacity = ".5";

  man = false;
  tog = true;

  list = [];

  // w = particleCanvas.width = COLS * SPACING + MARGIN * 2;
  // h = particleCanvas.height = ROWS * SPACING + MARGIN * 2;
  // w = canvasWidth
  // h = canvasHeight

  // container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
  // container.style.marginTop = Math.round( h * -0.5 ) + 'px';

  //create and place every damn particle
  for ( i = 0; i < NUM_PARTICLES; i++ ) {

    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

    list[i] = p;
  }
  //
  // container.addEventListener( 'mousemove', function(e) {
  //
  //   bounds = canvas.getBoundingClientRect();
  //   mx = e.clientX - bounds.left;
  //   my = e.clientY - bounds.top;
  //   man = true;
  //
  // });

  if ( typeof Stats === 'function' ) {
    document.body.appendChild( ( stats = new Stats() ).domElement );
  }

  // container.appendChild( particleCanvas );
  // container.appendChild( particleCanvas );
}

function step() {

  if ( stats ) stats.begin();

  if ( tog = !tog ) {

    if ( !man ) {

      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];

      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;

      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

    }

  } else {

    b = ( a = ctx.createImageData( w, h ) ).data;

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }

    ctx.putImageData( a, 0, 0 );
  }

  if ( stats ) stats.end();
}

function allRender () {
  requestAnimationFrame(allRender);
  draw();
  step();
  // requestAnimationFrame(draw);
}

init();
// step();
allRender();
