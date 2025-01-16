function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(40,50,55);

  fill(0);
  square(100, 100, 100);

  fill(0, 100, 100);
  circle(125, 125, 25);
  circle(175, 125, 25);

  arc(150, 160, 75, 25, 0, 100);

  stroke('orange');
  beginShape();
  strokeWeight(5);
  vertex(100, 100);
  vertex(75, 75);
  vertex(125, 125);
  vertex(150, 60);
  vertex(175, 90);
  vertex(200, 100);

  endShape(CLOSE);

}
