let pg;
function setup() {
    let w = windowWidth;
    let h= windowHeight;
    createCanvas(w, h);
    
    pg = createGraphics(w, h);
    pg.background(220);
    pg.translate(width / 4, height / 4);
  
    let s_y = h - 600;

    t_l1 = createP('L1 (50 - 150)');
    t_l1.position(0, s_y);
    slider_l1 = createSlider(50, 150, 100);
    slider_l1.position(0, s_y + 50);

    t_l2 = createP('L2 (50 - 150)');
    t_l2.position(0, s_y + 75);
    slider_l2 = createSlider(50, 150, 100);
    slider_l2.position(0, s_y + 125);
  
    t_t1 = createP('theta1 (0 - 2PI)');
    t_t1.position(0, s_y + 150);
    slider_t1 = createSlider(0, 2000*PI, 3000 * PI / 2);
    slider_t1.position(0, s_y + 200);

    t_t2 = createP('theta2 (0 - 2PI)');
    t_t2.position(0, s_y + 225);
    slider_t2 = createSlider(0, 2000*PI, 1000 * PI);
    slider_t2.position(0, s_y + 275);

    t_p1 = createP('m1 (5 - 50)');
    t_p1.position(0, s_y + 300);
    slider_m1 = createSlider(5, 50, 30);
    slider_m1.position(0, s_y + 350);

    t_p2 = createP('m2 (5 - 50)');
    t_p2.position(0, s_y + 375);
    slider_m2 = createSlider(5, 50, 10);
    slider_m2.position(0, s_y + 425);

    apply_btn = createButton("Apply Changes");
    apply_btn.position(0, s_y + 475);
    apply_btn.mousePressed(applySketch);

    reset_btn = createButton("Restart");
    reset_btn.position(0, s_y + 525);
    reset_btn.mousePressed(resetSketch);
}

var m1 = 30;
var m2 = 10;
var g = 9.8;

var l1 = 100;
var l2 = 100;

let pi = Math.PI;
var t1 = 3 * pi/2;
var t2 = pi;

var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;

var t = 0;

var w1 = 0;
var w2 = 0;


function applySketch() {

  
    l1 = slider_l1.value();
    l2 = slider_l2.value();

    m1 = slider_m1.value();
    m2 = slider_m2.value();


}

function resetSketch() {

    pg.background(220);
  
    l1 = slider_l1.value();
    l2 = slider_l2.value();
    t1 = slider_t1.value() / 1000;
    t2 = slider_t2.value() / 1000;
    m1 = slider_m1.value();
    m2 = slider_m2.value();
    w1 = 0;
    w2 = 0;

    x1 = l1 * sin(t1);
    y1 = l1 * cos(t1);
  
    x2 = x1 + l2 * sin(t2);
    y2 = y1 + l2 * cos(t2);


}


function ForwardEuler(f, T0, dt, t0) {
  
    let T = T0;
    t = t0;
  
    for (let j = 0; j < 4; j++) {
            T[j] += dt * f(T, t)[j];
        }
    
    t += dt;
    // console.log(T);
    return T;
}
  
function D(sys, t) {
    let t1 = sys[0];
    let w1 = sys[1];
    let t2 = sys[2];
    let w2 = sys[3];

    return [w1, (-g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2) - 2 * m2 * Math.sin(t1 - t2) * (w2 ** 2 * l2 + w1 ** 2 * l1 * Math.cos(t1 - t2))) / (l1 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2)))), w2, (2 * Math.sin(t1 - t2) * (w1 ** 2 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(t1) + w2 ** 2 * l2 * m2 * Math.cos(t1 - t2))) / (l2 * (2 * m1 + m2 - m2 * Math.cos(2 * (t1 - t2))))];
}
  
  
function draw() {
  background(220);
  image(pg, 0, 0);
  
  pre_vect = createVector(x2, y2);
  pre_vect1 = createVector(t1, w1);
  pre_vect2 = createVector(t2, w2);
  
  x1 = l1 * sin(t1);
  y1 = l1 * cos(t1);

  x2 = x1 + l2 * sin(t2);
  y2 = y1 + l2 * cos(t2);


  translate(width / 4, height / 4);
  
  strokeWeight(2);
  stroke('red');
  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  
  
  fill('black');
  stroke('black');
  circle(x1, y1, m1 / 2);
  circle(x2, y2, m2 / 2);
  
  soln = ForwardEuler(D, [t1, w1, t2, w2], 0.12, t);
  
  t1 = soln[0];
  w1 = soln[1];
  t2 = soln[2];
  w2 = soln[3];
  
  vect = createVector(x2, y2);
  
  strokeWeight(1);
  stroke('black');
  if (pre_vect.x != 0) {
    pg.line(pre_vect.x, pre_vect.y, vect.x, vect.y);  
  }
  

  vect1 = createVector(t1, w1);
  fill('red');

  pg.line(pre_vect1.x * 30 + 350, pre_vect1.y * 250, vect1.x * 30 + 350, vect1.y * 250);

  circle(vect1.x * 30 + 350, vect1.y * 250, 7);
  
  stroke('red');
  circle(0, 0, 10);
  
  fill('gray');
  textFont('Corbel');
  textSize(30);
  stroke('gray');
  text('big bob', 450, 220);
  
  vect2 = createVector(t2, w2);
  
  stroke('black');
  pg.line(pre_vect2.x * 5 + 200, pre_vect2.y * 100 + 300, vect2.x * 5 + 200, vect2.y * 100 + 300);
  
  fill('red');
  circle(vect2.x * 5 + 200, vect2.y * 100 + 300, 7);
  
  fill('gray');
  stroke('gray');
  text('small bob', 150, 450); 


}