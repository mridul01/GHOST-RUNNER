var ghost,ghostImage;
var tower,towerImage;
var door,doorImage;
var climber,climberImage;
var doorGroup , climberGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spookySound;


function preload(){
  
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
  
}


function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300,100,100);
  tower.addImage(towerImage);
  
  ghost = createSprite(300,340,20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState===PLAY){
  tower.velocityY = 2;
  
  if(tower.y>400){
    tower.y = 300;   
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
   // ghost.changeAnimation("ghost-jumping.png");
  }
  
  ghost.velocityY = ghost.velocityY +0.5;
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
 if(climberGroup.isTouching(ghost)){
   ghost.velocityY = 0;
 }
  
    if(ghost.y>600){
      gameState=END;
      ghost.destroy();
    }
  spawnDoor();
  drawSprites();
  }
  
  
  
  if(gameState===END){
    textSize(50);
    fill("yellow");
    stroke("red");
    text("GAME OVER",150,300);

  }
}

function spawnDoor(){
  
  if(frameCount%250===0){
  door = createSprite(400,200,50,50);
  door.x = Math.round(random(120,480));
  door.addImage(doorImage);
  door.sclae = 0.5;
  door.velocityY = 2;
    door.lifetime = 400;
    
    doorGroup.add(door);
    
  
   climber = createSprite(400,265,200,10);
  climber.addImage(climberImage);
  climber.scale = 1;
    climber.x = door.x;
    climber.velocityY = 2;
    climberGroup.add(climber);
    climber.lifetime = 400;
    
    
     ghost.depth = door.depth;
     ghost.depth = ghost.depth +1;
    
  }
}







