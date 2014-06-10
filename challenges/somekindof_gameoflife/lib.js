// just a small collection of functions I might need

var canvas;
var cx;
var length;
var height;

function initCanvas(name) {
    canvas = document.getElementById(name);
    if (canvas.getContext) {
        cx = canvas.getContext("2d");
    }
}

// grid x
// grid y
function drawCubeRGB(x, y, r, g, b){
	cx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    cx.fillRect (x * 5, y * 5, 5, 5);
}

function drawCube(_x, _y){
	drawCubeRGB(_x, _y, 0, 0, 0);
}

// x = grid length
// y = grid height
function drawField(x, y){
	cx.fillStyle = "rgb(255, 255, 255)";
    cx.fillRect (0, 0, x * 5, y * 5);
	length = x;
	height = y;
}

function animate(){
	var start = null;
	
	var d = document.getElementById("t");
	var temp = 0;

	function step(timestamp) {
		var progress;
		if (start === null) start = timestamp;
		progress = timestamp - start;
		if(progress > temp + 150){
			calculate();
			temp = progress;
			$("#t").text(progress);
		}
		if (progress < 10000) {
			requestAnimationFrame(step);
		}
	}
	
	requestAnimationFrame(step);	
}


var on_x = new Array();
var on_y = new Array();

var on = [
	[4, 5],
	[3, 4],
	[2, 4],
	[7, 8],
	[8, 8],
	[8, 9],
	[20, 15],
	[20, 16],
	[20, 17],
	[21, 17],
	[22, 16]
]

function calculate(){
	for(var i = 0; i < on.length; i++){
		drawCube(on[i][0], on[i][1]);
	}


	for(var i = 0; i < length; i++){
		for(var j = 0; j < height; j++){
			//log(" " + i + " " + j);
			var c = checkNeighbors(i, j);
			//log(c);
			if(c < 2){
				if(isOn(i, j)){
					turnOff(i, j);	
				}
			}else if(c == 3){
				if(!isOn(i, j)){
					turnOn(i, j);	
				}
			}else if ( c > 3){
				if(isOn(i, j)){
					turnOff(i, j);	
				}
			}
		}
	}

}

function turnOff(x, y){
	//log(x + " " + y + "  " + _indexOf([x, y]));
	on.splice(_indexOf2(x, y), 1);
	drawCubeRGB(x, y, 255, 255, 255);
}

function turnOn(x, y){
	//log(x + " " + y + "  " + _indexOf([x, y]));
	on.push([x, y]);
}

function isOn(x, y){
	return (_indexOf2(x, y) > -1);
}

function checkNeighbors(x, y){
	var count = 0;
	for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
			var ttx = x + i;
			var tty = y + j;
        	if(isOn(ttx, tty)){
				if(ttx < 0 || tty < 0){
					continue;	
				}
				//log(ttx + " " + tty + "  " + _indexOf([ttx, tty]));
				count++;
			}
   		}
    }
	return count;
}

function _indexOf(o) {    
    for (var i = 0; i < on.length; i++) {
        if (on[i].x == o.x && on[i].y == o.y) {
            return i;
        }
    }
    return -1;
}

function _indexOf2(x, y) {    
    for (var i = 0; i < on.length; i++) {
        if (on[i][0] == x && on[i][1] == y) {
            return i;
        }
    }
    return -1;
}

function log(msg){
	$("#log").html($("#log").html() + msg + "<br>");
}
