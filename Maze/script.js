window.onload = function(){

	var canvas = document.getElementById("canvas");
	var height = 3*window.innerHeight/4;
	var width = 3*window.innerWidth/4;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = 'black';
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 2;

	ctx.fillRect(0,0,width,height);

	var x = 0;
	var y = 0;
	var size = 10;
	var counter = 0;

	function draw(){

		if(Math.random()>.5){
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.lineTo(x+size,y+size);
			ctx.stroke();
			ctx.closePath();
			

		}else{
			ctx.beginPath();
			ctx.moveTo(x,y+size);
			ctx.lineTo(x+size,y);
			ctx.stroke();
			ctx.closePath();

		}


			x+=size;
			if(x>=width){
				x = 0;
				y+=size;
			}
			if(y>=height){
				y = 0;
				ctx.clearRect(0,0,width,height);
				ctx.fillRect(0,0,width,height);
				x = 0;
			}

		window.requestAnimationFrame(draw);
	}
	

	draw();
	

}