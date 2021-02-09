//Create variables here

var dog, happyDog, database, foodS, foodStock;
var d1img,d2img;
var bedroom, garden,washroom;
var gameState,readState;

function preload()
{
  //load images here
  d1img = loadImage("images/dogImg.png");
  d2img = loadImage("images/dogImg1.png");
  garden=loadImage("Images/Garden.png");
  washroom=loadImage("Images/Wash Room.png");
  bedroom=loadImage("Images/Bed Room.png");
}

function setup(){
  createCanvas(700,700);

  database = firebase.database();

  dog = createSprite(350,350,20,20);
  dog.addImage(d1img);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
}


function draw() {  
 background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d2img);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("red");
  stroke(3);
  text("Food remaing : " + foodS,250,100);
  textSize(20);
  text("press UP_ARROW key to feed the dog",200,650);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  });
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
