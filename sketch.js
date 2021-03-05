var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg;
var EnemiesGroup;
var count;
var gameOver, gameOverImg;
var harry, harryImg;
var enemy1, enemy2, enemy3, enemy4;
var GemsGroup;
var gCount;



function preload(){
 bgImg = loadImage("images/track2.png");
 harryImg = loadImage("images/hp.png");
 gameOverImg = loadImage("images/gameOver.png");
 enemy1 = loadImage("images/Enemy1.png");
 enemy2 = loadImage("images/Enemy2.png");
 enemy3 = loadImage("images/Enemy3.png");
 enemy4 = loadImage("images/Enemy4.png");
 enemy5 = loadImage("images/Enemy5.png");
 gem1 = loadImage("images/Gem1.png");
 gem2 = loadImage("images/Gem2.png");
 hatImg = loadImage("images/Hat.png")
}

function setup() {
  canvas = createCanvas(800, 600);

  backGround = createSprite(400,250,50,50);
  backGround.addImage(bgImg);
  harry = createSprite(200,250,20,50);
  harry.addImage(harryImg);
  harry.setCollider("circle",0,0,250);
  harry.debug = true;
  //harry.velocityY = 15;
  harry.scale = 0.35;
  
  
  gameOver = createSprite(400,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  hat = createSprite(700,300,50,50);
  hat.addImage(hatImg);
  hat.scale = 0.2;
  hat.visible = false;
  
  EnemiesGroup = new Group()
  GemsGroup = new Group();
  
  count = 0;
  gCount = 0;
}

function draw() {

  background(255);
if (gameState===PLAY){

  backGround.velocityX = -9
  if(backGround.x < 0){
    backGround.x = backGround.width/2
  }

  //harry.bounceOff(canvas)

  if(keyDown(LEFT_ARROW)){
    changePosition(0,-10);
  }
 if(keyDown(RIGHT_ARROW)){
    changePosition(0,+10)
}
  Enemies();
  Gems();

  if(GemsGroup.isTouching(harry)){
    count = count + 5;
    //console.log(score);
    gCount = gCount + 1;
    //console.log(gemCount)
  }

if(gCount===7){
  hat.visible = true;                                                                                                                                                                                                                                                                                                                                                                                                 
}
}

/*else if(gameState===END){
if(EnemiesGroup.isTouching(harry)){
  backGround.velocityX = 0;
  harry.visible = false;
}
}*/

if(EnemiesGroup.isTouching(harry)){
  gameState = END;
  EnemiesGroup.destroyEach();
  GemsGroup.destroyEach();
  backGround.velocityX = 0;
  harry.visible = false;
  gameOver.visible = true;
}


  drawSprites();
  fill ("black");
  textSize (20);
  text("Score : "+ count, 500,50);
  text("GemCount :"+ gCount, 500,80)
}

function changePosition(x,y){
  harry.y = harry.y + y;
}

function Enemies() {
  if(frameCount % 75 === 0) {
    var enemy = createSprite(600,random(180,450),10,40);
    enemy.velocityX = -8;
    
    //generate random enemies
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: enemy.addImage(enemy5);
              break;
      case 2: enemy.addImage(enemy2);
              break;
      case 3: enemy.addImage(enemy4);
              break;
      case 4: enemy.addImage(enemy1);
              break;
      case 5 : enemy.addImage(enemy3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the enemy           
    enemy.scale = 0.65;
    enemy.lifetime = 200;
    enemy.setCollider("circle",0,0,100)
    enemy.debug = true;
    //add each obstacle to the group
    EnemiesGroup.add(enemy);
  }
}

function Gems() {
  if(frameCount % 150 === 0) {
    var gem = createSprite(400,random(200,500),10,40);
    gem.velocityX = -8;
    
    //generate random enemies
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: gem.addImage(gem1);
              break;
      case 2: gem.addImage(gem2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the enemy           
    gem.scale = 0.3;
    gem.lifetime = 200;
    gem.setCollider("circle",0,0,120)
    gem.debug = true;
    //add each obstacle to the group
    GemsGroup.add(gem);
  }
  if(GemsGroup.isTouching(harry)){
    count = count + 1;
    gCount = gCount + 1;
    console.log(score);
  }
}