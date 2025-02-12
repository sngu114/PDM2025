let gmonk, robot, lime, meatboy, roundboy, yellow, vanhelsing;
let characters = [];

function preload() {
  gmonk = loadImage("goldenmonk.png");
  robot = loadImage("robotspritesheet.png");
  lime = loadImage("limespritesheet.png");
  meatboy = loadImage("meatboyspritesheet.png");
  roundboy = loadImage("roundboyspritesheet.png");
  yellow = loadImage("yellowspritesheet.png");
  vanhelsing = loadImage("vanhelsingspritesheet.png");
}

function setup() {
  
  createCanvas(600, 600);
  imageMode(CENTER);

  character = new Character(random(80, width-80),random(80, height-80), gmonk);
  character2 = new Character(random(80, width-80),random(80, height-80), robot);
  character3 = new Character(random(80, width-80),random(80, height-80), lime);
  character4 = new Character(random(80, width-80),random(80, height-80), meatboy);
  character5 = new Character(random(80, width-80),random(80, height-80), roundboy);
  character6 = new Character(random(80, width-80),random(80, height-80), yellow);
  character7 = new Character(random(80, width-80),random(80, height-80), vanhelsing);
  
  characters.push(character, character2, character3, character4, 
    character5, character6, character7);
}

function draw() {
  background(220);
  characters.forEach(character => character.draw());
}

function keyPressed() {
  characters.forEach(character => character.keyPressed());
}

function keyReleased() {
  characters.forEach(character => character.keyReleased());
}

class Character {
  constructor(x, y, spritesheets) {
    this.x = x;
    this.y = y;
    this.currentAnimation = "stand";
    this.animations = {};
    this.spritesheets = spritesheets
    this.addAnimation("stand", new SpriteAnimation(spritesheets, 0, 0, 1));
    this.addAnimation("right", new SpriteAnimation(spritesheets, 0, 0, 6));
    
    let leftAnim = new SpriteAnimation(spritesheets, 0, 0, 6);
    leftAnim.flipped = true;
    this.addAnimation("left", leftAnim);
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "left":
          this.x -= 2;
          break;
        case "right": 
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = true;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}