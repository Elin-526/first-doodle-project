var canvas;
var ctx;
var w = 1550;
var h = 1100;
var allRect = [];

var o1 = {
    "x" : w/2,
    "y" : h/2,
    "w" : 100,
    "h" : 70,
    "d" : 3,
    "angle" : 0,
    "changle" : 15
}

document.onkeydown = spacebar;
document.querySelector("#myCanvas").onclick = click;   
// document.querySelector("#myCanvas").onmousemove = move;
document.onkeydown = moveShape;

setUpCanvas();
animationLoop();


function animationLoop(){
    clear();

    /// 순서는 rect > Forward > turn > bounce
    for(var i=0; i<allRect.length; i++){
        
        rect(allRect[i]);
        forward(allRect[i]); 
        // turn(allRect[i],randn(10));
        bounce(allRect[i])
    }

    requestAnimationFrame(animationLoop);
}


//up, down 8 3: 24
function moveShape(event){
    if(allRect.length != 0){// 에러 안생김. 

        if(event.keyCode == 38){
            allRect[0].d++
            // allRect[0].angle = -90; // angle을 정해줌.
            // forward(allRect[0], 5);        
        // up 38 
        };

        if(event.keyCode == 40){
            allRect[0].d--;
        // down 40
        // allRect[0].angle = 90; 
        // forward(allRect[0], 5);
        };

        if(event.keyCode == 37){
        // left 37// negative
            // allRect[0].angle = 180; 
            // forward(allRect[0], 5);
            turn(allRect[0], -15);
        }

        if(event.keyCode == 39){
            // right 39 // positive
            // allRect[0].angle = 0; 
            // forward(allRect[0], 5);
            turn(allRect[0], 15);
        }
    }
    console.log("moveShape", event.keyCode);

}


function move(event){

    for(var i = 0; i <allRect.length; i++){
        allRect[i].w = 10+event.offsetX/6;
        allRect[i].h = 10+event.offsetY/6;
    }

    // addObjectWithLocation(allRect,event.offsetX, event.offsetY);///test
    console.log(event.offsetX, event.offsetY);
}



function click(event){
    addObjectWithLocation(allRect,event.offsetX, event.offsetY);
    // console.log(event.offsetX, event.offsetY);
}



// keycode 
function spacebar(event){
    if(event.keyCode == 32){
    // allRect.push({});
    addObject(allRect);
    // console.log(allRect);
    } 

}

function addObjectWithLocation(a,x,y){
    a.push({
        "x" : x,
        "y" : y,
        "w" : 100,
        "h" : 70,
        "d" : rand(3),
        "angle" : rand(360),
        "changle" : 15

    })
}
function addObject(a){
    a.push({
        "x" : w/2,
        "y" : h/2,
        "w" : 100,
        "h" : 70,
        "d" : rand(3),
        "angle" : rand(360),
        "changle" : 15
    });
    
}
function bounce(o){
    if(o.x > w || o.x < 0){
        turn(o,180);
    };
    if(o.y > h || o.y < 0){
        turn(o,180);
    }
}
function clear(){
    ctx.clearRect(0,0,w,h);
}
function rect(o){
    // var ob = o;   
    var x = o.x;
    var y = o.y;
    var a = o.angle;
    var d = o.d;


    turn(o, 180);
    forward(o,o.w/2);
    turn(o,90);
    forward(o, o.h/2);
    turn(o,90);

    ctx.beginPath();

    ctx.moveTo(o.x, o.y);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);

    turn(o, 90);
    forward(o, o.h);
    ctx.lineTo(o.x, o.y);

    turn(o, 90);
    forward(o, o.w);
    ctx.lineTo(o.x, o.y);

    turn(o, 90);
    forward(o, o.h);
    ctx.lineTo(o.x, o.y);

    ctx.fill();

    o.x = x;
    o.y = y;
    o.angle = a;
    o.d = d; 

}

function turn(o,angle){
    if(angle != undefined){
        o.changle = angle;
    };
    o.angle += o.changle;
}

function forward(o,d){

    var changeX ;
    var changeY;                      
    var oneDegree = Math.PI/180;    

    if(d != undefined){   
        o.d = d;
    };

    changeX = o.d*Math.cos(o.angle*oneDegree);
    changeY = o.d*Math.sin(o.angle*oneDegree);
    o.x += changeX;
    o.y += changeY;

}

function randn(r){
    var result = Math.random()*r - r/2;
    return result

}
function randi(r){
    var result = Math.floor(Math.random()*r);
    return result
}
function rand(r){
    var result = Math.random()*r;
    return result
}
function setUpCanvas(){
    canvas = document.querySelector("#myCanvas")
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "1px solid black";
}










