
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
	drawCubeRGB(_x, _y, 255, 255, 255);
}

// x = grid length
// y = grid height
function drawField(x, y){
	cx.fillStyle = "rgb(0, 0, 0)";
    cx.fillRect (0, 0, x * 5, y * 5);
	length = x;
	height = y;
}

function animate(){
	return;
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


var visited = [];
var doublevisited = [];

function calculate(){
	/*for(var i = 0; i < on.length; i++){
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
	}*/

}

function turnOff(x, y){
	//log(x + " " + y + "  " + _indexOf([x, y]));
	visited.splice(_indexOf(x, y), 1);
	drawCubeRGB(x, y, 255, 255, 255);
}

function setVisited(x, y){
	//log(x + " " + y + "  " + _indexOf([x, y]));
	visited.push([x, y]);
}

function setDoubleVisited(x, y){
	//log(x + " " + y + "  " + _indexOf([x, y]));
	visited.push([x, y]);
}

function isVisited(x, y){
	return (_indexOf(x, y) > -1);
}

function isDoubleVisited(x, y){
	return (_indexOf(x, y) > -1);
}

var exit = [];
var start;

function generateMaze(){
	exit = [length - 2, Math.round(Math.random() * (height - 1))];
	setVisited(exit[0], exit[1]);
	
	visitNext(exit[0], exit[1]);
}

function visitNext(x, y){
	
	drawCube(x, y);
	setVisited(x, y);
	
	var r = Math.random() * 4
	if(r < 1){
		tryVisit(x, y, x + 1, y, true, false, false, false);
	}else if(r > 1 && r < 2){
		tryVisit(x, y, x - 1, y, false, true, false, false);
	}else if(r > 2 && r < 3){
		tryVisit(x, y, x, y + 1, false, false, true, false);
	}else if(r > 3){
		tryVisit(x, y, x, y - 1, false, false, false, true);
	}else{
		tryVisit(x, y, x, y - 1, false, false, false, true);
	}

}

// tries to visit [x, y], tries to visit ALL if fails
function tryVisit(origx, origy, x, y, xplus, xminus, yplus, yminus){
	if(x > length - 3 || y > height - 3){
		goback(x, y);	
	}
	if(!isVisited(x, y)){
		if(xplus){
			if(!isVisited(x + 1, y) && !isVisited(x, y + 1) && !isVisited(x, y - 1)){
				visitNext(x, y);
			}else{
				tryVisitAll(origx, origy);
			}
		}else if(xminus){
			if(!isVisited(x - 1, y) && !isVisited(x, y + 1) && !isVisited(x, y - 1)){
				visitNext(x, y);
			}else{
				tryVisitAll(origx, origy);
			}
		}else if(yplus){
			if(!isVisited(x, y + 1) && !isVisited(x + 1, y) && !isVisited(x - 1, y)){
				visitNext(x, y);
			}else{
				tryVisitAll(origx, origy);
			}
		}else if(yminus){
			if(!isVisited(x, y - 1) && !isVisited(x + 1, y) && !isVisited(x - 1, y)){
				visitNext(x, y);
			}else{
				tryVisitAll(origx, origy);
			}
		}
	}else{
		tryVisitAll(origx, origy);
	}
}

// tries to visit all at a given (visited) position
function tryVisitAll(x, y){
	if(!isVisited(x + 1, y) && !isVisited(x + 2, y) && !isVisited(x + 1, y + 1) && !isVisited(x + 1, y - 1)){
		visitNext(x + 1, y);
	}else if(!isVisited(x, y + 1) && !isVisited(x, y + 2) && !isVisited(x + 1, y + 1) && !isVisited(x - 1, y + 1)){
		visitNext(x, y + 1);
	}else if(!isVisited(x - 1, y) && !isVisited(x - 2, y) && !isVisited(x - 1, y + 1) && !isVisited(x - 1, y - 1)){
		visitNext(x - 1, y);
	}else if(!isVisited(x, y - 1) && !isVisited(x, y - 2) && !isVisited(x + 1, y - 1) && !isVisited(x - 1, y - 1)){
		visitNext(x, y - 1);
	}
	goback(x, y);
}

function goback(x, y){
	if(x > length - 1 || y > height - 1){
		goback(x, y);	
	}
	setDoubleVisited(x, y);
	if(isVisited(x - 1, y) && !isDoubleVisited(x - 1, y)){
		tryVisitAll(x - 1, y);
	}else if(isVisited(x + 1, y) && !isDoubleVisited(x + 1, y)){
		tryVisitAll(x + 1, y);
	}else if(isVisited(x, y + 1) && !isDoubleVisited(x, y + 1)){
		tryVisitAll(x, y + 1);
	}else if(isVisited(x, y - 1) && !isDoubleVisited(x, y - 1)){
		tryVisitAll(x, y - 1);
	}
}

function _indexOf(x, y) {    
    for (var i = 0; i < visited.length; i++) {
        if (visited[i][0] == x && visited[i][1] == y) {
            return i;
        }
    }
    return -1;
}

function log(msg){
	$("#log").html($("#log").html() + msg + "<br>");
}
