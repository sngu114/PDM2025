let GameStates = Object.freeze({ 
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let highScore = 0;
let time = 30;
let textPadding = 15;
let gameFont;


let bugsprite;
let bugSquishedSprite;
let bugs = [];
let bugAnimationFrames = [];

let framesindexer = 0;
let frameAmount = 4;
let framesTime = 0;
let framesDelayed = 4;

let Speed = 3;

function preload() {
  
  bugsprite = loadImage("MEDIA/catbug.png");
  bugSquishedSprite = loadImage("MEDIA/bugsquished.png");
  gameFont = loadFont("MEDIA/PressStart2P-Regular.ttf");

}

function setup() {

  createCanvas(900, 400);
  textFont(gameFont);
  let fHeight = bugsprite.height;
  let fWidth = bugsprite.width / frameAmount;

  for (let i = 0; i < frameAmount; i++) {

    bugAnimationFrames.push(bugsprite.get(i * fWidth, 0, fWidth, fHeight));

  }
  
  bugSpawner(4);

}

function draw() {
  background(220);

  switch(gameState) {
    case GameStates.START:
      textAlign(CENTER, CENTER);
      textSize(18);
      text("CatSpider Squisher", width / 2, height / 3);
      text("Press ENTER to Start", width / 2, height / 2);
      break;
    
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score, textPadding, textPadding);
      textAlign(RIGHT, TOP);
      text("Time: " + Math.ceil(time), width - textPadding, textPadding);
      
      time -= deltaTime / 1000;
      if (time <= 0) {
        gameState = GameStates.END;
      }
      
      for (let bug of bugs) {

        bug.move();
        bug.display();
        
      }

      if (frameCount % framesDelayed === 0) {
        framesindexer = (framesindexer + 1) % frameAmount;
      }
      
      bugs = bugs.filter(bug => !bug.Remover());
      break;
    case GameStates.END:
      textAlign(CENTER, CENTER);
      text("Game Over! Thanks for Playing!", width / 2, height / 2 - 20);
      text("Score: " + score, width / 2, height / 2);

      if (score > highScore) highScore = score;
      text("High Score: " + highScore, width / 2, height / 2 + 20);
      break;

  }
}

function keyPressed() {
  if (keyCode === ENTER) {

    if (gameState === GameStates.START || gameState === GameStates.END) {
      gameState = GameStates.PLAY;

      time = 30;
      score = 0;
      bugs = [];
      bugSpawner(7);
      Speed = 3;
      
    }
  }
}

function mousePressed() {

  if (gameState === GameStates.PLAY) {
    for (let bug of bugs) {
      if (bug.clicked(mouseX, mouseY)) {

        bug.squish();
        score++;

        Speed += 0.2; 
        bugSpawner(1); 

      }
    }
  }
}

function bugSpawner(count) {

  for (let i = 0; i < count; i++) {

    bugs.push(new Bugclass());
    
  }

}

class Bugclass {
  constructor() {

    this.y = random(height);
    this.x = random(width);
  

    this.alive = true;
    this.speed = Speed;
    this.AngledDirection = random(TWO_PI);
    this.size = 70;
    
  
  }
  
  move() {
    if (this.alive) {

      this.x += cos(this.AngledDirection) * this.speed;
      this.y += sin(this.AngledDirection) * this.speed;
      
      if (this.y > height || this.y < 0) {

        this.AngledDirection = -this.AngledDirection;

      }

      if (this.x > width || this.x < 0) {

        this.AngledDirection = PI - this.AngledDirection;
      }
    }
  }

  clicked(mousex, mousey) {

    return dist(mousex, mousey, this.x, this.y) < this.size / 2;

  }
  
  display() {

    push();

    translate(this.x, this.y);
    rotate(this.AngledDirection + PI / 2); 
    imageMode(CENTER);

    if (this.alive) {
      image(bugAnimationFrames[framesindexer], 0, 0, this.size, this.size);

    } else {

      image(bugSquishedSprite, 0, 0, this.size, this.size);

    }

    pop();

  }
  
  squish() {

    this.squishedTime = millis();
    this.speed = 0;
    this.alive = false;

  }
  
  Remover() {

    return !this.alive && millis() - this.squishedTime > 800;

  }

}
