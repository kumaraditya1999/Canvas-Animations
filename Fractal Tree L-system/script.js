// Genreation rule
// base -> A,B
// A -> AB
// B -> A



window.onload = function(){
	var canvas = document.getElementById("canvas");
	var height = window.innerHeight;
	var width = window.innerWidth;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext('2d');

	var minsize = 10;
	var angle_diff = 18*Math.PI/180;
	var stroke_len = 2;
	ctx.fillStyle = "#000000"
	ctx.fillRect(0,0,width,height);
	ctx.strokeStyle = 'white';
	var size_factor = 1;
	var no_of_levels = 0;

	function drawTree(size,x,y,angle,minsize,stroke_len,level,type){
		ctx.save();
		ctx.translate(x,y);
		ctx.beginPath();
		ctx.lineTo(0,0);
		ctx.rotate(angle);
		ctx.lineTo(0,-size);
		ctx.closePath();
		//ctx.arc(0,0,1,0,2*Math.PI);
		ctx.lineWidth = stroke_len;
		if(type)
		ctx.strokeStyle = "#FF057A"
		else
		ctx.strokeStyle = "#FFFFFF"
		ctx.stroke();
		ctx.restore();

		if(level<no_of_levels){
			//right branch
			drawTree(size*size_factor,x+size*Math.sin(angle),y-size*Math.cos(angle),angle+angle_diff,minsize,stroke_len*.99,level+1,1);

			//left Branch
			if(type)
			drawTree(size*size_factor,x+size*Math.sin(angle),y-size*Math.cos(angle),angle-angle_diff,minsize,stroke_len*.99,level+1,0);

		}
	}

	drawTree(height/20,width/2,height,0,minsize,stroke_len,0,1);


	document.addEventListener('click',function(e){
		console.log(no_of_levels);
		no_of_levels++;
		if(no_of_levels<20)
		{	ctx.clearRect(0,0,width,height);
			ctx.fillRect(0,0,width,height);
			drawTree(height/20,width/2,height,0,minsize,stroke_len,0,1);
		}
		
		else{
			no_of_levels = 0;
			window.alert("Do Exceed after this or else it will hang");
		}

	});


}