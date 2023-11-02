function DrawObjects(scrollSpd){

    for(b=0;b<blocks.length;b++){
        blocks[b].draw();
        if(!player.dead) blocks[b].scroll(scrollSpd);
        if(blocks[b].x <= -stage.canvas.width*2) blocks.splice(b, 1);

    }

    for(p=0;p<particles.length;p++){
        particles[p].draw();
        particles[p].physics();
        if(particles[p].y >= stage.canvas.height){
            particles.splice(p, 1);
        }
    }

    for(p=0;p<powerups.length;p++){
        if(!powerups[p].collected){
            powerups[p].draw();
        } else {
            powerups[p].update();
        }
        if(!player.dead) powerups[p].scroll(scrollSpd);
    }

    for(p=0;p<pogs.length;p++){
        pogs[p].draw();
        if(!player.dead) pogs[p].scroll(scrollSpd);
    }

}