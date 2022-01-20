var slime, slimeImage, slimeImage1, slimeImage2, slimeImage2_5;
var ground;
var background, backgroundImage;
var vasosdeflor, vasosdeflorImage;
var cenario1, cenario1Image, cenario2, cenario2Image;
var slimeMãe, slimeMãeImage;
var coluna1, coluna2, colunaImage;
var chãoinvisivel;
var coluna3;
var gamestate = PLAY;
var PLAY = 1;
var END = 0;
var gameover, gameoverImage;
var fireballgroup, fireball, fireballImage;

function preload() {
  //slime parado
  slimeImage = loadImage("slime alfredo1.png");

  //slime dando o joinha.
  slimeImage1 = loadAnimation("slime alfredo1.png","slime alfredo2.png","slime alfredo3.png","slime alfredo4.png","slime alfredo5.png","slime alfredo6.png","slime alfredo7.png","slime alfredo8.png");

  //slime andando >.
  slimeImage2 = loadAnimation("slimealfredoandando1.png","slimealfredoandando2.png","slimealfredoandando3.png","slimealfredoandando4.png","slimealfredoandando5.png","slimealfredoandando6.png","slimealfredoandando7.png","slimealfredoandando8.png","slimealfredoandando9.png","slimealfredoandando10.png","slimealfredoandando11.png","slimealfredoandando12.png","slimealfredoandando13.png",);

  //slime andando <.
  slimeImage2_5 = loadAnimation("slimelado1.png","slimelado2.png","slimelado3.png","slimelado4.png","slimelado5.png","slimelado6.png","slimelado7.png","slimelado8.png","slimelado9.png","slimelado10.png","slimelado11.png","slimelado12.png","slimelado13.png");

  //imagem do background
  backgroundImage = loadImage("cenario na agua.png");
  
  //vasos de flor
  vasosdeflorImage = loadImage("vason de girasol.png");

  //slime mãe.
  slimeMãeImage = loadImage("slime mãe.png");

  //cenario 1.
  cenario1Image = loadImage("1 cenario.png");

  //coluna
  colunaImage = loadImage("coluna.png");

  //cenario2
  cenario2Image = loadImage("cenario2.png");

  //game 
  gameoverImage = loadImage("gameover.png");

  //fireball.
  fireballImage = loadImage("fireball.png");

}

function setup() {
  createCanvas(1365,625);

  // cenario.
  cenario1 = createSprite(682, 312);
  cenario1.addImage("cenario", cenario1Image);
  cenario1.scale = 5.1;

  //cenario2.
  cenario2 = createSprite(900, 312);
  cenario2.addImage("cenario2", cenario2Image);
  cenario2.scale = 1.0;
  cenario2.visible = false;
 
  //coluna invisivel.
  coluna3 = createSprite(682, 312, 30, 1000);
  coluna3.scale = 1.0;
  coluna3.visible = false;
  
  //gameover.
  gameover = createSprite(682, 312);
  gameover.addImage("dead",gameoverImage);
  gameover.scale = 5.0;
  gameover.visible = false;

  // slime mãe.
  slimeMãe = createSprite(682, 144);
  slimeMãe.addImage("slime mãe", slimeMãeImage);
  slimeMãe.scale = 3.0;

  //colunas
  coluna1 = createSprite(25, 312);
  coluna1.addImage("coluna", colunaImage);
  coluna1.scale = 7.0;
  coluna2 = createSprite(1340, 312);
  coluna2.addImage("coluna", colunaImage);
  coluna2.scale = 7.0;
 
  //slime
  slime = createSprite(682, 144);
  slime.addImage("slime",slimeImage);
  slime.addAnimation("slime joinha", slimeImage1);
  slime.addAnimation("slime andando >", slimeImage2);
  slime.addAnimation("slime andando <", slimeImage2_5);
  slime.scale = 4.0;

  //chão invisivel
  chãoinvisivel = createSprite(682,600, 2000, 20);
  chãoinvisivel.visible = false;

  fireballgroup = new Group();
}

function draw() {
  

 if (gamestate === PLAY){

  if (keyDown("space")&& slime.y >= 400) {
    slime.velocityY = - 10;
  }
  cenario2.velocityX = -2;
  
  if (cenario2.x < 500) {

    cenario2.x = cenario2.width / 2;

  }
  //movendo para <.
  if(keyDown("A")|| keyDown("LEFT_ARROW")){
    slime.velocityX = -10;
    slime.changeAnimation("slime andando <", slimeImage2_5);
  }
  else {
    slime.changeAnimation("slime", slimeImage);
    slime.velocityX = 0;
  }

//movendo para >
if(keyDown("D")|| keyDown("RIGHT_ARROW")){
  slime.velocityX = 10;
  slime.changeAnimation("slime andando >", slimeImage2);
}

  //gravidade do slime.
  slime.velocityY = slime.velocityY + 0.5;

  //chamando a função 3;
  nextFase();
  //chamando a função 4;
  fireballcreate();
 }
 else if (gamestate === END) {
  cenario2.setvelocityXEach = 0;
    gameover.visible = true;
    slime.setvelocityXEach = 0;
    slime.setvelocityYEach = 0;
    fireballgroup.setvelocityXEach = 0;
 }

  //colisão com o chão.
  slime.collide(chãoinvisivel);

  //colisão com as colunas.
  slime.collide(coluna1);
  
  slime.depht = cenario1.depht;
  slime.depht = slime.depht +1;

  if (slime.isTouching(fireballgroup)){
    gamestate = END;
    
  }

 drawSprites();
}

function nextFase(){
  if(slime.isTouching(coluna2)){
    cenario1.visible = false;
    cenario2.visible = true;
    slimeMãe.visible = false;
    slime.x = 200;
    
  }
}
function fireballcreate(){
if (frameCount % 100 == 0) {
  fireball = createSprite(1365, 50);
  fireball.y = Math.round(random(50, 625));
  fireball.addImage("fireball", fireballImage);
  fireball.velocityX = -5;
  fireball.scale = 2.0;
  fireball.lifetime = 1900;
  fireballgroup.add(fireball);
 }
}