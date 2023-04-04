var bg, bg_img;
var balloon, balloon_anim;
var topObstacle1, topObstacle2;
var bottomObstacle1, bottomObstacle2, bottomObstacle3;
var topObs, topObs_group;
var bottomObs, bottomObs_group;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOver_img;
var die_sound, jump_sound;
var restart_img, restart;

function preload(){
  bg_img = loadImage("assets/bg.png");

  balloon_anim = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

  topObstacle1 = loadImage("assets/obsTop1.png");
  topObstacle2 = loadImage("assets/obsTop2.png");

  bottomObstacle1 = loadImage("assets/obsBottom1.png");
  bottomObstacle2 = loadImage("assets/obsBottom2.png");
  bottomObstacle3 = loadImage("assets/obsBottom3.png");

  gameOver_img = loadImage("assets/gameOver.png");
  restart_img = loadImage("assets/restart.png");

  die_sound = loadSound("assets/die.mp3");
  jump_sound = loadSound("assets/jump.mp3");
}

function setup(){
  createCanvas(600,600);

  bg = createSprite(300,300,50,50);
  bg.addImage(bg_img);

  balloon = createSprite(100,300,50,50);
  balloon.addAnimation("balloon",balloon_anim);
  balloon.scale = 0.4;
  balloon.debug = true;

  gameOver = createSprite(300,300,50,50);
  gameOver.addImage(gameOver_img);

  restart = createSprite(300, 350);
  restart.addImage(restart_img);
  restart.scale = 0.5;

  topObs_group = new Group();
  bottomObs_group = new Group();
} 

function draw(){
  background(0);

  gameOver.depth = balloon.depth;
  gameOver.depth += gameOver.depth;

  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
 
    if(keyDown(UP_ARROW)){
      //jump_sound.play();

      balloon.velocityY = -10;
    }
    balloon.velocityY += 2;

    if(topObs_group.isTouching(balloon) || bottomObs_group.isTouching(balloon) || balloon.y >= 600){
      gameState = END;
    }

    spawnObsTop();
    spawnObsBottom();
  }

  if(gameState === END){
    balloon.velocityY = 0;
    balloon.position.x = 100;
    balloon.position.y = 300;

    topObs_group.setVelocityXEach(0);
    bottomObs_group.setVelocityXEach(0);

    topObs_group.setLifetimeEach(-1);
    bottomObs_group.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
}

function spawnObsTop(){
  if(World.frameCount % 150 === 0){
    topObs = createSprite(600, Math.round(random(60,100)), 10, 10);
    topObs.velocityX = -4;
    topObs.scale = 0.15;
    // topObs.debug = true;

    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: topObs.addImage(topObstacle1);
              break;
      case 2: topObs.addImage(topObstacle2);
              break;
      default:break;        
    }
    topObs.lifetime = 200;
    topObs_group.add(topObs);
    balloon.depth = topObs.depth;
    balloon.depth += balloon.depth;
  }
} 

function spawnObsBottom(){
  if(World.frameCount % 130 === 0){
    bottomObs = createSprite(600, Math.round(random(540,530)), 10, 10);
    bottomObs.velocityX = -4;
    bottomObs.scale = 0.1;
    // bottomObs.debug = true;

    var rand = Math.round(random(1,3))
    switch(rand){
      case 1: bottomObs.addImage(bottomObstacle1);
              break;
      case 2: bottomObs.addImage(bottomObstacle2);
              break;
      case 3: bottomObs.addImage(bottomObstacle3);
              break;
      default:break;      
    }
    bottomObs.lifetime = 200;
    bottomObs_group.add(bottomObs);
    balloon.depth = bottomObs.depth;
    balloon.depth += balloon.depth;
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  bottomObs_group.destroyEach();
  topObs_group.destroyEach();

  score = 0;  
}