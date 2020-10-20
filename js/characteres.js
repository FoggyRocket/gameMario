const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Vairables 
let frames = 0;
const marioImages = {
    first: 'https://bit.ly/2L7yH3f',
    second:'https://bit.ly/2L3ikoe'
}
let requestId;
let enemies=[];


class Hero{
    constructor(x,y,width,height,imgs){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.image1= new Image();
        this.image1.src=imgs.first;
        this.image2 = new Image();
        this.image2.src = imgs.second;
        this.image= this.image1
    }
    draw(){
        if(frames % 10 === 0){
            this.image = this.image === this.image1 ? this.image2 : this.image1;
        }
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    collision(enemy){
        return (this.x < enemy.x + enemy.width &&
                this.x + this.width > enemy.x &&
                this.y < enemy.y+ enemy.height &&
                this.y + this.height > enemy.y
                )
    }
}

class Background{
    constructor(x,y,width,height,img){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height = height;
        this.image = new Image();
        this.image.src = img
    }
    draw(){
        this.x -= 2;
        //en caso de alcanzar el fina de la imagen resetamos el valor de x a 0
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        //dibujamos una segunda imagen al fianl de la primera
        ctx.drawImage(this.image,this.x + this.width,this.y, this.width,this.height)
    }
}

class Enemy extends Background{
    
    draw(){
        this.x -= 2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}