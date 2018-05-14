var inc = 0.01;
var scl = 20; //scale
var cols, rows;
var fr; //just the frame rate
var zoff = 0; //3rd dimension time-frame
var particles = [];
var flowfield;  // an array to store the vectors
var wave; //syth var
var env;
var x = 0;
var amp;
var type = 0;
var arType = ['sine', 'sawtooth', 'triangle', 'square'];
var freqq;
var notes = [];

function setup() {
  createCanvas(windowWidth, windowHeight-40);
  background(0);
  cols = floor(width / scl); //creating rows and colums
  rows = floor(height / scl);
  fr = createP('');
  flowfield = new Array(cols * rows); //has to have spots equal to colums n rows
  for (var i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
  env = new p5.Env();
	env.setADSR(0.05, 0.1, 0.5, 0.1);
	env.setRange(0.8, 0);
	wave = new p5.Oscillator('sine');
	wave.amp(env);
	wave.start();
	amp = new p5.Amplitude();
  for (var i=0; i<=127; i++){
		notes[i] = i;
	}
}


function draw() {

  var yoff = 0;   // y offset fro noise
  for (var y = 0; y < rows; y++) {
    var xoff = 0; //x offset noise
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols; //2d value into 1d array
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;   //gime 3d noise
      var v = p5.Vector.fromAngle(angle);   //creating a vector with from angle
      v.setMag(0.5);
      flowfield[index] = v; //stores vectors
      xoff += inc;
      // stroke(0);   flowfield
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0004;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}
