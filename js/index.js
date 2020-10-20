const mario = new Hero(100,610,70,90,marioImages)
const background  = new Background(0,0,canvas.width,canvas.height,"https://bit.ly/2TQwFIY")
//temporal
//const enemy = new Enemy(700,610,70,90,"https://bit.ly/2BAISL4") 
//requiero que siempre se este actualizando
updateGame=()=>{
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    background.draw();
    mario.draw();
   
    //este if es tempral
    // enemy.draw()
    // if(mario.collision(enemy)){
    //     return gameOver()
    // }
    //
    generateEnemies();
    drawEnemies();
    if(!requestId){ 
        return gameOver()
    }
    requestId = requestAnimationFrame(updateGame)
}

startGame=()=>{
    requestId = requestAnimationFrame(updateGame)
}

gameOver=()=>{
   
    requestId=undefined;
    ctx.fillText("Perdiste Morro",100,200)
}

generateEnemies=()=>{
    const enemy = new Enemy(900,610,70,90,"https://bit.ly/2BAISL4") 
    if(frames % 100 === 0 ) enemies = [...enemies,enemy]
    //enemies.push(enemy)
}

drawEnemies=()=>{
    enemies.forEach((enemy)=>{
       enemy.draw() 
       if(mario.collision(enemy)){
         gameOver()
        }
    });
}

startGame()