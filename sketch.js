var bg,bgImg;
var player, shooterImg, shooter_shooting;
var ghostGroup, ghost, ghostImg;
var bullet,bulletImg,bulletGroup;
var gameState = "play";
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img;
var bullets = 100;
var score = 0;
var life = 3;
var explosion,win,lose;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bulletImg = loadImage("assets/projectile.png");
   bgImg = loadImage("assets/background1.png");
  ghostImg = loadImage("assets/Ghost.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
  explosion = loadSound("assets/explosion.mp3");
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
}

function setup() {
ghostGroup = new Group();
  bulletGroup = new Group();

  createCanvas(windowWidth,windowHeight);

 

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

heart1 = createSprite(displayWidth-150,40,20,20);
heart1.visible = false;
heart1.addImage("heart1", heart1Img);
heart1.scale = 0.5

heart2 = createSprite(displayWidth-150,40,20,20);
heart2.visible = false;
heart2.addImage("heart2", heart2Img);
heart2.scale = 0.5

heart3 = createSprite(displayWidth-180,40,20,20);
heart3.visible = true;
heart3.addImage("heart3", heart3Img);
heart3.scale = 0.5

//creating the player sprite
player = createSprite(displayWidth-1350, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300);


}

function draw() {

  background(0); 
  if(gameState==="play"){
  if(life==3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }
  if(life==2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = false;
  }
  if(life==1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  spawnGhosts();
  }
  if(life==0){
    gameState = "lost";
  }
if(score==100){
  gameState = "won";
  win.play();
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(bullets==0){
  gameState = "noBullets";
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")&& gameState==="play"){

 var bullet = createSprite(displayWidth-1350, player.y-30,20,10);
 bulletGroup.add(bullet);
  bullet.scale = 0.2;
  bullet.addImage("projectile", bulletImg);
  player.addImage(shooter_shooting);
  bullet.velocityX = 20;
 bullet.depth = player.depth;
 player.depth = player.depth+1;
 if(bullets>0){
 bullets = bullets-1;
 
 }
 explosion.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(ghostGroup.isTouching(bulletGroup)){
  for(var i=0; i<ghostGroup.length; i++){
if(ghostGroup[i].isTouching(bulletGroup)){
  ghostGroup[i].destroy();
  bulletGroup.destroyEach();
  score = score +50;
  explosion.play();
}
  }
}
if(ghostGroup.isTouching(player)){
  for(var i=0; i<ghostGroup.length; i++){
if(ghostGroup[i].isTouching(player)){
  ghostGroup.destroyEach();
life = life-1
lose.play();
}
  }
}
drawSprites();
textSize(20);
fill("white");
text("Score: "+score,displayWidth-230,displayHeight/2-210);
text("Life: "+life,displayWidth-230,displayHeight/2-240);
text("Bullets: "+bullets,displayWidth-230,displayHeight/2-270);
if(gameState==="lost"){
  textSize(100);
  fill("red");
  text("You Lost", 400,400);
  ghostGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();
}
else if(gameState==="won"){
  textSize(100);
  fill("green");
  text("You Won", 400,400);
  ghostGroup.destroyEach();
  player.destroy();
  win.stop();
  bulletGroup.destroyEach();
}
else if(gameState==="noBullets"){
  textSize(100);
  fill("yellow");
  text("You ran out of Bullets", 100,400);
  ghostGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}
}
function spawnGhosts(){
 if(frameCount%60===0){
  ghost = createSprite(random(500,1500),random(100,500), 40,40);
  ghost.addImage("ghost",ghostImg);
  ghost.velocityX = -3;
  ghost.lifetime = 500
  ghost.scale = 0.3
  ghostGroup.add(ghost);
  ghost.debug = false;
  ghost.setCollider("rectangle",0,0,250,360);
 }
}
