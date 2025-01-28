function setup() {
  createCanvas(windowHeight, windowWidth);
  colorMode(HSB, 360, 100, 100, 600);

}

function draw() {
  background(0, 0, 100);

  //example 1//
  noStroke();
  fill(100, 100, 100)
  rect(5, 5, 220, 110);
  
  stroke(0);
  fill(0, 0, 100);
  circle(60, 60, 90);

  fill(0, 0, 100);
  square(125, 15, 90);

  noStroke();

  //example 2

  //red
  fill(0, 100, 100, 200);
  circle(150, 250, 100);

  //blue
  fill(240, 100, 100, 200);
  alpha(200)
  circle(120, 300, 100);

  //green
  fill(100, 100, 100, 200);
  circle(180, 300, 100);

  //example 3

  //box
  noStroke();
  fill(0, 0, 0);
  rect(5, 450, 220, 110);

  //pacman

  beginShape();

  fill(60, 100, 100);
  arc(62, 505, 90, 90, radians(220), radians(140));
  endShape(closed);

  //ghost

  //rectangle 

  noStroke()
  fill(0, 100, 100);
  rect(130, 500, 85, 50);

  //circle
  fill(0, 100, 100);
  ellipse(172.5, 505, 85, 85);

  //eyeballL

  fill(0, 0, 100);
  circle(150, 505, 25, 20);

  //eyeballR

  fill(0, 0, 100);
  circle(195, 505, 25, 20);

  //eyeballpupilL

  fill(240, 100, 100);
  circle(150, 505, 15, 20);

  //eyeballpupilR

  fill(240, 100, 100);
  circle(195, 505, 15, 20);


  //example 4

  //outer square

  fill(240, 100, 50);
  rect(5, 650, 220, 200)

  //inner circle
  
  stroke(0, 0, 100);
  strokeWeight(3);
  fill(100, 100, 60);
  circle(113, 750, 100);

  //star

  push(); // Save the current drawing settings
  translate(150, 750); // Move the star to the desired position (x: 150, y: 650)

  stroke(0, 0, 100); // White border
  strokeWeight(3); // Border thickness
  fill(0, 100, 100); // Red fill
  drawStar(0, 0, 30, 60, 5); // Draw the star at (0, 0) with inner radius 30, outer radius 60, and 5 points
  pop(); // Restore previous drawing settings

  // Function to draw a star
  function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints; // Angle between star points
  let halfAngle = angle / 2.0; // Half-angle for inner points
  
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    // Outer point
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    // Inner point
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
} 
}



