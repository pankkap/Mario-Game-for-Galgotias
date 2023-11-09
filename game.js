var bg, bgImage;
var mario, mario_running;
var brickGroup, brickImage;
var coinImage, coinsGroup;
var coinScore = 0;

function preload() {
  bgImage = loadImage("images/bgnew.jpg");
  mario_running = loadAnimation(
    "images/mar1.png",
    "images/mar2.png",
    "images/mar3.png",
    "images/mar4.png",
    "images/mar5.png",
    "images/mar6.png",
    "images/mar7.png"
  );
  brickImage = loadImage('images/brick.png')

  coinImage = loadAnimation(
    "images/con1.png",
    "images/con2.png",
    "images/con3.png",
    "images/con4.png",
    "images/con5.png"
  );
}

function setup() {
  createCanvas(1000, 600);
  // background Picture
  bg = createSprite(600, 300);
  bg.addImage(bgImage);
  bg.scale = 0.5;

  // mario setup
  mario = createSprite(200, 520, 20, 50);
  mario.addAnimation("running", mario_running);
  mario.scale = 0.2;

  // Ground for mario
  ground = createSprite(200, 580, 400, 10);
  
  brickGroup = new Group();
  coinsGroup = new Group();

}

function draw() {
  drawSprites();
  bg.velocityX = -5

  if (bg.x < 100) {
    bg.x = bg.width / 4;
  }

  if (keyDown("space")) {
    mario.velocityY = -10;
  }
  // mario Issue
  if (mario.x < 200) mario.x = 200;
  if (mario.y < 50) mario.y = 50;

  mario.velocityY = mario.velocityY + 0.5;
  mario.collide(ground);
  ground.visible = false;

  generateBricks();
   // Stay on Bricks
   for (var i = 0; i < brickGroup.length; i++) {
    var temp = brickGroup.get(i);
    if (temp.isTouching(mario)) {
      mario.collide(temp);
    }
  } 

  generateCoins();
  for (var i = 0; i < coinsGroup.length; i++) {
    var temp = coinsGroup.get(i);
    if (temp.isTouching(mario)) {
      coinScore++;
      temp.destroy();
      temp = null;
    }
  }

   // Score Card
   textSize(20);
   fill("brown");
   text("Coins Collected: " + coinScore, 800, 50);
}




function generateBricks(){
  if (frameCount % 80 === 0) {
    var brick = createSprite(1200, 120, 40, 10);
    brick.y = random(50, 450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    brick.lifetime = 250;
    brickGroup.add(brick);
  }

}

function generateCoins() {
  if (frameCount % 80 === 0) {
    var coin = createSprite(1200, 120, 40, 10);
    coin.y = Math.round(random(80, 350));
    coin.addAnimation("coin", coinImage);
    coin.scale = 0.1;
    coin.velocityX = -3;

    coin.lifetime = 500;

    coinsGroup.add(coin);
  }
}