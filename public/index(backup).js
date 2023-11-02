var stage = document.getElementById('canvas').getContext('2d');
stage.canvas.width = window.innerWidth;
stage.canvas.height = window.innerHeight;

const globalGravity = 0.2;
const globalScrollSpd = 6;

const blockSize = Math.round(stage.canvas.height/lvl1.length);

var testthing = 100;

var player = new Player(stage.canvas.width/4,0,blockSize,blockSize,'red',globalGravity);

var blocks = [];
var spikes = [];

var explosions = [];

var lvlX = 0;
var lvlY = 0;

var currentLvl = lvl1;

var deathScreen = document.getElementById('death_screen');
var retryBtn = document.getElementById('death_button');

for(i=0;i<currentLvl.length;i++){

    for(j=0;j<currentLvl[i].length;j++){

        if(currentLvl[i][j] == 1){

            blocks.push(new Block(lvlX, lvlY, blockSize, blockSize, 'blue', globalScrollSpd))

        } else if(currentLvl[i][j] == 2){

            spikes.push(new Spike(lvlX,lvlY,blockSize-(blockSize/3), blockSize, 'orange', globalScrollSpd));

        }

        lvlX+=blockSize;

    }

    lvlY+=blockSize;
    lvlX = 0;

}

player.currentBlock = blocks[0];

function update(){
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    stage.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.fillText("boks: "+blocks.length+"   spiks: "+spikes.length, 100, 100);
    for(b=0;b<blocks.length;b++){
        if(blocks[b].x > -100 && blocks[b].x < stage.canvas.width+100){
            blocks[b].draw();
        }
        //player.currentBlock = blocks[b] * (collision(player, blocks[b]));
        blocks[b].scroll();

        if(collision(player, blocks[b]) && blocks[b].x > -100 && blocks[b].x <= stage.canvas.width+100){

               
            player.currentBlock = blocks[b];
            blocks[b].color = '#00ff26';

            if(player.y+player.h >= player.currentBlock.y && player.y <= player.currentBlock.y+player.currentBlock.h/2 && player.x >= player.currentBlock.x){
                player.y = player.currentBlock.y-player.currentBlock.h;
            }

            player.nojump = blocks[b].y <= player.y;

            if(player.x+player.w >= player.currentBlock.x && player.y == player.currentBlock.y){

                player.x = player.currentBlock.x - player.currentBlock.w;
                player.dead = true;

            }


        }

    }

    for(s=0;s<spikes.length;s++){
        if(spikes[s].x >= -100 && spikes[s].x <= stage.canvas.width+100){
            spikes[s].draw();
        }

        spikes[s].scroll();

        if(collision(player, spikes[s]) && spikes[s].x >= -100 && spikes[s].x <= stage.canvas.width+100){

            player.dead = true;

        }

    }

    player.draw();
    player.physics();

    player.onGround = (collision(player, player.currentBlock));
    player.jumping = !player.onGround;

    if(player.onGround){

        player.jumps = 0;

    }

    if(player.y >= stage.canvas.height){player.dead = true;}

    if(player.dead){deathScreen.style.visibility = "visible";}

}

document.addEventListener('keydown', function(event){

    if(event.key == ' ' && (player.onGround || player.jumping && player.doublejump) && !player.dead && !player.nojump && player.jumps <= 1){
        player.onGround = false;
        player.jumping = true;
        player.yv = -player.jumpheight;
        player.jumps++;
    }

    if(event.key == ' ' && player.dead){

        retryBtn.click();

    }

})

document.addEventListener('keyup', function(event){

})

var gameloop = setInterval(update, 0);