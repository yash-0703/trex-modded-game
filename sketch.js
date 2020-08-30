
var gameover,restart,gameoverimg,restartimg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
    obstacle6,count=0,obstaclesgroup;
var cloud,cloudImg,cloudsgroup;
localStorage["HighestScore"] = 0; 
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided =loadImage("trex_collided.png");
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  cloudImg=loadImage ("cloud.png");
 gameoverimg=loadImage("gameOver.png"); 
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 gameover = createSprite(300,100);
 restart = createSprite(300,140);
gameover.visible = false;
    restart.visible = false;
  gameover.addImage(gameoverimg)
  restart.addImage(restartimg)
}

function draw() {
  background("#FFFFFF");
  text("Score: "+ count , 500,50);

  if (gameState==PLAY){
  count = count + Math.round(getFrameRate()/60);
  spawnclouds();
  spawnobstacles();
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
    if (obstaclesgroup.isTouching(trex)){ 
    gameState=END;
    }
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2; 
    
  } 
    
  }
 else if (gameState==END){
 gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addImage(trex_collided);
    if(mousePressedOver(restart)) {
    resete();
  }
  
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
 }

  trex.collide(invisibleGround);
  drawSprites();
}
function resete(){
//  frame=World.frameCount;
  
//reset=1;
  gameState=PLAY;
gameover.visible = false;
    restart.visible = false;  
obstaclesgroup.destroyEach();
cloudsgroup.destroyEach();
trex.addAnimation("running", trex_running);
if(localStorage["HighestScore"]<count){ localStorage["HighestScore"] = count; } console.log(localStorage["HighestScore"]);
  count=0;
}
function spawnobstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    
    switch(rand){
      case 1:obstacle.addImage(obstacle1);break;
        case 2:obstacle.addImage(obstacle2);break;
          case 3:obstacle.addImage(obstacle3);break;
            case 4:obstacle.addImage(obstacle4);break;
              case 5:obstacle.addImage(obstacle5);break;
                case 6:obstacle.addImage(obstacle6);break;
                default:break;     
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 130;
    //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
}
function spawnclouds(){
if (frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y =Math.round(random(80,120));
    cloud.addImage("cloud",cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsgroup.add(cloud);
  
  }
} 