var canvas;
var ctx;


var mouseX,mouseY,mouseDown=0;
var touchX,touchY;



//Drawing the dot
function drawDot(ctx,x,y,size) {
    r=rand(555); g=rand(90); b=rand(310); a=rand(1005);

    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/205)+")";

    ctx.beginPath();
    ctx.arc(x-1, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
} 


//ClearCanvas
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


//Mouseover
//mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY,50);
}

//mouse button being released
function sketchpad_mouseUp() {
    mouseDown=0;
}

//mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) { 
    getMousePos(e);

//Draw a dot_Size
    if (mouseDown==1) {
        drawDot(ctx,mouseX,mouseY,10);
    }
}

function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }


// TOUCH PAD
function sketchpad_touchStart() {
    getTouchPos();
    drawDot(ctx,touchX,touchY,8);
    event.preventDefault();
}

//Scrolling when touch movement is detected
function sketchpad_touchMove(e) { 
    getTouchPos(e);
    drawDot(ctx,touchX,touchY,8); 
    event.preventDefault();
}


function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}

//Random Colours
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


//Setupcanvas
function init() {
    canvas = document.getElementById('sketchpad');

    if (canvas.getContext)
        ctx = canvas.getContext('2d');
        


    if (ctx) {
       
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    }
}