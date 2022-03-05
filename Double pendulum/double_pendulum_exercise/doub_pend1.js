function setup() {
  createCanvas(1000, 1000);
}

var m1 = 30;
var m2 = 10;
var g = 10;

var l1 = 100;
var l2 = 100;

let pi = Math.PI;
var t1 = -pi;
var t2 = -pi / 2;

var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;


var w1 = 0;
var w2 = 0;

var j = 0;

var points = [];
var phase1 = [];
var phase2 = [];

var soln_x1 = [];
var soln_y1 = [];
var soln_x2 = [];
var soln_y2 = [];

function ForwardEuler(f, T0, dt, t0, tf) {
    let n = Math.floor((tf - t0) / dt);
    let T = new Array(n);
    let t = new Array(n);  
    T[0] = T0;
    t[0] = t0;

    for (let i = 1; i < n + 1; i++) {
        t[i] = t[i - 1] + dt;
        T[i] = [];
        for (let j = 0; j < 4; j++) {
            T[i][j] = T[i - 1][j] + dt * f(T[i - 1], t[i - 1])[j];
        }
    }
    return T;
}

function D(sys, t) {
    let t1 = sys[0];
    let w1 = sys[1];
    let t2 = sys[2];
    let w2 = sys[3];

    return [w1, (-g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2) - 2 * m2 * Math.sin(t1 - t2) * (w2 ** 2 * l2 + w1 ** 2 * l1 * Math.cos(t1 - t2))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2)))), w2, (2 * Math.sin(t1 - t2) * (w1 ** 2 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(t1) + w2 ** 2 * l2 * m2 * Math.cos(t1 - t2))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2))))];
}

soln = ForwardEuler(D, [t1, w1, t2, w2], 0.1, 0, 200);


for (let i = 0; i < soln.length; i++) {
  soln_x1[i] = l1 * Math.sin(soln[i][0]);
  soln_y1[i] = l1 * Math.cos(soln[i][0]);
  soln_x2[i] = soln_x1[i] + l2 * Math.sin(soln[i][2]);
  soln_y2[i] = soln_y1[i] + l2 * Math.cos(soln[i][2]);
  
}
function draw() {
  background(220);
  
  x1 = soln_x1[j];
  y1 = soln_y1[j];
  x2 = soln_x2[j];
  y2 = soln_y2[j];
  t1 = soln[j][0];
  w1 = soln[j][1];
  t2 = soln[j][2];
  w2 = soln[j][3];
  
  translate(width / 4, height / 4);
  
  strokeWeight(2);
  stroke('red');
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  
  
  fill('black');
  stroke('black');
  circle(x1, y1, m1 / 2);
  circle(x2, y2, m2 / 2);
  
  vect = createVector(x2, y2);
  points.push(vect);
  
  strokeWeight(1);
  stroke('black');
  for (let k = 1; k < points.length; k++) {
      let v1 = points[k - 1];
      let v2 = points[k];
      line(v1.x, v1.y, v2.x, v2.y);
  }
  
  
  vect1 = createVector(t1, w1);
  fill('red');

  phase1.push(vect1);
  
  for (let l = 1; l < points.length; l++) {
    let v3 = phase1[l - 1];
    let v4 = phase1[l];
    line(v3.x * 30 + 400, v3.y * 250, v4.x * 30 + 400, v4.y * 250);
  } 
  circle(vect1.x * 30 + 400, vect1.y * 250, 7);
  
  stroke('red');
  circle(0, 0, 10);
  
  fill('gray');
  textFont('Corbel');
  textSize(30);
  stroke('gray');
  text('big bob', 360, 220);
  
  vect2 = createVector(t2, w2);

  phase2.push(vect2);
  
  stroke('black');
  for (let m = 1; m < phase2.length; m++) {
    let v5 = phase2[m - 1];
    let v6 = phase2[m];
    line(v5.x * 5 + 200, v5.y * 100 + 400, v6.x * 5 + 200, v6.y * 100 + 400);
  } 
  
  fill('red');
  circle(vect2.x * 5 + 200, vect2.y * 100 + 400, 7);
  
  fill('gray');
  stroke('gray');
  text('small bob', 200, 600);
  
  if (j < 2000) {
    j++;
  }
  
  
}