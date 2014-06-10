<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>mkay</title>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="lib.js"></script>
<script type="application/javascript">
function start() {
	initCanvas("canvas");
	drawField(100, 100);
		
	//drawCube(0, 0);
	//drawCubeRGB(2, 2, 100, 200, 50);
	//drawCube(1, 1);
	
	animate();
}
</script>
</head>

<body onload="start();">
<div id="t"></div>
<canvas id="canvas" width="600" height="480"></canvas>
<div id="log"></div>


</body>
</html>