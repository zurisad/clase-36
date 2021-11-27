var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;

//crea aquí las variables feed y lastFed 


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Alimenta al perro");
  feed.position(600,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

//escribe el código para leer el valor de tiempo de alimentación de la base de datos
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill("red");
  textSize(15);
  if(lastFed >= 12){
    text("Ultima hora en la que se alimento : PM"+ lastFed%12,350,60);
  }
  else if(lastFed == 0){
    text("Ultima hora en la que se alimento : 12 AM",350,60);
  }
  else{
    text("Ultima hora en la que se alimento : AM "+ lastFed%12,350,60);
  }
 
  //escribe el código para mostrar el texto lastFed time aquí

 
  drawSprites();
}

//función para leer la Existencia de alimento 
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro xx
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0);
  }
  else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  database.ref('/').update({
    Food: food_stock_val,
    getFedTime:hour()
  })
}

//función para agregar alimento al almacén xxx
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
