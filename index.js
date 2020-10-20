const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Solo para saber como pintar una imagen dentro del canvas!!!

// const image = new Image()
// image.src = "https://bit.ly/2L7yH3f";

// image.onload = () => {
//     ctx.drawImage(image,100,100,100,120);
// }
//Primero lo que necesitamos 
const mariosImages = {
    first: "https://bit.ly/2L7yH3f",
    second: "https://bit.ly/2L3ikoe"
  };
let frames = 0;
let requestId ;
let enemies = [];
//clases para mi juego
class Character {
    constructor(x,y,width,height,imgs){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.image1 = new Image();
        this.image2 = new Image();
       
        this.image1.src = imgs.first;
        this.image2.src = imgs.second;
        this.image= this.image1
    }
    collition(enemy){
        return(
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x  &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y 
        )
    }
    draw(){
        //con esto hacemos que nuestro mario cobre vida y se vea la animacion alternando entre una imagen y la otra
        if(frames % 10 === 0) {
            this.image = this.image === this.image1 ? this.image2 : this.image1
        }
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Background{
    constructor(x,y,width,height,img){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src= img
    }
    draw(){
        this.x -= 2
        //en caso de alcanzar el final de la image resetamos a x
        if(this.x < -canvas.width)this.x= 0 
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

        // dibujamos una segunda imagen  al final de la primera
        ctx.drawImage(this.image,this.x + canvas.width,this.y,this.width,this.height)
    }
}

class Enemy{
    constructor(){
        this.x = canvas.width;
        this.y = 0;
        this.width = 70;
        this.height = 100;
        this.image = new Image();
        this.image.src= "https://bit.ly/2BAISL4"
    }
    draw(){
        this.y += 2

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Scott{
    constructor(x=0, y=0, spriteSheet, coinCount) {
        this.x = x;
        this.y = y;
        this.count = 0;
        this.spriteSheet = new Image();
        this.spriteSheet.src = spriteSheet;
        this.coinWidth = Math.floor(this.spriteSheet.width / coinCount);
        this.coinHeight = this.spriteSheet.height;
      }
      
      update(dt) {
        if (this.count === 9) {
          this.count = 0;
        } else {
          this.count++;
        }
        this.x = this.count * this.coinWidth;
        this.y = this.coinHeight;
      }
      
      render(context, tFrame) {
        ctx.drawImage(this.spriteSheet, this.x, 0, this.coinWidth, this.coinHeight, 0, 0, this.coinWidth, this.coinHeight);
      }
}
//para nuestro variables


const background = new Background(0,0,canvas.width,canvas.height,"https://bit.ly/2TQwFIY");
const mario = new Character(100,580,100,120,mariosImages)
const scott = new Scott(0, 100, "./assets/scott.png", 10);
//esto es solo de ejemplo para un enemigo
//const enemy = new Enemy()


// en este se dibuja!! todo
updateGame=()=>{
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.draw()
    mario.draw()
    generateEnemies()
    drawEnemies()
    scott.render()
    scott.update()
    
    //esto igual es ejemplo
    //enemy.draw()
    // if(mario.collition(enemy)){
    //     console.log("ya perdiste morra")
    //     gameOver()
    // }

    if(!requestId){ 
        gameOver()
    }else{
        requestId =  requestAnimationFrame(updateGame)
    }
}
//para inicializar el juego
startGame = () => {
    requestId = requestAnimationFrame(updateGame)
}

gameOver=()=>{
    requestId = undefined;
    ctx.fillText("Game Over", 200, 200);
}

//Generar Muchos enemigos!!!!

generateEnemies =()=> {
    if(frames % 100 == 0 || frames % 80 == 0 ){
        let enemy = new Enemy();
        // enemies.push(enemy)
        enemies = [...enemies,enemy] //spreat operator 
    }

}

drawEnemies=()=>{
    enemies.forEach((enemy)=>{
        enemy.draw()
        if(mario.collition(enemy)) gameOver()
    })
}
//termina seccion enemigos


addEventListener("keydown",(event)=>{
    if(event.keyCode === 39) mario.x += 50
    if(event.keyCode === 37) {
        if(mario.x - mario.width  > canvas.width){ 
            console.log("oasodasod",)
            mario.x = 0
            return false
        }
        mario.x -= 50
    }
    if(event.keyCode === 32) mario.y -= 50
    if(event.keyCode === 13) startGame()
})