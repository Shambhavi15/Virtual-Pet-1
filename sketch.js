var database;
var dog,dogImage,dogImage1,foodStock,foodRef;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(480, 480);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodRef = database.ref("Food");
  foodRef.on("value",read);

  foodRef.set(20);
}


function draw() {  
  background(46, 139, 87);
  drawSprites();

  textSize(20);
  fill(255);
  text("Note: Feed the dog by pressing up arrow key",30,30);
  text("Food in the Stock: "+ foodStock,150,100);

  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }
}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = database.ref('Food');
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImg2);
  }
  
  if(keyWentUp(UP_ARROW)){
    foodStock = foodStock;
    dog.addImage(dogImg);
  }
}