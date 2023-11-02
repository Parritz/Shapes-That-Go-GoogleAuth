function explode(size,obj,g){
    for(p=0;p<size;p++){
        var xv = Math.floor(Math.random() * (20 - -20 + 1)) + -20;
        var yv = Math.floor(Math.random() * (-10 - -40 + 1)) + -40;
        particles.push(new Particle(obj.x+obj.w/2, obj.y+obj.h/2, obj.w/5, obj.h/5, obj.color, xv, yv, g));
    }
}