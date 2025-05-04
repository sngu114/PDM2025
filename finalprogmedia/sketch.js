let squirrelImg
let winImg;
let loseImg;
let foodImgs = []
let foods = [];
let badImg;
let chompSound;
let winSound;
let loseSound;
let port;
let buttonPressed = false;
const START = "start";
const PLAY  = "play";
const END   = "end";
let gameState = START;
let score = 0;
let lives = 3;
let fallSpeed = 2;
let spawnInterval = 60;
let frameCounter = 0;
let timeLeft = 30;
let endReason = null;
let squirrelX;
const squirrelY = 350;
const squirrelSize = 100;
let endSoundPlayed = false;

function preload() {
  squirrelImg = loadImage("media/squirrel.png");
  winImg = loadImage("media/chubbysquirrel.png");
  loseImg = loadImage("media/deadsquirrel.png");
  foodImgs.push(loadImage("media/chickennugget.png"));
  foodImgs.push(loadImage("media/coffee.png"));
  badImg = loadImage("media/trashbag.png");
  chompSound = loadSound("media/chomp.mp3");
  winSound = loadSound("media/winsound.mp3");
  loseSound = loadSound("media/losesound2.mp3");
}

function setup() {

  createCanvas(900, 400);

  port = createSerial();
  createButton("Connect").mousePressed(() => port.open("Arduino", 9600));
  createButton("Zero Joystick").mousePressed(() => {
    if (port.opened()) port.write("zero\n");
  });
  noCursor();

  squirrelX = width / 2;
}

function draw() {
  background(200, 230, 255);

  let line;
  let latest = "";
  while ((line = port.readUntil("\n")) !== "") latest = line;

  if (latest && gameState === PLAY) {
    let parts = latest.split(",").map(Number);
    let xRaw = parts[0], swRaw = parts[2];
    squirrelX = constrain(squirrelX + xRaw * 0.02, squirrelSize/2, width - squirrelSize/2);

    if (swRaw === 1 && !buttonPressed) {
      buttonPressed = true;
      handleClick();
    } else if (swRaw === 0) {
      buttonPressed = false;
    }
  }

  if (gameState === START) {
    showStart();
  } else if (gameState === PLAY) {
    playGame();
  } else { // END
    showEnd();
  }
}

function handleClick() {
  for (let i = foods.length - 1; i >= 0; i--) {

    let f = foods[i];
    let d = dist(f.x, f.y, squirrelX, squirrelY);

    if (d < (squirrelSize + f.size) / 2) {

      foods.splice(i, 1);

      if (f.type === "good") {

        score++;
        chompSound.play();
      } else {

        lives--;
        if (port.opened()) port.write("life\n");

        if (lives <= 0) {

          endReason = "lives";
          gameState = END;

        }
      }
      break;
    }
  }
}

function showStart() {

  textAlign(CENTER, CENTER);
  textSize(24);
  text("LSU SQUIRREL SURVIVAL", width/2, height/3);
  textSize(16);
  text("Press ENTER to Start", width/2, height/2);

}

function playGame() {

  timeLeft -= deltaTime / 1000;

  if (timeLeft <= 0) {

    timeLeft = 0;
    endReason = "time";
    gameState = END;

  }

  frameCounter++;

  if (frameCounter % spawnInterval === 0) {

    foods.push(new Food());
    foods.push(new Food("bad"));
    foods.push(new Food("bad"));

    if (spawnInterval > 20) spawnInterval--;
    fallSpeed += 0.1;

  }

  for (let f of foods) f.y += fallSpeed;
  foods = foods.filter(f => f.y <= height + f.size);

  imageMode(CENTER);
  image(squirrelImg, squirrelX, squirrelY, squirrelSize, squirrelSize);
  for (let f of foods) image(f.img, f.x, f.y, f.size, f.size);

  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 30);
  text("Time: " + ceil(timeLeft), 10, 50);
}

function showEnd() {

  textAlign(CENTER, CENTER);
  textSize(24);
  let won = (endReason === "time" && score >= 10);

  if (won) {

    text("You Won!", width/2, height/3);
    image(winImg, width/2, height/2, squirrelSize, squirrelSize);
    if (!endSoundPlayed) {
      winSound.play();
      endSoundPlayed = true;

    }
  } else {

    text("Game Over! You Died", width/2, height/3);
    image(loseImg, width/2, height/2, squirrelSize, squirrelSize);
    if (!endSoundPlayed) {
      loseSound.play();
      endSoundPlayed = true;
    }
  }

  textSize(16);
  text("Final Score: " + score, width/2, height*0.75);
  text("Press ENTER to Restart", width/2, height*0.85);
}

function keyPressed() {

  if (keyCode === ENTER && (gameState === START || gameState === END)) {

    score = 0;
    lives = 3;
    fallSpeed = 2;
    spawnInterval = 60;
    frameCounter = 0;
    foods = [];
    timeLeft = 30;
    endReason = null;
    gameState = PLAY;
    endSoundPlayed = false;

    if (port.opened()) port.write("reset\n");

  }
}

class Food {

  constructor(type) {

    this.x = random(40, width-40);
    this.y = -20;
    this.size = 70;
    this.type = (type === "bad") ? "bad" : (random() < 0.8 ? "good" : "bad");
    this.img = (this.type === "good") ? random(foodImgs) : badImg;
    
  }
}
