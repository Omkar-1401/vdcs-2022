/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

function setup() {
  angleMode(DEGREES);
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  noFill();

}

function draw() {
  translate(width / 2, height / 2);
  background(220);
  rect(100, 100, 10, 10);
}