window.onload = function(){
	var canvas = document.getElementById("canvas");
	var height = window.innerHeight;
	var width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');

	var minsize = 10;
	var angle_diff = Math.PI/6;
	var stroke_len = 2;
	ctx.fillStyle = "#FF057A"
	ctx.fillRect(0,0,width,height);
	ctx.strokeStyle = 'white';


	function drawTree(size,x,y,angle,minsize,stroke_len,level){
		ctx.save();
		ctx.translate(x,y);
		ctx.beginPath();
		ctx.lineTo(0,0);
		ctx.rotate(angle);
		ctx.lineTo(0,-size);
		ctx.closePath();
		//ctx.arc(0,0,1,0,2*Math.PI);
		ctx.lineWidth = stroke_len;
		ctx.stroke();
		ctx.restore();

		if(size>minsize){
			//right branch
			if(Math.random()>.1||level<1)
			drawTree(3*size/4,x+size*Math.sin(angle),y-size*Math.cos(angle),angle+angle_diff,minsize,stroke_len*.99,level+1);
			//left Branch
			if(Math.random()>.1||level<1)
			drawTree(3*size/4,x+size*Math.sin(angle),y-size*Math.cos(angle),angle-angle_diff,minsize,stroke_len*.99,level+1);

		}
		console.log("Drawing");
	}


	//drawTree(height/4,width/2,height,0,minsize,stroke_len);
	var counter = 0;

	function animate(){
		if(counter%100==0){
			ctx.clearRect(0,0,width,height);
			ctx.fillRect(0,0,width,height);
			drawTree(height/4,width/2,height,0,minsize,stroke_len,0);
			
			counter=1;
		}
		counter++;
		window.requestAnimationFrame(animate);
		
	}
	animate();


	
	




}