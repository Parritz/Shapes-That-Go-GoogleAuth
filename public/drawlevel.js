function drawLevel(chunk, x){

    let lvlX = x;
    let lvlY = 0;
    let currentLvl =  chunk;

    let shieldChance = 40;
    let doubleJumpChance = 60;

    for(i=0;i<currentLvl.length;i++){

        for(j=0;j<currentLvl[i].length;j++){
    
            if(currentLvl[i][j] == 1){
    
                blocks.push(new Block(lvlX, lvlY, blockSize, blockSize, 'blue'))
    
            } else if(currentLvl[i][j] == 2){
    
                blocks.push(new Spike(lvlX,lvlY,blockSize-(blockSize/3), blockSize, 'orange', 1));
    
            } else if(currentLvl[i][j] == 3){

                blocks.push(new Spike(lvlX,lvlY,blockSize-(blockSize/3), blockSize, 'orange', -1))

            } else if(currentLvl[i][j] == 4){

                blocks.push(new Bounce(lvlX, lvlY, blockSize, blockSize, 'red'));

            } else if(currentLvl[i][j] == 5 /*&& Math.random()*100 < doubleJumpChance*/){

                powerups.push(new Powerup(lvlX, lvlY, blockSize/1.1, blockSize/1.1, "doublejump", "Double Jump"));
            
            } else if(currentLvl[i][j] == 6 /*&& Math.random()*100 < shieldChance*/){
                
                powerups.push(new Powerup(lvlX, lvlY, blockSize/1.1, blockSize/1.1, "shield", "Shield"));
            
            } else if(currentLvl[i][j] == 7){
                
                pogs.push(new Pog(lvlX, lvlY, blockSize/1.1, blockSize/1.1));
            
            }
    
            lvlX+=blockSize;
    
        }
    
        lvlY+=blockSize;
        lvlX = 0;
    
    }

}