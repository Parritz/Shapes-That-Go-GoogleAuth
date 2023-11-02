class Explosion {

    constructor(x,y,w,h,c){

        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = y;
        this.x3 = x;
        this.y3 = y;
        this.x4 = x;
        this.y4 = y;
        this.w = w;
        this.h = h;
        this.color = c;

        this.spd = 5;

        this.counter = 0;
        this.expire = 20;

    }

    draw(){

        stage.fillStyle = this.color;
        stage.fillRect(this.x1, this.y1, this.w, this.h);
        stage.fillRect(this.x2, this.y2, this.w, this.h);
        stage.fillRect(this.x3, this.y3, this.w, this.h);
        stage.fillRect(this.x4, this.y4, this.w, this.h);
        stage.fillStyle = '#000000';

    }

    update(){
        if(this.counter <= this.expire){
            this.counter++;
            this.x1-=this.spd;
            this.y1-=this.spd;
            this.x2+=this.spd;
            this.y2+=this.spd;
            this.x3-=this.spd;
            this.y3+=this.spd;
            this.x4+=this.spd;
            this.y4+=this.spd;
        }
    }

}