function testPlayerCollisions() {

    //BLOCK COLLISIONS
    for (b = 0; b < blocks.length; b++) {

        if (collision(player, blocks[b])) {
            player.currentBlock = blocks[b];
            player.currentBlock.color = 'green';
        }

    }

    if (topCollision(player, player.currentBlock)) {

        player.y = player.currentBlock.y - player.h;
        player.onGround = true;

    } else {

        player.onGround = false;

    }

    if (blocks.some(block => sideCollision(player, block))) {
        player.x = player.currentBlock.x - player.w;
        player.dead = true;
    }

    player.nojump = blocks.some(block => player.y > block.y && player.x+player.w >= block.x && player.x <= block.x+block.w); // Disable jumping if there is a block directly above the player

    //SPIKE COLLISIONS
    if(!player.dead) player.dead = spikes.some(spike => topCollision(player, spike))
    if (spikes.some(spike => sideCollision(player, spike))) {
        player.x = player.currentBlock.x - player.w;
        player.dead = true;
    }
    //BOUNCE PAD COLLISIONS
    
    for (bo = 0; bo < bounces.length; bo++) {

        if (collision(player, bounces[bo])) {
            player.currentBounce = bounces[bo];
        }

    }

    if (topCollision(player, player.currentBounce)) {

        player.y = player.currentBounce.y - player.h;
        player.yv = -player.yv * player.bounceMultiplier;

    } else if(bottomCollision(player, player.currentBounce)){

        player.y = player.currentBounce.y + player.currentBounce.h;
        player.yv = -player.yv * player.bounceMultiplier;

    }

    if (bounces.some(bounce => sideCollision(player, bounce))) {
        player.x = player.currentBounce.x - player.w;
        player.dead = true;
    }
}