
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);
  
  monkey = createSprite(90,350,40,40);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(90,390,1000,20);
  ground.velocityX = -4;
  
  
  survivalTime = 0;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw(){
  background("lightblue");
  
  fill("black");
  textSize(20);
  text("Survival Time:" + survivalTime,50,40);
        
  
  if(gameState === PLAY){
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    Food();
    Obstacles();
    
    if(keyDown("space")){
      monkey.velocityY = -12
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      
    }
    
    monkey.collide(ground);
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
    
  else if(gameState === END){
    fill("black");
    textSize(30);
    text("GAME OVER !!",200,200);
    
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    monkey.velocityX = 0;
    
  }
  
  drawSprites();
}

function Food(){
   if(frameCount % 120 === 0){
  banana = createSprite(400,350,40,10);
  banana.addImage(bananaImage);
  banana.y = Math.round(random(200,200));
  banana.scale = 0.1
  banana.velocityX = -3;
  banana.lifetime = 200;

   FoodGroup.add(banana);
  }
}
  
function Obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(250,370,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    
    obstacleGroup.add(obstacle);
  }
}