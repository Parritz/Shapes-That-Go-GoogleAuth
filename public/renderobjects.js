function renderObjects(){

    for(b=0;b<blocks.length;b++){
        blocks[b].draw();
        blocks[b].scroll();

    }

}