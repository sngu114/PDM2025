let selectedColor;
let x = 0, y = 700;
let dragging = false;
let offsetX = 0, offsetY = 0;
let paintPoints = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  selectedColor = color(0, 0, 100);
}

function draw() {
  background(0, 0, 50);

  //canvas
  fill(0, 0, 93);
  rect(100, 100, 700, 400);

  //stored paint points
  for (let i = 0; i < paintPoints.length; i++) {
    fill(paintPoints[i].color);
    noStroke();
    ellipse(paintPoints[i].x, paintPoints[i].y, 10);
  }

  //color pallet 
  fill(0, 100, 100);
  square(102, 103, 20);
  fill(40, 100, 100);
  square(102, 125, 20);
  fill(60, 100, 100);
  square(102, 147, 20);
  fill(80, 100, 100);
  square(102, 169, 20);
  fill(180, 100, 100);
  square(102, 190, 20);
  fill(225, 100, 100);
  square(102, 211, 20);
  fill(330, 60, 90);
  square(102, 233, 20);
  fill(30, 80, 40);
  square(102, 254, 20);
  fill(0, 0, 100);
  square(102, 276, 20);
  fill(0, 0, 0);
  square(102, 298, 20);
  
  //coloring square
  if (dragging) {
    x += (mouseX - pmouseX);
    y += (mouseY - pmouseY);

}

  fill(selectedColor);
  noStroke();
  square(x, y, 20);

}

function mouseClicked() {
  if (mouseX > 102 && mouseX < 122) {
    let index = Math.floor((mouseY - 103) / 22);
    
    if (index >= 0 && index < 10) {
      let colors = [
        //red
        [0, 100, 100],  
        //orange
        [40, 100, 100], 
        //yellow
        [60, 100, 100], 
        //green
        [80, 100, 100], 
        //cyan
        [180, 100, 100], 
        //blue
        [225, 100, 100], 
        //pink
        [330, 60, 90],  
        //brown
        [30, 80, 40],   
        //white
        [0, 0, 100],    
        //black
        [0, 0, 0]       
      ];

      selectedColor = color(colors[index][0], colors[index][1], colors[index][2]);
    }
  }
}

function mousePressed() {
  if (mouseX >= x && mouseX <= x + 20 && mouseY >= y && mouseY <= y + 20) {
   
    dragging = true;
    offsetX = mouseX - x;
    offsetY = mouseY - y;

  }
}

function mouseDragged() {
  if (dragging) {

    return;

  }

  if (mouseX > 100 && mouseX < 800 && mouseY > 100 && mouseY < 500) {
   
    let steps = dist(mouseX, mouseY, pmouseX, pmouseY);

    for (let i = 0; i < steps; i++) {

      let x = lerp(pmouseX, mouseX, i / steps);
      let y = lerp(pmouseY, mouseY, i / steps);
      paintPoints.push({ x: x, y: y, color: selectedColor });

    }
  }
}