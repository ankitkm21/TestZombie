const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine,world;
var ground,leftWall,rightWall;
var bridge;
var jointPoint,jointLink;
var stoneArr = [];
var zombie,zombie1,zombie2,zombie3,zombie4;
var backgroundImg;
var breakButton,axe;

function preload(){
  backgroundImg = loadImage("./assets/background.png");
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  axe = loadImage("./assets/axe.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(width/2,height-15,width,30,"white");
  leftWall = new Base(100,height/2-300,200,height/2,"brown");
  rightWall = new Base(width-100,height/2-300,200,height/2,"brown");
  
  bridge = new Bridge(23 ,{x : 50 , y : height/2-80});
  jointPoint = new Base(width-150, height/2-80, 40,20);

  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link(bridge,jointPoint);

  
  for (var i =0; i <= 8; i++){
    var x = random(width / 2-200,width / 2 + 300);
    var y = random(-100,100);
    var stone = new Stone(x,y,80,80);
    stoneArr.push(stone);
  }

  zombie = createSprite(width/2, height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocityX=10;

  breakButton = createButton("");
  breakButton.position(width - 120, height / 2);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  bridge.display();

  for(var stone of stoneArr){
    stone.display();
  }

  if(zombie.position.x >= width -300){
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if(zombie.position.x <= 300){
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }
  drawSprites();
}

function handleButtonPress() {
  console.log("button pressed");
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
